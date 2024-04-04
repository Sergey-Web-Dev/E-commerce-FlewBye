import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DbService } from './db/db.service';
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';

export class GetHelloDto {
  @ApiProperty({
    example: 'This is the message!',
  })
  message: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private db: DbService,
  ) {}

  @Get()
  @ApiOkResponse({ type: GetHelloDto })
  async getHello(): Promise<GetHelloDto> {
    const users = await this.db.user.findMany();
    console.log(users);

    return { message: this.appService.getHello() };
  }
}
