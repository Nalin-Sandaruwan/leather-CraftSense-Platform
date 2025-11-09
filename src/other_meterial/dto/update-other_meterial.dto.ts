import { PartialType } from '@nestjs/mapped-types';
import { CreateOtherMeterialDto } from './create-other_meterial.dto';

export class UpdateOtherMeterialDto extends PartialType(CreateOtherMeterialDto) {}
