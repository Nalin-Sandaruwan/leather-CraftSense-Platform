import { IsString } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreateTypesOtherMeterialDto {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    type_Name: string;

    @IsString()
    description: string;
}
