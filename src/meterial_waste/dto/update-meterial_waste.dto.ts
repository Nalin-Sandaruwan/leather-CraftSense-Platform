import { PartialType } from '@nestjs/mapped-types';
import { CreateMeterialWasteDto } from './create-meterial_waste.dto';

export class UpdateMeterialWasteDto extends PartialType(CreateMeterialWasteDto) {}
