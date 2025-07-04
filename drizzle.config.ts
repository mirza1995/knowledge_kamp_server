import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/*.ts',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
  driver: 'pg',
} satisfies Config;
