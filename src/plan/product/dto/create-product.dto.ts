import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

    @IsString()
    name: string;   

    @IsString()
    description: string;

    @IsString()
    productplan: string;

    @IsNumber()
    area: number;

    @IsOptional()
    meterialCost?:number

    @IsOptional()
    otherMeterialCost?:number

    @IsOptional()
    laborCost?:number

    @IsOptional()
    totalCost?:number

    @IsNumber({}, { each: true })
    @IsArray()
    leatherBatch:number[]

}
