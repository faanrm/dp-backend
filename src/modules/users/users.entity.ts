import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
@Entity()
export class Users {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column()
  name: string;
  @Column()
  email: string;

  @CreateDateColumn()
  create_at: Date;
  @UpdateDateColumn()
  update_at: Date;
}
