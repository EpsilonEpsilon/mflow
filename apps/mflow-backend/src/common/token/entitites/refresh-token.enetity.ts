import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entitites/user.entitity';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.id, { nullable: false })
  user: User;

  @Column({ nullable: false })
  tokenHash: string;

  @Column({ nullable: true })
  ip: string;

  @Column({ nullable: true })
  userAgent: string;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @Column({ nullable: false })
  deviceId: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;
}
