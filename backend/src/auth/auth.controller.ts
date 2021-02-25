import { Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { request, Request } from 'express';
import { JWTResponse } from 'src/interfaces/auth/jwtresponse.interface';
import { RegisterResponse } from 'src/interfaces/auth/registerresponse.interface';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private userService: UserService) {}

    @UseGuards(LocalAuthGuard)
    @HttpCode(200)
    @Post('login')
    async login(@Req() request: Request): Promise<JWTResponse> {
        return this.authService.login(await this.userService.findOne(request.body.username!));
    }

    @HttpCode(201)
    @Post('register')
    async register(@Req() request: Request): Promise<RegisterResponse> {
        return await this.authService.register(request.body);
    }

}
