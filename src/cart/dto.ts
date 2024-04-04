import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetItemDto } from 'src/items/dto';

export class CartItemDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  ownerId: number;

  @ApiProperty()
  tel: string;

  @ApiProperty()
  count: number;

  @ApiProperty()
  mail: string;

  @ApiProperty()
  isFinished: boolean;

  @ApiProperty({
    type: [GetItemDto],
  })
  item: GetItemDto[];

  @ApiProperty()
  createdAt: Date;
}

export class PatchCartItemDto {
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isFinished?: boolean;
}

export class CartItemQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  q?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  qu?: number;
}

export class AddCartItemDto {
  @ApiProperty()
  tel: string;

  @ApiProperty()
  count: number;

  @ApiProperty()
  mail: string;

  @ApiProperty()
  createdAt: Date;
}
