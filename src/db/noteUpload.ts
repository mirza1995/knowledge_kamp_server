import { pgTable, varchar, timestamp, text } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { uploadsTable } from './uploads';

export const noteUploadsTable = pgTable('NoteUploads', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .notNull()
    .default(sql`(uuid_generate_v4())`),
  text: text('text'),
  uploadId: varchar('upload_id', { length: 36 })
    .notNull()
    .references(() => uploadsTable.id, { onDelete: 'cascade' }),
  dateCreated: timestamp('date_created').defaultNow(),
  userId: varchar('user_id', { length: 32 }).notNull(),
});
