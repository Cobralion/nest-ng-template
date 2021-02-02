import { Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JWTResponse } from 'src/interfaces/auth/jwtresponse.interface';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private userService: UserService) {}

    @UseGuards(LocalAuthGuard)
    @HttpCode(202)
    @Post('login')
    async login(@Req() request: Request): Promise<JWTResponse> {
        return this.authService.login(await this.userService.findOne(request.body.username!));
    }

}
