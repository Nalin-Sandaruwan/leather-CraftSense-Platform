import { IsString } from "class-validator";

export class CreateTypesOtherMeterialDto {
    @IsString()
    type_Name: string;

    @IsString()
    description: string;
}
