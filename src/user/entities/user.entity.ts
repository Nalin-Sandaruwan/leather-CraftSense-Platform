import bcrypt from 'node_modules/bcryptjs';
import { UserRole } from 'src/auth/enums/roles.enum';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';



@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uId: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @BeforeInsert()
  async hashPassword(){
    this.password = await bcrypt.hash(this.password, 10)
  }
  
}
