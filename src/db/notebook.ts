import {
  mysqlTable,
  varchar,
  varbinary,
  timestamp,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const notebookTable = mysqlTable('Notebook', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .notNull()
    .default(sql`(uuid())`),
  name: varbinary('name', { length: 300 }),
  description: varbinary('description', { length: 300 }),
  dateCreated: timestamp('date_created').defaultNow(),
  dateUpdated: timestamp('date_updated').defaultNow().onUpdateNow(),
  userId: varchar('user_id', { length: 32 }).notNull(),
});
