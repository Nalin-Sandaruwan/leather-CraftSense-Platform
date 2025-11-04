import bcrypt from 'bcryptjs';
import { role } from 'src/auth/enums/roles.enum';

import { Meterial } from 'src/meterials/entities/meterial.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';



@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uId: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column()
  email: string;

  @Column()
  
  password: string;

  @Column({
    type: 'enum',
    enum: role,
    default: role.MANAGER,
  })
  role: role;

  // inverse side must point to the Meterial property that stores the relation (user)
  @OneToMany(() => Meterial, (meterial) => meterial.user)
  meterials: Meterial[];

  @BeforeInsert()
  async hashPassword(){
    this.password = await bcrypt.hash(this.password, 10)
  }
  
}
