import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import {
  AddCartItemDto,
  CartItemDto,
  CartItemQueryDto,
  PatchCartItemDto,
} from './dto';
import { SessionInfo } from 'src/auth/session-info.decorator';
import { GetSessionInfoDto } from 'src/auth/dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get('get-all-items')
  @ApiOkResponse({
    type: CartItemDto,
  })
  getAllCartItems() {
    return this.cartService.getAllCartItems();
  }

  @Get('get-item')
  @ApiOkResponse({
    type: CartItemDto,
  })
  getCartItem(
    @Query() query: CartItemQueryDto,
    @SessionInfo() session: GetSessionInfoDto,
  ) {
    return this.cartService.getCartItem(session.id, query);
  }

  @Post('create-item/:id')
  @ApiCreatedResponse({
    type: CartItemDto,
  })
  addCartItem(
    @Body() body: AddCartItemDto,
    @Param('id', ParseIntPipe) id: number,
    @SessionInfo() session: GetSessionInfoDto,
  ) {
    return this.cartService.addCartItem(id, session.id, body);
  }

  @Put('update-finish-block/:id')
  @ApiCreatedResponse({
    type: CartItemDto,
  })
  patchCartItem(
    @Body() body: PatchCartItemDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.cartService.patchCartItem(id, body);
  }

  @Delete('remove-item/:id')
  @ApiOkResponse({
    type: CartItemDto,
  })
  removeCartItem(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.removeCartItem(id);
  }
}
