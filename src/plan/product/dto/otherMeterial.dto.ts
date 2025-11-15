import { IsNumber } from "class-validator";

export class OtherMeterialDto {
    @IsNumber()
    other_Meterial_TypeId: number;

    @IsNumber()
    quantity: number;

    
}