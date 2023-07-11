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

@Entity()
export class OwaDocument {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  url: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  uri: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  pageTitle: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  pageType: string;
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

  @OneToMany(() => OwaSession, (session: OwaSession) => session.firstPage)
  firstSessionList: OwaSession[];

  @OneToMany(() => OwaSession, (session: OwaSession) => session.lastPage)
  lastSessionList: OwaSession[];
}
