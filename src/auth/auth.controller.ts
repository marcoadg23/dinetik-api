import {
    Controller,
    Post,
    Body,
    Get,
    Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('auth') // nombre del grupo en Swagger
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiBody({ type: AuthDto })
    register(@Body() body: AuthDto) {
        return this.authService.register(body);
    }

    @Post('login')
    @ApiBody({ type: AuthDto })
    login(@Body() body: AuthDto) {
        return this.authService.login(body);
    }

    @Get('profile')
    @ApiBearerAuth() // para indicar que usa token
    profile(@Headers('Authorization') auth: string) {
        return this.authService.verify(auth);
    }
}
