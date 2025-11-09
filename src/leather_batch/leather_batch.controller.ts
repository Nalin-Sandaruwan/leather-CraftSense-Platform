import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeatherBatchService } from './leather_batch.service';
import { CreateLeatherBatchDto } from './dto/create-leather_batch.dto';
import { UpdateLeatherBatchDto } from './dto/update-leather_batch.dto';

@Controller('leather-batch')
export class LeatherBatchController {
  constructor(private readonly leatherBatchService: LeatherBatchService) {}

  @Post()
  create(@Body() createLeatherBatchDto: CreateLeatherBatchDto) {
    return this.leatherBatchService.create(createLeatherBatchDto);
  }

  @Get()
  findAll() {
    return this.leatherBatchService.findAllWithMeterials();
  }

  @Get('meterial-ids/:id')
  findOneMeterialIds(@Param('id') id: string) {
    return this.leatherBatchService.findOneMeterialIds(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leatherBatchService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeatherBatchDto: UpdateLeatherBatchDto) {
    return this.leatherBatchService.update(+id, updateLeatherBatchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leatherBatchService.remove(+id);
  }
}
