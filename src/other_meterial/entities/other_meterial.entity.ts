import { Product } from "src/plan/product/entities/product.entity";
import { TypesOtherMeterial } from "src/types_other_meterial/entities/types_other_meterial.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(()=> User, (user)=> user.other_Meterials)
    user:User

    @ManyToOne(()=> TypesOtherMeterial, typeOtherMeterial => typeOtherMeterial.otherMeterials)
    typeOtherMeterial: TypesOtherMeterial;

    @OneToMany(()=> Product, products => products.otherLetherMeterial)
    products: Product[]

}
