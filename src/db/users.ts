import { pgTable, varchar, timestamp, text } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('User', {
  id: varchar('id', { length: 32 }).notNull(),
  fullName: text('full_name').notNull(),
  email: varchar('email', { length: 100 }).notNull(),
  dateCreated: timestamp('date_created').defaultNow(),
});
