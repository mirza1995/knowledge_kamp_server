import { KNOWLEDGE_KAMP_EMAILS } from '@/constants/emails';
import { NoteNotificationDTO } from '@/dto/notifications/note-notification-dto';
import { DB, DbType } from '@/global/providers/db.provider';
import { NotesService } from '@/notes/notes.service';
import { getEmailHtml } from '@/templates/notificationEmail';
import { Inject, Injectable } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import { ResendService } from 'nestjs-resend';
import { Resend } from 'resend';

/**
 * This is a temporary solution to the problem of sending notifications to users.
 * It requires a refactoring to make it more maintainable and scalable.
 */
@Injectable()
export class NotificationsService {
  constructor(
    @Inject(DB) private readonly db: DbType,
    private readonly notesService: NotesService,
    private readonly resendService: ResendService,
  ) {}

  async sendNotifications() {
    const notes = await this.getNotesNotificationsContent();

    const notesByEmail = this.groupNotesByEmail(notes);

    const promises = Object.keys(notesByEmail).map(async (email) => {
      const notes = notesByEmail[email];
      const title = notes[0].title;

      const emailHtml = getEmailHtml(notes);

      await this.resendService.send({
        from: KNOWLEDGE_KAMP_EMAILS.notification,
        to: email,
        subject: title,
        html: emailHtml,
      });
    });

    await Promise.allSettled(promises);

    const notesUpdateResponse = await this.updateNotesLastNotificationDate(
      notes.map((note) => note.id),
    );

    if (notesUpdateResponse.count === 0) {
      console.error('Failed to update notes last notification date');
      return Response.json(
        { error: 'Request failed' },
        {
          status: 401,
        },
      );
    }

    return Response.json({ message: 'Success' });
  }

  async getNotesNotificationsContent() {
    const query = `
        SELECT DISTINCT ON (note.notebook_id)
            note.id,
            note.title,
            note.content,
            users.email
        FROM
        "Note" note
        INNER JOIN "User" users
        ON note.user_id = users.id
        ORDER BY
            note.notebook_id,
            note.last_notification ASC;
    `;
    const notes = await this.db.execute(sql.raw(query));

    return notes as unknown as NoteNotificationDTO[];
  }

  async updateNotesLastNotificationDate(ids: string[]) {
    return await this.notesService.updateNotesLastNotificationDate(ids);
  }

  private groupNotesByEmail(notes: NoteNotificationDTO[]) {
    return notes.reduce<Record<string, NoteNotificationDTO[]>>((acc, note) => {
      if (!acc[note.email]) {
        acc[note.email] = [];
      }
      acc[note.email].push(note);
      return acc;
    }, {});
  }
}
