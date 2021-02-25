import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/interfaces/user/user.interface';
import { JWTResponse } from 'src/interfaces/auth/jwtresponse.interface';
import { RegisterCredentials } from 'src/interfaces/auth/registercredential.interface';
import { keys } from 'src/interfaces/user/invitatitionKey';
import { RegisterResponse } from 'src/interfaces/auth/registerresponse.interface';

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
      access_token: this.jwtService.sign(payload)
    };
  }

  async register(registercredential: RegisterCredentials): Promise<RegisterResponse> {
    if(registercredential && registercredential.key && keys.find(item => item === registercredential.key)) {
      if(await this.userService.findOne(registercredential.username)) {
        throw new ConflictException('Username is already taken.');
      }
      keys[keys.indexOf(registercredential.key)] = undefined;
      this.userService.addOne({ id: undefined, username: registercredential.username, passwordHash: await bcrypt.hash(registercredential.password, 10) });
      return {
        username: registercredential.username
      };
    }
    throw new ForbiddenException();
  }

}
