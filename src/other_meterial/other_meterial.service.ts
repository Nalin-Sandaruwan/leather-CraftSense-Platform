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
      user: { uId: user.id },
      typeOtherMeterial: { type_id: createOtherMeterialDto.other_Meterial_TypeId }
    });
    const savedOtherMeterial = this.otherMeterialRepository.save(otherMeterial);
    return savedOtherMeterial;
    //
  }

  async findAll() {
    const otherMeterials = await this.otherMeterialRepository.createQueryBuilder('otherMeterial')
    .leftJoinAndSelect('otherMeterial.typeOtherMeterial', 'typeOtherMeterial')
    .leftJoinAndSelect('otherMeterial.user', 'user')
    .getMany()
    return {
      data : otherMeterials
    };
  }

  findOne(id: number) {
    const otherMeterials = this.otherMeterialRepository.createQueryBuilder('otherMeterial')
    .leftJoinAndSelect('otherMeterial.typeOtherMeterial', 'typeOtherMeterial')
    .leftJoinAndSelect('otherMeterial.user', 'user')
    .where('otherMeterial.other_Meterial_Id = :id', { id })
    .getOne()
    return otherMeterials;
  }

  update(id: number, updateOtherMeterialDto: UpdateOtherMeterialDto) {

    const { other_Meterial_TypeId, ...rest } = updateOtherMeterialDto;
    const updateData = this.otherMeterialRepository.update(id, { 
      ...rest,
      ...(other_Meterial_TypeId && { typeOtherMeterial: { type_id: other_Meterial_TypeId } })
    });
    return updateData;
  }

  remove(id: number) {
    return `This action removes a #${id} otherMeterial`;
  }
}
