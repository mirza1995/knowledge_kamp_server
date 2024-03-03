import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const noteUploadsTable = pgTable('NoteUploads', {
  id: varchar('id', { length: 191 })
    .primaryKey()
    .notNull()
    .default(sql`(uuid_generate_v4())`),
  //todo - add notebookId
  text: varchar('text', { length: 10_000 }),
  dateCreated: timestamp('date_created').defaultNow(),
  dateUpdated: timestamp('date_updated').defaultNow(),
});
