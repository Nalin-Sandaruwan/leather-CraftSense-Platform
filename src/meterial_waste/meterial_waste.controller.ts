import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MeterialWasteService } from './meterial_waste.service';
import { CreateMeterialWasteDto } from './dto/create-meterial_waste.dto';
import { UpdateMeterialWasteDto } from './dto/update-meterial_waste.dto';

@Controller('meterial-waste')
export class MeterialWasteController {
  constructor(private readonly meterialWasteService: MeterialWasteService) {}

  @Post()
  create(@Body() createMeterialWasteDto: CreateMeterialWasteDto) {
    return this.meterialWasteService.create(createMeterialWasteDto);
  }

  @Get()
  findAll() {
    return this.meterialWasteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meterialWasteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeterialWasteDto: UpdateMeterialWasteDto) {
    return this.meterialWasteService.update(+id, updateMeterialWasteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meterialWasteService.remove(+id);
  }
}
