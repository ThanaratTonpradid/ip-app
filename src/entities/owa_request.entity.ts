import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OwaDocument } from './owa_document.entity';
import { OwaHost } from './owa_host.entity';
import { OwaOs } from './owa_os.entity';
import { OwaSite } from './owa_site.entity';
import { OwaUa } from './owa_ua.entity';
import { OwaVisitor } from './owa_visitor.entity';
import { OwaSession } from './owa_session.entity';

@Entity()
export class OwaRequest {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  ipAddress: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  visitorName: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  visitorEmail: string;
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  requestTimestamp: string;
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

  @ManyToOne(() => OwaHost, (host: OwaHost) => host.requestList)
  host: OwaHost;

  @ManyToOne(() => OwaOs, (os: OwaOs) => os.requestList)
  os: OwaOs;

  @ManyToOne(() => OwaUa, (ua: OwaUa) => ua.requestList)
  ua: OwaUa;

  @ManyToOne(() => OwaVisitor, (visitor: OwaVisitor) => visitor.requestList)
  visitor: OwaVisitor;

  @ManyToOne(() => OwaSite, (site: OwaSite) => site.requestList)
  site: OwaSite;

  @ManyToOne(() => OwaDocument, (document: OwaDocument) => document.requestList)
  document: OwaDocument;

  @ManyToOne(() => OwaSession, (session: OwaSession) => session.requestList)
  session: OwaSession;
}
