import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/*.ts',
  dbCredentials: {
    uri: process.env['DATABASE_URI'],
  },
  driver: 'mysql2',
} satisfies Config;
