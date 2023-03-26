import { Entity, Column,PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity("contacts")
export class Contacts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 9, unique: true })
  phone: string;

  
 @ManyToOne(()=> User, (user)=> user.contacts)
 user:User
}

