import bcrypt from 'node_modules/bcryptjs';
import { role } from 'src/auth/enums/roles.enum';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';



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
    default: role.USER,
  })
  role: role;

  @BeforeInsert()
  async hashPassword(){
    this.password = await bcrypt.hash(this.password, 10)
  }
  
}
