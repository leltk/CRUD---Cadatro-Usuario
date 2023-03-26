import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import { hashSync } from "bcryptjs";
import { Exclude } from "class-transformer";
import { Contacts } from "./contact.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 9, unique: true })
  phone: string;

  @Column({ length: 200 })
  image: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  age: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

 @OneToMany(()=> Contacts, (contacts)=> contacts.user)
 contacts:Contacts[];
}


