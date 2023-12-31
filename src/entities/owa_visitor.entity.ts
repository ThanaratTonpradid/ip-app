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
export class OwaVisitor {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  visitor_name: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  visitor_email: string;
  @Column({
    type: 'int',
    unsigned: true,
    nullable: true,
  })
  firstSessionId: number;
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  firstSessionTime: string;
  @Column({
    type: 'int',
    unsigned: true,
    nullable: true,
  })
  lastSessionId: number;
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  lastSessionTime: string;
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

  @OneToMany(() => OwaSession, (session: OwaSession) => session.visitor)
  sessionList: OwaSession[];

  @OneToMany(() => OwaRequest, (req: OwaRequest) => req.visitor)
  requestList: OwaRequest[];
}
