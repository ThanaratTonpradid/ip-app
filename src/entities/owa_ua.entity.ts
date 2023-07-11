import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OwaSession } from './owa_session.entity';
import { OwaRequest } from './owa_request.entity';

@Entity()
export class OwaUa {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  browser_type: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  ua: string;
  @Column({
    type: 'text',
    nullable: false,
  })
  browser: string;
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

  @OneToMany(() => OwaSession, (session: OwaSession) => session.ua)
  sessionList: OwaSession[];

  @OneToMany(() => OwaRequest, (req: OwaRequest) => req.ua)
  requestList: OwaRequest[];
}
