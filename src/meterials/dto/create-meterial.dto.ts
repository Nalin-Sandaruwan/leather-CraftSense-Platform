import { IsNumber, IsString } from "class-validator";

export class CreateMeterialDto {
  @IsString()
  name: string;

  @IsNumber()
  full_Area: number;

  @IsNumber()
  available_Area: number;

  @IsNumber()
  used_Area: number;

  @IsNumber()
  full_Cost: number;

  @IsNumber()
  one_Cost: number;

  @IsNumber()
  quantity: number;
  // id of the user that owns this meterial (relation)
  userId?: number;
}
