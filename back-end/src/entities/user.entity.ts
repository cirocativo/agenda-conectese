import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";
import { Contact } from "./contact.entity";

@Entity("users")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  isAdm: boolean;

  @Column()
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Contact, (contact) => contact.user, {
    cascade: true,
  })
  contacts: Contact[];

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
