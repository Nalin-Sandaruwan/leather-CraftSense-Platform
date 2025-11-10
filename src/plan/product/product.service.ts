import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Product } from './entities/product.entity';
import { LeatherBatch } from 'src/leather_batch/entities/leather_batch.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(LeatherBatch) private readonly leatherBatchRepository: Repository<LeatherBatch>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    if (!createProductDto) throw new BadRequestException('Missing body');

    const lbIds = Array.isArray(createProductDto.leatherBatch) ? createProductDto.leatherBatch : [];
    const product = this.productRepository.create({ ...createProductDto });

    if (lbIds.length) {
      const batches = await this.leatherBatchRepository.find({ where: { id: In(lbIds) } });
      if (batches.length !== lbIds.length) {
        throw new BadRequestException('One or more leatherBatch ids not found');
      }
      product.leatherBatches = batches;
    }

    return this.productRepository.save(product);
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.leatherBatches','leatherBatch')
      .where('product.id = :id',{id})
      .getOne()
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
