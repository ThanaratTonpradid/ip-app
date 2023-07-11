import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OwaHost } from './owa_host.entity';
import { OwaOs } from './owa_os.entity';
import { OwaUa } from './owa_ua.entity';
import { OwaVisitor } from './owa_visitor.entity';
import { OwaSite } from './owa_site.entity';
import { OwaDocument } from './owa_document.entity';

@Entity()
export class OwaSession {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  sessionTimestamp: string;
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

  @ManyToOne(() => OwaHost, (host: OwaHost) => host.sessionList)
  host: OwaHost;

  @ManyToOne(() => OwaOs, (os: OwaOs) => os.sessionList)
  os: OwaOs;

  @ManyToOne(() => OwaUa, (ua: OwaUa) => ua.sessionList)
  ua: OwaUa;

  @ManyToOne(() => OwaVisitor, (visitor: OwaVisitor) => visitor.sessionList)
  visitor: OwaVisitor;

  @ManyToOne(() => OwaSite, (site: OwaSite) => site.sessionList)
  site: OwaSite;

  @ManyToOne(() => OwaDocument, (document: OwaDocument) => document.firstSessionList)
  firstPage: OwaDocument;

  @ManyToOne(() => OwaDocument, (document: OwaDocument) => document.lastSessionList)
  lastPage: OwaDocument;
}
