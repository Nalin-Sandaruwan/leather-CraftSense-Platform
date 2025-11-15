import { IsString, IsInt, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCreatedProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  count: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'total_cost must be a number' })
  @Min(0)
  total_cost: number;

  // supply the related Product id
  @Type(() => Number)
  @IsInt()
  @Min(1)
  product_PlanId: number;

  @Type(() => Number)
  leatherBatchIds?: number;

  @Type(() => Number)
  leatherMeterialIds?: number;

  @Type(() => Number)
  other_Meterial_TypeId?:number[];
}