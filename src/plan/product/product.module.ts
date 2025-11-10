import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeatherBatch } from 'src/leather_batch/entities/leather_batch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),
  TypeOrmModule.forFeature([LeatherBatch])
],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
