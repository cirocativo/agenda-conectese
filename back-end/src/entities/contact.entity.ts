import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./user.entity";

@Entity("contacts")
export class Contact {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, {
    onDelete: "CASCADE",
  })
  user: User;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
