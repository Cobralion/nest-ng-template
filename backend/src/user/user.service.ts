import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces/user/user.interface';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      id: '1',
      username: 'maurice',
      passwordHash:
        '$2b$10$pd9YuPjtG7dSuOMDvHVbhe4KxxcqEJtOyAW.Ll1TqyCMiH3wmLcH2',
    },
    {
      id: '2',
      username: 'test',
      passwordHash:
        '$2b$10$pd9YuPjtG7dSuOMDvHVbhe4KxxcqEJtOyAW.Ll1TqyCMiH3wmLcH2',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
