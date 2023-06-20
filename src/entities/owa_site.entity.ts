import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class OwaSite {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;
  @PrimaryColumn({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  siteId: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  domain: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  kind: string;
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
