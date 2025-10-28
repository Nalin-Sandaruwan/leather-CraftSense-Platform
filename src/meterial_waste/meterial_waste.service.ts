import { Injectable } from '@nestjs/common';
import { CreateMeterialWasteDto } from './dto/create-meterial_waste.dto';
import { UpdateMeterialWasteDto } from './dto/update-meterial_waste.dto';

@Injectable()
export class MeterialWasteService {
  create(createMeterialWasteDto: CreateMeterialWasteDto) {
    return 'This action adds a new meterialWaste';
  }

  findAll() {
    return `This action returns all meterialWaste`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meterialWaste`;
  }

  update(id: number, updateMeterialWasteDto: UpdateMeterialWasteDto) {
    return `This action updates a #${id} meterialWaste`;
  }

  remove(id: number) {
    return `This action removes a #${id} meterialWaste`;
  }
}
