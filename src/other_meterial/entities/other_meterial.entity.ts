import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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

    @ManyToOne(()=> User, (user)=> user.other_Meterials, { nullable: false })
    user:User

    

}
