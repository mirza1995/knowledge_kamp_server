import { TUploadStatusEnum, uploadsTable } from '@/db/uploads';
import { DB, DbType } from '@/global/providers/db.provider';
import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { UploadDTO } from '../dto/uploads/upload-dto';

@Injectable()
export class UploadsService {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async getUploads(userId: string) {
    const uploads = await this.db
      .select()
      .from(uploadsTable)
      .where(eq(uploadsTable.userId, userId));

    return uploads.map(UploadDTO.toDTO);
  }

  async getUpload(id: string, userId: string) {
    const uploads = await this.db
      .select()
      .from(uploadsTable)
      .where(and(eq(uploadsTable.userId, userId), eq(uploadsTable.id, id)));

    return UploadDTO.toDTO(uploads[0]);
  }

  async createUpload(itemsCount: number, userId: string) {
    const createdUploads = await this.db
      .insert(uploadsTable)
      .values({ items: itemsCount, userId })
      .returning();

    return createdUploads[0];
  }

  async updateUpload(id: string, status: TUploadStatusEnum) {
    return await this.db
      .update(uploadsTable)
      .set({ status: status })
      .where(eq(uploadsTable.id, id))
      .returning();
  }

  async deleteUpload(id: string, userId: string) {
    const deletedUpload = await this.db
      .delete(uploadsTable)
      .where(and(eq(uploadsTable.id, id), eq(uploadsTable.userId, userId)))
      .returning();

    return !!deletedUpload;
  }
}
