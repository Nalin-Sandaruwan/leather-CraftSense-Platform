import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeatherBatch } from 'src/leather_batch/entities/leather_batch.entity';
import { Type } from 'class-transformer';
import { OtherMeterial } from 'src/other_meterial/entities/other_meterial.entity';
import { Meterial } from 'src/meterials/entities/meterial.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([LeatherBatch]),
    TypeOrmModule.forFeature([OtherMeterial]),
    TypeOrmModule.forFeature([Meterial])
],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
