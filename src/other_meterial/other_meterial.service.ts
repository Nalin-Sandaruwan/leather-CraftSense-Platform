import { Injectable } from '@nestjs/common';
import { CreateOtherMeterialDto } from './dto/create-other_meterial.dto';
import { UpdateOtherMeterialDto } from './dto/update-other_meterial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OtherMeterial } from './entities/other_meterial.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OtherMeterialService {

  constructor(
    @InjectRepository(OtherMeterial)
    private readonly otherMeterialRepository: Repository<OtherMeterial>,
  ) { }
  create(createOtherMeterialDto: CreateOtherMeterialDto, user:any) {
    // createOtherMeterialDto.userId = user.id;
    createOtherMeterialDto.unit_cost = createOtherMeterialDto.total_Cost/createOtherMeterialDto.quantity
    const otherMeterial = this.otherMeterialRepository.create({ 
      ...createOtherMeterialDto, 
      user: { uId: user.id } as any
    });
    const savedOtherMeterial = this.otherMeterialRepository.save(otherMeterial);
    return savedOtherMeterial;
    //
  }

  findAll() {
    return `This action returns all otherMeterial`;
  }

  findOne(id: number) {
    return `This action returns a #${id} otherMeterial`;
  }

  update(id: number, updateOtherMeterialDto: UpdateOtherMeterialDto) {
    return `This action updates a #${id} otherMeterial`;
  }

  remove(id: number) {
    return `This action removes a #${id} otherMeterial`;
  }
}
