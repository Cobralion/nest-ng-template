import { Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JWTResponse } from 'src/interfaces/auth/jwtresponse.interface';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @HttpCode(202)
    @Post('login')
    login(@Req() request: Request): JWTResponse {
        return this.authService.login(request.body.user!);
    }

}
