import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreatedProductsService } from './created.products.service';
import { CreateCreatedProductDto } from './dto/create-created.product.dto';
import { UpdateCreatedProductDto } from './dto/update-created.product.dto';

@Controller('created-products')
export class CreatedProductsController {
  constructor(private readonly createdProductsService: CreatedProductsService) {}

  @Post()
  create(@Body() createCreatedProductDto: CreateCreatedProductDto) {
    return this.createdProductsService.create(createCreatedProductDto);
  }

  @Get()
  findAll() {
    return this.createdProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.createdProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreatedProductDto: UpdateCreatedProductDto) {
    return this.createdProductsService.update(+id, updateCreatedProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.createdProductsService.remove(+id);
  }
}
