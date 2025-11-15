import { Injectable } from '@nestjs/common';
import { CreateCreatedProductDto } from './dto/create-created.product.dto';
import { UpdateCreatedProductDto } from './dto/update-created.product.dto';

@Injectable()
export class CreatedProductsService {
  create(createCreatedProductDto: CreateCreatedProductDto) {
    return 'This action adds a new createdProduct';
  }

  findAll() {
    return `This action returns all createdProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} createdProduct`;
  }

  update(id: number, updateCreatedProductDto: UpdateCreatedProductDto) {
    return `This action updates a #${id} createdProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} createdProduct`;
  }
}
