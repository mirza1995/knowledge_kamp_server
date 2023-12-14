import {
  mysqlTable,
  varchar,
  varbinary,
  timestamp,
  MySqlVarBinary,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const noteUploads = mysqlTable('NoteUploads', {
  id: varchar('id', { length: 191 })
    .primaryKey()
    .notNull()
    .default(sql`(uuid())`),
  //todo - add notebookId
  text: varbinary('text', { length: 10_000 }),
  dateCreated: timestamp('date_created').defaultNow(),
  dateUpdated: timestamp('date_updated').defaultNow().onUpdateNow(),
});
