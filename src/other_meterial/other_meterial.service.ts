import { Injectable } from '@nestjs/common';
import { CreateOtherMeterialDto } from './dto/create-other_meterial.dto';
import { UpdateOtherMeterialDto } from './dto/update-other_meterial.dto';

@Injectable()
export class OtherMeterialService {
  create(createOtherMeterialDto: CreateOtherMeterialDto) {
    return 'This action adds a new otherMeterial';
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
