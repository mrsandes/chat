import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm"

@Entity('message')
export class Message {
  @PrimaryColumn()
  timeStamp: Date;

  @Column() 
  senderName: string;

  @Column({ nullable: true })
  receiverName: string;

  @Column()
  content: string;

  @BeforeInsert()
  setTimeStamp() {
    this.timeStamp = new Date()
  }
}
