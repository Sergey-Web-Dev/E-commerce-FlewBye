import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { DbModule } from 'src/db/db.module';
import { ItemsModule } from 'src/items/items.module';

@Module({
  imports: [DbModule, ItemsModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
