import { LeatherBatch } from "src/leather_batch/entities/leather_batch.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;   
    @Column()   
    description: string;

    @Column()
    productplan: string;

    @Column()
    area: number;

    @Column('double precision')
    meterialCost: number;

    @Column('double precision')
    otherMeterialCost: number;

    @Column('double precision')
    laborCost: number;

    @Column('double precision')
    totalCost: number;

    
    //other meterail cost
    //labor cost
    //total cost
    //

    @ManyToOne(() => LeatherBatch, leatherBatch => leatherBatch.products)
    leather_batch:LeatherBatch[]
    // recomended meterials, etc. ----- relation
    // recomended Other meterrials ----- relation


}
