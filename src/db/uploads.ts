import {
  pgTable,
  pgEnum,
  varchar,
  timestamp,
  integer,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const UploadStatusEnum = pgEnum('status', [
  'IN_PROGRESS',
  'COMPLETED',
  'FAILED',
]);

export const uploadsTable = pgTable('Uploads', {
  id: varchar('id', { length: 36 })
    .primaryKey()
    .notNull()
    .default(sql`(uuid_generate_v4())`),
  status: UploadStatusEnum('status').default('IN_PROGRESS'),
  items: integer('items'),
  dateCreated: timestamp('date_created').defaultNow(),
  userId: varchar('user_id', { length: 32 }).notNull(),
});

export type TUploadStatusEnum = (typeof UploadStatusEnum.enumValues)[number];
