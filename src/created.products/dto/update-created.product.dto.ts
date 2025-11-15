import { PartialType } from '@nestjs/mapped-types';
import { CreateCreatedProductDto } from './create-created.product.dto';

export class UpdateCreatedProductDto extends PartialType(CreateCreatedProductDto) {}
