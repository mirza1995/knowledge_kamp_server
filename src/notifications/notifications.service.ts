import { noteTable } from '@/db/note';
import { NoteNotificationDTO } from '@/dto/notifications/note-notification-dto';
import { UpdateNotesLastNotificationDateDTO } from '@/dto/notifications/update-notes-last-notification-date-dto';
import { DB, DbType } from '@/global/providers/db.provider';
import { NotesService } from '@/notes/notes.service';
import { Inject, Injectable } from '@nestjs/common';
import { inArray, sql } from 'drizzle-orm';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(DB) private readonly db: DbType,
    private readonly notesService: NotesService,
  ) {}

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

  async updateNotesLastNotificationDate(
    notesDto: UpdateNotesLastNotificationDateDTO,
  ) {
    await this.notesService.updateNotesLastNotificationDate(notesDto.ids);
  }
}
