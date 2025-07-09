import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
    @Get()
    home(@Res() res: Response) {
        res.send(`
      <html>
        <head><title>Dinetik Backend</title></head>
        <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
          <h1>Dinetik Backend</h1>
          <p>Selecciona la API que deseas explorar:</p>
          <a href="/api-dinetik" style="display:block; margin: 10px;">🌐 API REST (Swagger)</a>
          <a href="/graphql-dinetik" style="display:block; margin: 10px;">🚀 API GraphQL</a>
        </body>
      </html>
    `);
    }
}
