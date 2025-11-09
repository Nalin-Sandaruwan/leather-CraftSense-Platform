import { Injectable } from '@nestjs/common';
import { CreateLeatherBatchDto } from './dto/create-leather_batch.dto';
import { UpdateLeatherBatchDto } from './dto/update-leather_batch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LeatherBatch } from './entities/leather_batch.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LeatherBatchService {
  constructor(
    @InjectRepository(LeatherBatch) private readonly leatherBatchRepository: Repository<LeatherBatch>,
    // @Inject(forwardRef(() => AuthService)) private readonly authService:AuthService
  ) { }

  create(createLeatherBatchDto: CreateLeatherBatchDto) {

    console.log('createLeatherBatchDto', createLeatherBatchDto);

    const batch = this.leatherBatchRepository.create({
      ...createLeatherBatchDto,
      meterial: createLeatherBatchDto.Meteraial_Ids.map((material_id) => ({ id: material_id })),
    });

    const savedBatch = this.leatherBatchRepository.save(batch);
    return savedBatch;
    // return 'This action adds a new leatherBatch';
  }

   // return all batches with their meterial relations
  async findAllWithMeterials() {
    return this.leatherBatchRepository.createQueryBuilder('leatherBatch')
      .leftJoinAndSelect('leatherBatch.meterial', 'meterial') // use relation property
      .orderBy('leatherBatch.id', 'ASC')
      .getMany();
  }

  

  async findOne(id: number) {
    const leatherBatch = await this.leatherBatchRepository.createQueryBuilder('leatherBatch')
      .leftJoinAndSelect('leatherBatch.meterial', 'meterial')
      .where('leatherBatch.id = :id', { id })
      .getOne();

    return leatherBatch;

  }


    // helper: get only meterial ids for a batch
  async findOneMeterialIds(id: number) {
    const leatherBatch = await this.findOne(id);
    if (!leatherBatch) return [];
    return leatherBatch.meterial?.map(m => m.id) ?? [];
  }

  update(id: number, updateLeatherBatchDto: UpdateLeatherBatchDto) {
    return `This action updates a #${id} leatherBatch`;
  }

  remove(id: number) {
    return `This action removes a #${id} leatherBatch`;
  }
}
