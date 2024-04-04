import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AddCartItemDto, CartItemQueryDto, PatchCartItemDto } from './dto';

@Injectable()
export class CartService {
  constructor(private db: DbService) {}

  async getAllCartItems() {
    return await this.db.cart.findMany({});
  }

  async getCartItem(sessionId: number, query: CartItemQueryDto) {
    return await this.db.cart.findMany({
      where: {
        ownerId: sessionId,
      },
      include: {
        item: {
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
        },
      },
    });
  }

  async addCartItem(itemId: number, sessionId: number, body: AddCartItemDto) {
    const foundedItem = await this.db.item.findUniqueOrThrow({
      where: {
        id: itemId,
      },
    });

    return await this.db.cart.create({
      data: {
        ownerId: sessionId,
        tel: body.tel,
        count: body.count,
        mail: body.mail,
        isFinished: false,
        item: {
          connect: {
            id: foundedItem.id,
          },
        },
      },
    });
  }

  async patchCartItem(itemId: number, body: PatchCartItemDto) {
    return await this.db.cart.update({
      where: {
        id: itemId,
      },
      data: {
        ...body,
      },
    });
  }

  async removeCartItem(itemId: number) {
    return await this.db.cart.delete({
      where: {
        id: itemId,
      },
    });
  }
}
