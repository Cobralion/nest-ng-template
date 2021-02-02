import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/interfaces/user/user.interface';
import { JWTResponse } from 'src/interfaces/auth/jwtresponse.interface';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<JWTResponse> {
    const payload = { username: user.username, sub: user.id};
    return {
      access_token: this.jwtService.sign(payload),
      expiresIn: new Date(Date.now() + 3600000)
    };
  }

}
