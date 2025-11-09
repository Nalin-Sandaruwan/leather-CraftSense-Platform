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

    // calculate one cost 
    const meterial = this.meterialRepository.create({
      ...createMeterialDto,
      user: { uId: user.id } as any,
      leatherBatch: { id: createMeterialDto.leatherBatchId } as any, // set relation so TypeORM creates proper FK
    });
    const onCost =   createMeterialDto.full_Area / createMeterialDto.available_Area;
    meterial.one_Cost = onCost;

    return this.meterialRepository.save(meterial);
  }

  findAll( sort: 'asc' | 'desc') {
     const meterials = this.meterialRepository
     .createQueryBuilder('meterial')
      .leftJoinAndSelect('meterial.user', 'user')
      .leftJoinAndSelect('meterial.leatherBatch', 'leatherBatch')
      .orderBy('meterial.created_At', sort.toUpperCase() as 'ASC' | 'DESC')
      .getMany();

      return meterials;
  }

  findOne(id: number) {
    const meterial = this.meterialRepository.findOneById(id);
    return meterial;
  }

  update(id: number, updateMeterialDto: UpdateMeterialDto) {
    const updatedMeterial = this.meterialRepository.update(id, updateMeterialDto);
    return updatedMeterial;
  }

  remove(id: number) {
    const deletedMeterial = this.meterialRepository.delete(id);
    return deletedMeterial;
  }
}
