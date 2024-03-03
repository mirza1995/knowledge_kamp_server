import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const notebookTable = pgTable('Notebook', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .notNull()
    .default(sql`(uuid_generate_v4())`),
  name: varchar('name', { length: 300 }),
  description: varchar('description', { length: 300 }),
  dateCreated: timestamp('date_created').defaultNow(),
  dateUpdated: timestamp('date_updated').defaultNow(),
  userId: varchar('user_id', { length: 32 }).notNull(),
});
