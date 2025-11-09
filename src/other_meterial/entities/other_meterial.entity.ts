import { Column, PrimaryGeneratedColumn } from "typeorm";

export class OtherMeterial {

    @PrimaryGeneratedColumn()
    other_Meterial_Id: number;

    @Column()
    other_Meterial_Name: string;

    @Column('double precision')
    quantity: number;

    @Column('double precision')
    unit_cost: number;

    @Column('double precision')
    total_Cost: number;

    

}
