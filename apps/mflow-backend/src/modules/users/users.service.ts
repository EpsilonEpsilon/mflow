import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entitites/user.entitity';
import { Repository } from 'typeorm';

@Injectable()
class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public createNewUser(user: User) {
    return this.userRepository.save(user);
  }

  public async findOneByUsername(username: User['username']) {
    return this.userRepository.findOne({ where: { username } });
  }
}

export default UsersService;
