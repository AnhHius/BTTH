import {
  Controller,
  Get,
  Res,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('cookie')
export class CookieController {

  // Tạo cookie
  @Get('set')
  setCookie(@Res() res: Response) {
    res.cookie('username', 'NguyenQuan', {
      maxAge: 60 * 60 * 1000, // 1 giờ
      httpOnly: true,
    });

    return res.send('Cookie đã được tạo');
  }

  // Đọc cookie
  @Get('get')
  getCookie(@Req() req: Request) {
    return {
      cookie: req.cookies,
    };
  }

  // Xóa cookie
  @Get('clear')
  clearCookie(@Res() res: Response) {
    res.clearCookie('username');
    return res.send('Đã xóa cookie');
  }
}