import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entitites/user.entitity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public createNewUser(user: User, manager?: EntityManager) {
    const repository = manager
      ? manager.getRepository(User)
      : this.userRepository;
    return repository.save(user);
  }

  public async findOneByUsername(
    username: User['username'],
    manager?: EntityManager,
  ) {
    const repository = manager
      ? manager.getRepository(User)
      : this.userRepository;
    return repository.findOne({ where: { username } });
  }
}

export default UsersService;
