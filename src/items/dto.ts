import { $Enums } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import { CartItemDto } from 'src/cart/dto';

export class GetItemDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  img: string[];

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty({
    enum: [$Enums.ItemType.Gel, $Enums.ItemType.Gift, $Enums.ItemType.Soap],
  })
  type: $Enums.ItemType;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({
    type: [CartItemDto],
  })
  cart: CartItemDto[];
}

export class patchItemDto {
  @ApiProperty()
  name: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: true,
  })
  img: string[];

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty({
    enum: [$Enums.ItemType.Gel, $Enums.ItemType.Gift, $Enums.ItemType.Soap],
  })
  @IsIn([$Enums.ItemType.Gel, $Enums.ItemType.Gift, $Enums.ItemType.Soap])
  type: $Enums.ItemType;

  @ApiProperty({
    type: String,
    default: new Date(),
  })
  createdAt: Date;
}

export class AddItemDto {
  @ApiProperty()
  name: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: true,
  })
  img: string[];

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty({
    enum: [$Enums.ItemType.Gel, $Enums.ItemType.Gift, $Enums.ItemType.Soap],
  })
  @IsIn([$Enums.ItemType.Gel, $Enums.ItemType.Gift, $Enums.ItemType.Soap])
  type: $Enums.ItemType;

  @ApiProperty({
    type: String,
    default: new Date(),
  })
  createdAt: Date;
}

export class ItemQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  q?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  qu?: number;
}
