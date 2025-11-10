import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMeterialDto } from './dto/create-meterial.dto';
import { UpdateMeterialDto } from './dto/update-meterial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Meterial } from './entities/meterial.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { LeatherBatch } from 'src/leather_batch/entities/leather_batch.entity';

@Injectable()
export class MeterialsService {

  constructor(
    @InjectRepository(Meterial) private readonly meterialRepository: Repository<Meterial>,
    
    @InjectRepository(LeatherBatch) private readonly leatherBatchRepository: Repository<LeatherBatch>,
    // @Inject(forwardRef(() => AuthService)) private readonly authService:AuthService
  ) { }
  async create(createMeterialDto: CreateMeterialDto, user: any) {
     
    // const batch = await this.leatherBatchRepository.findOne({
    //   where: { id: createMeterialDto.leatherBatchId },
    // });

    // if (!batch) {
    //   throw new NotFoundException(`LeatherBatch with id ${createMeterialDto.leatherBatchId} not found`);
    // }
    // calculate one cost 
    const meterial = this.meterialRepository.create({
      ...createMeterialDto,
      user: { uId: user.id },
      leatherBatch: { id: createMeterialDto.leatherBatchId } as any, // set relation so TypeORM creates proper FK
    });
    const onCost = createMeterialDto.full_Area / createMeterialDto.available_Area;
    meterial.one_Cost = onCost;

    return this.meterialRepository.save(meterial);
  }

  findAll(sort: 'asc' | 'desc') {
    const meterials = this.meterialRepository
      .createQueryBuilder('meterial')
      .leftJoinAndSelect('meterial.user', 'user')
      .leftJoinAndSelect('meterial.leatherBatch', 'leatherBatch')
      .orderBy('meterial.created_At', sort.toUpperCase() as 'ASC' | 'DESC')
      .getMany();

    return meterials;
  }

  findOne(id: number) {
    const meterial = this.meterialRepository.createQueryBuilder('meterial')
    .leftJoinAndSelect('meterial.user', 'user')
    .leftJoinAndSelect('meterial.leatherBatch','letherBatch')
    .getOne()
    return meterial;
  }

  async update(id: number, updateMeterialDto: UpdateMeterialDto) {
    const { leatherBatchId, ...rest } = updateMeterialDto;

    if (leatherBatchId) {
      const batch = await this.leatherBatchRepository.findOneBy({ id: leatherBatchId });
      if (!batch) throw new NotFoundException(`LeatherBatch with id ${leatherBatchId} not found`);
    }

   return this.meterialRepository.update(id, {
      ...rest,
      ...(leatherBatchId ? { leatherBatch: { id: leatherBatchId } } : {}),
    });

    // return updatedMeterial
    // return this.meterialRepository.createQueryBuilder('meterial')
    //   .leftJoinAndSelect('meterial.user', 'user')
    //   .leftJoinAndSelect('meterial.leatherBatch', 'leatherBatch')
    //   .where('meterial.id = :id', { id })
    //   .getOne();
  }

  remove(id: number) {
    const deletedMeterial = this.meterialRepository.delete(id);
    return deletedMeterial;
  }
}
