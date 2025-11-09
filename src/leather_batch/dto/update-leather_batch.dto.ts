import { PartialType } from '@nestjs/mapped-types';
import { CreateLeatherBatchDto } from './create-leather_batch.dto';

export class UpdateLeatherBatchDto extends PartialType(CreateLeatherBatchDto) {}
