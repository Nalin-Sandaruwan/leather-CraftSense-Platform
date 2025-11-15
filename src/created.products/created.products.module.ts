import { Module } from '@nestjs/common';
import { CreatedProductsService } from './created.products.service';
import { CreatedProductsController } from './created.products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatedProduct } from './entities/created.product.entity';
import { Product } from 'src/plan/product/entities/product.entity';
import { LeatherBatch } from 'src/leather_batch/entities/leather_batch.entity';
import { Meterial } from 'src/meterials/entities/meterial.entity';
import { MeterialsService } from 'src/meterials/meterials.service';
import { OtherMeterial } from 'src/other_meterial/entities/other_meterial.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CreatedProduct]),
        TypeOrmModule.forFeature([Product]),
        TypeOrmModule.forFeature([LeatherBatch]),
        TypeOrmModule.forFeature([Meterial]),
        TypeOrmModule.forFeature([OtherMeterial])
],
  controllers: [CreatedProductsController],
  providers: [CreatedProductsService, MeterialsService],
})
export class CreatedProductsModule {}
