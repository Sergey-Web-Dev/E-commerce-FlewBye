import { diskStorage } from 'multer';

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
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiProperty,
} from '@nestjs/swagger';
import { AddItemDto, GetItemDto, ItemQueryDto, patchItemDto } from './dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get('get-items')
  @ApiOkResponse({
    type: GetItemDto,
  })
  getItems(@Query() query: ItemQueryDto) {
    return this.itemsService.getItems(query);
  }

  @Post('create-item')
  @ApiCreatedResponse({
    type: AddItemDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('img', 3, {
      storage: diskStorage({
        destination: '../client/public',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  addItem(
    @Body() body: AddItemDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.itemsService.addItem(body, files);
  }

  @Put('update-item/:id')
  @ApiCreatedResponse({
    type: patchItemDto,
  })
  patchItem(
    @Body() body: patchItemDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<patchItemDto> {
    return this.itemsService.patchItem(id, body);
  }

  @Delete('delete-item/:id')
  @ApiOkResponse({
    type: GetItemDto,
  })
  removeItem(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.removeItem(id);
  }
}
