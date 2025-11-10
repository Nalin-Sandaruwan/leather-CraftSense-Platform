import { OtherMeterial } from "src/other_meterial/entities/other_meterial.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TypesOtherMeterial {
    @PrimaryGeneratedColumn()
    type_id: number;

    @Column({ nullable: false })
    type_Name: string;

    @Column({ nullable: false })
    description: string;

    @OneToMany(()=> OtherMeterial, otherMeterial => otherMeterial.typeOtherMeterial)
    otherMeterials: OtherMeterial[];
}
