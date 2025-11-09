import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TypesOtherMeterial {
    @PrimaryGeneratedColumn()
    type_id: number;

    @Column({ nullable: false })
    type_Name: string;

    @Column({ nullable: false })
    description: string;
}
