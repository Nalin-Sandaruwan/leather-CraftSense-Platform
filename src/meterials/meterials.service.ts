import { Injectable } from '@nestjs/common';
import { CreateMeterialDto } from './dto/create-meterial.dto';
import { UpdateMeterialDto } from './dto/update-meterial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meterial } from './entities/meterial.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MeterialsService {

  constructor(
      @InjectRepository(Meterial) private readonly meterialRepository: Repository<Meterial>,
      // @Inject(forwardRef(() => AuthService)) private readonly authService:AuthService
    ) {}
  create(createMeterialDto: CreateMeterialDto, user:any) {
    createMeterialDto.userId = user.id;
    const meterial = this.meterialRepository.create({
      ...createMeterialDto,
      user: { uId: user.id } as any, // set relation so TypeORM creates proper FK
    });
    return this.meterialRepository.save(meterial);
  }

  findAll( sort: 'asc' | 'desc') {
     const meterials = this.meterialRepository
     .createQueryBuilder('meterial')
      .leftJoinAndSelect('meterial.user', 'user')
      .orderBy('meterial.created_At', sort.toUpperCase() as 'ASC' | 'DESC')
      .getMany();

      return meterials;
  }

  findOne(id: number) {
    return `This action returns a #${id} meterial`;
  }

  update(id: number, updateMeterialDto: UpdateMeterialDto) {
    return `This action updates a #${id} meterial`; 
  }

  remove(id: number) {
    return `This action removes a #${id} meterial`;
  }
}
