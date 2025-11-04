import { PartialType } from '@nestjs/mapped-types';
import { CreateMeterialDto } from './create-meterial.dto';

export class UpdateMeterialDto extends PartialType(CreateMeterialDto) {}
