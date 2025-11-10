import { Meterial } from 'src/meterials/entities/meterial.entity';
import { Product } from 'src/plan/product/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('leather_batch')
export class LeatherBatch {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Batch_Name: string;

    @Column({ type: 'float', nullable: true })
    Exsisting_Leather_Area?: number;

    @Column({ type: 'float', nullable: true })
    Used_Leather_Area?: number;

    @Column({ type: 'float', nullable: true })
    Available_Leather_Area?: number;

    @Column({ type: 'timestamp', nullable: true })
    Created_At?: Date;

    @Column({ type: 'timestamp', nullable: true })
    Updated_At?: Date;

    @OneToMany(() => Product, product => product.leather_batch)
    products: Product[];
    // foreign key column (optional but useful)
    // @Column({ nullable: true })
    // Meteraial_Id?: number;

    // ManyToOne relation to Meterial entity — use this property name in joins: 'leatherBatch.meterial'
    @OneToMany(() => Meterial, (meterials) => meterials.leatherBatch)
    // @JoinColumn({ name: 'Meterial_Id' })
    meterial: Meterial[];
}
