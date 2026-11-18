import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ExamService } from './exam.service';
import { MessagePattern } from '@nestjs/microservices';
import { RedisService } from '@app/redis';
import { RequireLogin, UserInfo } from '@app/common';
import { ExamAddDto } from './dto/exam-add.dto';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) { }

  @Inject(RedisService)
  redisService: RedisService

  @Post('add')
  @RequireLogin()
  async add(@Body() dto: ExamAddDto, @UserInfo('userId') userId: number) {
    return this.examService.add(dto, userId);
  }

  @Get()
  async getHello() {
    const keys = await this.redisService.keys('*');
    return this.examService.getHello() + keys;
  }

  @MessagePattern('sum')
  sum(numArr: Array<number>): number {
    return numArr.reduce((total, item) => total + item, 0);
  }

}
