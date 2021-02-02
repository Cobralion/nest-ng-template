import { Injectable } from '@nestjs/common';
import { JWTResponse } from 'src/interfaces/auth/jwtresponse.interface';
import { LoginCredentials } from 'src/interfaces/auth/logincredential.interface';

@Injectable()
export class AuthService {
    
    login(request: LoginCredentials): JWTResponse {
        return {
            jwt: 'jwt',
            expires: new Date()
        };
    }
}
