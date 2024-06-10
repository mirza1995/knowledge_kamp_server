import { usersTable } from '@/db/users';
import { DB, DbType } from '@/global/providers/db.provider';
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async saveUserIfNotPresent(user: User) {
    const existingUser = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, user.id));

    if (existingUser.length === 0) {
      return await this.db.insert(usersTable).values(user).returning();
    }

    return null;
  }
}
