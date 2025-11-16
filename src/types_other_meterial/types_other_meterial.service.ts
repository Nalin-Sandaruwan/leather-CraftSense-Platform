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
    return this.typesOtherMeterialRepository.createQueryBuilder('typesOtherMeterial')
    .leftJoinAndSelect('typesOtherMeterial.user','user')
    .getMany();
  }

  findOne(id: number) {
    return this.typesOtherMeterialRepository.createQueryBuilder('typesOtherMeterial')
    .leftJoinAndSelect('typesOtherMeterial.user','user')
    .where('typesOtherMeterial.id = :id',{id})
    .getOne();
  }

  update(id: number, updateTypesOtherMeterialDto: UpdateTypesOtherMeterialDto) {
    return this.typesOtherMeterialRepository.update(id, updateTypesOtherMeterialDto);
  }

  remove(id: number) {
    return this.typesOtherMeterialRepository.delete(id);
  }
}
