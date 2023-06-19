import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class OwaUser {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;
  @Column('varchar', { length: 50, unique: true, nullable: false })
  username: string;
  @Column('varchar', { length: 255 })
  password: string;
  @Column('varchar', { length: 255 })
  email: string;
  @Column('varchar', { length: 100 })
  fullname: string;
  @Column('varchar', { length: 20 })
  role: string;
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  createdAt: number;
  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  updatedAt: number;
  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: null | number;
}
