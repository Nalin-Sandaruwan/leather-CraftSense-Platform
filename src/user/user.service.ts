import { BadRequestException, Injectable, Logger, Inject, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {

  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User) private readonly UserRepository:Repository<User>,
    // @Inject(forwardRef(() => AuthService)) private readonly authService:AuthService
  ) {}

  // async create(createUserDto: CreateUserDto) {
  //   try {
  //     const existingUser = await this.UserRepository.findOneBy({ email: createUserDto.email }); 
  //     if (existingUser) {
  //       throw new BadRequestException('User with this email already exists');
  //     }
  //     const user = await this.UserRepository.create(createUserDto);
  //     await this.UserRepository.save(user);
      
  //     return user;

  //   } catch (error) {
  //     this.logger.error('Error creating user', error?.stack ?? error);
  //     throw new Error('Error creating user');
  //   }
  // }
  // async create(createUserDto: CreateUserDto) {
    
  //   try {
  //     const existingUser = await this.UserRepository.findOneBy({ email: createUserDto.email });
  //     const user = await this.UserRepository.create(createUserDto);
  //     if (existingUser) {
  //       throw new BadRequestException('User with this email already exists');
  //     }
  //     await this.UserRepository.save(user);
  //     const savedUser = await this.UserRepository.findOneBy({ email: createUserDto.email });

  //     if (!savedUser) {
  //       this.logger.error('Saved user not found after save');
  //       throw new Error('Error creating user');
  //     }

  //     const { accessToken, refreshToken } = ;
  //     return {
  //       user: savedUser,
  //       accessToken,
  //       refreshToken
  //     };
  //   } catch (error) {
  //     this.logger.error('Error creating user', error?.stack ?? error);
  //     throw new Error('Error creating user');
  //   }

    
  // }

  findAll() {
    return this.UserRepository.find({ select:['uId','email','name','role','refreshToken'] });
  }

  async findOneById(id: string) {
    if (isNaN(Number(id)) || !Number.isInteger(Number(id))) {
      throw new BadRequestException('Invalid user ID');
      
    }

    const user = await this.UserRepository.findOne({ where: { uId: Number(id) }, select:['uId','email','name','role','refreshToken'] });
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

  async updateHashedRefreshToken(useId:string, hashedRefreshToken:string){
    const useIdNum = parseInt(useId);
    return await this.UserRepository.update({uId:useIdNum},{refreshToken:hashedRefreshToken})
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a user with id: ${id}`;
  }

  async remove(id: string) {
    return await this.UserRepository.delete({ uId: Number(id) });
  }
}