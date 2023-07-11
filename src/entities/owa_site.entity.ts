import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OwaSession } from './owa_session.entity';
import { OwaRequest } from './owa_request.entity';

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

  @OneToMany(() => OwaSession, (session: OwaSession) => session.site)
  sessionList: OwaSession[];

  @OneToMany(() => OwaRequest, (req: OwaRequest) => req.site)
  requestList: OwaRequest[];
}
