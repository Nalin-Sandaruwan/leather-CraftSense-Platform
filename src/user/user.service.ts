import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  private readonly logger = new Logger(UserService.name);
  constructor(@InjectRepository(User) private readonly UserRepository:Repository<User>) {}


  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.UserRepository.create(createUserDto);
      return await this.UserRepository.save(user);
    } catch (error) {
      this.logger.error('Error creating user', error.stack);
      throw new Error('Error creating user');
    }
  }

  findAll() {
    return this.UserRepository.find() ;
  }

  async findOneById(id: string) {
    if (isNaN(Number(id)) || !Number.isInteger(Number(id))) {
      throw new BadRequestException('Invalid user ID');
      
    }
    
    const user = await this.UserRepository.findOne({ where: { uId: Number(id) } });
    if(!user){
      throw new Error('User not found');
    }
    return user;
  }

  async findOne(email: string) {
    const user = await this.UserRepository.findOneBy({ email });
    if (!user) {
      this.logger.warn(`User not found for email=${email}`);
      return null;
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a user with id: ${id}`;
  }

  async remove(email: string) {
    return await this.UserRepository.delete({ email: email })
  }
}