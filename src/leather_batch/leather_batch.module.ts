import { Module } from '@nestjs/common';
import { LeatherBatchService } from './leather_batch.service';
import { LeatherBatchController } from './leather_batch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeatherBatch } from './entities/leather_batch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeatherBatch])],
  controllers: [LeatherBatchController],
  providers: [LeatherBatchService],
  exports:[LeatherBatchService]
})
export class LeatherBatchModule {}
