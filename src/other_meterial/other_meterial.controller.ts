import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OtherMeterialService } from './other_meterial.service';
import { CreateOtherMeterialDto } from './dto/create-other_meterial.dto';
import { UpdateOtherMeterialDto } from './dto/update-other_meterial.dto';

@Controller('other-meterial')
export class OtherMeterialController {
  constructor(private readonly otherMeterialService: OtherMeterialService) {}

  @Post()
  create(@Body() createOtherMeterialDto: CreateOtherMeterialDto) {
    return this.otherMeterialService.create(createOtherMeterialDto);
  }

  @Get()
  findAll() {
    return this.otherMeterialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.otherMeterialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOtherMeterialDto: UpdateOtherMeterialDto) {
    return this.otherMeterialService.update(+id, updateOtherMeterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.otherMeterialService.remove(+id);
  }
}
