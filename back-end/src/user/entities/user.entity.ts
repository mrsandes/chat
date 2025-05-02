import { nanoid } from "nanoid";
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

@Entity('user')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @BeforeInsert()
  generateId() {
    this.id = `u_${nanoid()}`;
  }
}
