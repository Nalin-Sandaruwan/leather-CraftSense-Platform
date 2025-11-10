import { LeatherBatch } from "src/leather_batch/entities/leather_batch.entity";
import { Column, Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn } from "typeorm";

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

    @Column('double precision',{ nullable: true })
    meterialCost: number;

    @Column('double precision',{ nullable: true })
    otherMeterialCost: number;

    @Column('double precision',{ nullable: true })
    laborCost: number;

    @Column('double precision', { nullable: true })
    totalCost: number;

    // changed: use ManyToMany and plural property name
    @ManyToMany(() => LeatherBatch, leatherBatch => leatherBatch.products)
    @JoinTable()
    leatherBatches: LeatherBatch[];

    // recomended meterials, etc. ----- relation
    // recomended Other meterrials ----- relation


}
