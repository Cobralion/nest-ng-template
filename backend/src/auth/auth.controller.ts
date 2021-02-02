import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { JWTResponse } from 'src/interfaces/auth/jwtresponse.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('login')
    login(@Req() request: Request): JWTResponse {
        console.log(request.body);
        return this.authService.login(request.body);
    }

}
