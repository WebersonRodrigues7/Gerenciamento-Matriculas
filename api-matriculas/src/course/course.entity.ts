import { Enrollments } from "../enrollment/enrollment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({default: true})
  active: boolean;

  @OneToMany(() => Enrollments, enrollment => enrollment.course)
  enrollments: Enrollments[];
}