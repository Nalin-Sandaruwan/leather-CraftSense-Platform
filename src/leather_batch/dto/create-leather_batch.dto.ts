import { Type } from "class-transformer";
import { IsArray,  IsDate,  IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLeatherBatchDto {
    @IsString()
  Batch_Name: string;

  @IsOptional()
  @IsNumber()
  Exsisting_Leather_Area?: number;

  @IsOptional()
  @IsNumber()
  Used_Leather_Area?: number;

  @IsOptional()
  @IsNumber()
  Available_Leather_Area?: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  Created_At?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  Updated_At?: Date;

   @IsOptional()
 
 
  @IsArray()
  @IsNumber({}, { each: true })
  Meteraial_Ids: number[];
}