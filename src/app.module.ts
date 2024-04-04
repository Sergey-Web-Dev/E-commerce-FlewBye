import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [DbModule, AuthModule, UsersModule, ItemsModule, CartModule],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
