import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypesOtherMeterialService } from './types_other_meterial.service';
import { CreateTypesOtherMeterialDto } from './dto/create-types_other_meterial.dto';
import { UpdateTypesOtherMeterialDto } from './dto/update-types_other_meterial.dto';

@Controller('types-other-meterial')
export class TypesOtherMeterialController {
  constructor(private readonly typesOtherMeterialService: TypesOtherMeterialService) {}

  @Post()
  create(@Body() createTypesOtherMeterialDto: CreateTypesOtherMeterialDto) {
    return this.typesOtherMeterialService.create(createTypesOtherMeterialDto);
  }

  @Get()
  findAll() {
    return this.typesOtherMeterialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typesOtherMeterialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypesOtherMeterialDto: UpdateTypesOtherMeterialDto) {
    return this.typesOtherMeterialService.update(+id, updateTypesOtherMeterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typesOtherMeterialService.remove(+id);
  }
}
