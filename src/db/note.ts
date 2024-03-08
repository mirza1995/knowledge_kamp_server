import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { notebookTable } from './notebook';

export const noteTable = pgTable('Note', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .notNull()
    .default(sql`(uuid_generate_v4())`),
  title: varchar('title', { length: 150 }),
  content: varchar('content', { length: 2500 }),
  dateCreated: timestamp('date_created').defaultNow(),
  dateUpdated: timestamp('date_updated').defaultNow(),
  lastNotification: timestamp('last_notification').defaultNow(),
  notebookId: varchar('notebook_id', { length: 36 })
    .notNull()
    .references(() => notebookTable.id),
  userId: varchar('user_id', { length: 32 }).notNull(),
});
