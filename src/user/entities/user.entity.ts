import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
