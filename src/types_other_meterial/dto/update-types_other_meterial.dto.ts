import { PartialType } from '@nestjs/mapped-types';
import { CreateTypesOtherMeterialDto } from './create-types_other_meterial.dto';

export class UpdateTypesOtherMeterialDto extends PartialType(CreateTypesOtherMeterialDto) {}
