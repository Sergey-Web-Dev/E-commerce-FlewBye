import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AddItemDto, ItemQueryDto, patchItemDto } from './dto';

@Injectable()
export class ItemsService {
  constructor(private db: DbService) {}

  async getItems(query: ItemQueryDto) {
    return await this.db.item.findMany({
      where: {
        name: {
          contains: query.q,
          mode: 'insensitive',
        },
        price: {
          lte: typeof query.qu === 'undefined' ? query.qu : +query.qu,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async patchItem(
    id: number,
    body: patchItemDto,
    files: Express.Multer.File[],
  ) {
    const { price, name, type, description } = body;

    return await this.db.item.update({
      where: {
        id: id,
      },
      data: {
        price: typeof price === 'number' ? price : +price,
        name,
        type,
        img: files.map((item) => item.filename),
        description,
      },
    });
  }

  async addItem(body: AddItemDto, files: Express.Multer.File[]) {
    const { price, name, type, description } = body;
    return await this.db.item.create({
      data: {
        price: typeof price === 'number' ? price : +price,
        name,
        type,
        img: files.map((item) => item.filename),
        description,
      },
    });
  }

  async removeItem(id: number) {
    return await this.db.item.delete({
      where: {
        id: id,
      },
    });
  }
}
