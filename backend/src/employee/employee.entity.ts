import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'varchar', length: 100 })
  role: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
