import { Module } from '@nestjs/common';
import { CreatedProductsService } from './created.products.service';
import { CreatedProductsController } from './created.products.controller';

@Module({
  controllers: [CreatedProductsController],
  providers: [CreatedProductsService],
})
export class CreatedProductsModule {}
