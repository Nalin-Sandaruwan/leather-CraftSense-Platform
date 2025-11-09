import { Injectable } from '@nestjs/common';
import { CreateTypesOtherMeterialDto } from './dto/create-types_other_meterial.dto';
import { UpdateTypesOtherMeterialDto } from './dto/update-types_other_meterial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TypesOtherMeterial } from './entities/types_other_meterial.entity';
import { Repository, DeepPartial } from 'typeorm';

@Injectable()
export class TypesOtherMeterialService {

  constructor(
    @InjectRepository(TypesOtherMeterial)
    private typesOtherMeterialRepository: Repository<TypesOtherMeterial>,
  ){}

  create(createTypesOtherMeterialDto: CreateTypesOtherMeterialDto) {
    const createdTypesOtherMeterial = this.typesOtherMeterialRepository.create(createTypesOtherMeterialDto );
    return this.typesOtherMeterialRepository.save(createdTypesOtherMeterial);
  }

  findAll() {
    return `This action returns all typesOtherMeterial`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typesOtherMeterial`;
  }

  update(id: number, updateTypesOtherMeterialDto: UpdateTypesOtherMeterialDto) {
    return `This action updates a #${id} typesOtherMeterial`;
  }

  remove(id: number) {
    return `This action removes a #${id} typesOtherMeterial`;
  }
}
