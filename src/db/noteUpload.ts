import {
  mysqlTable,
  varchar,
  varbinary,
  timestamp,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const noteUploadsTable = mysqlTable('NoteUploads', {
  id: varchar('id', { length: 191 })
    .primaryKey()
    .notNull()
    .default(sql`(uuid())`),
  //todo - add notebookId
  text: varbinary('text', { length: 10_000 }),
  dateCreated: timestamp('date_created').defaultNow(),
  dateUpdated: timestamp('date_updated').defaultNow().onUpdateNow(),
});
