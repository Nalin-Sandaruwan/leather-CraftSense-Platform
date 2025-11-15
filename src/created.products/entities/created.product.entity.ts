import { Product } from "src/plan/product/entities/product.entity";
import { Column, CreateDateColumn,  Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CreatedProduct {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    count: number;

    @Column({ type: 'float' })
    total_cost: number;


    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
    
    @ManyToOne(() => Product, (product) => product.createdProducts, { eager: true })
    product_Plan: Product


}
