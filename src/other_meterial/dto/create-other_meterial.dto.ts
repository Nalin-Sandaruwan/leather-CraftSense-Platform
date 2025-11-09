import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOtherMeterialDto {
    @IsString()
    other_Meterial_Name: string;

    @IsBoolean()
    quantity: number;

    @IsBoolean()
    @IsOptional()
    unit_cost: number;

    @IsBoolean()
    total_Cost: number;

    @IsNumber()
    userId?:number

}
