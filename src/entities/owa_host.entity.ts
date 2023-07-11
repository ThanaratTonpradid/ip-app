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
export class OwaHost {
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
    nullable: false,
  })
  host: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  fullHost: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  city: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  country: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  latitude: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  longtitude: string;
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

  @OneToMany(() => OwaSession, (session: OwaSession) => session.host)
  sessionList: OwaSession[];

  @OneToMany(() => OwaRequest, (req: OwaRequest) => req.host)
  requestList: OwaRequest[];
}
