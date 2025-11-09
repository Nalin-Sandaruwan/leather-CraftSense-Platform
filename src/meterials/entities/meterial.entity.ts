import { LeatherBatch } from "src/leather_batch/entities/leather_batch.entity";
import { User } from "src/user/entities/user.entity";
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity('meterials')
export class Meterial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('double precision')
  full_Area: number;

  @Column('double precision')
  available_Area: number;

  @Column('double precision')
  used_Area: number;

  @Column('double precision')
  full_Cost: number;

  @Column('double precision')
  one_Cost: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_At: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_At: Date;

  @ManyToOne(() => User, (user) => user.meterials)
  user: User;

  @ManyToOne(() => LeatherBatch, (leatherBatch) => leatherBatch.meterial)
  leatherBatch: LeatherBatch;
}
