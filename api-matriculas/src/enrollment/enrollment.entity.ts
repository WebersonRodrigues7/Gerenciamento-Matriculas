import { Course } from "../course/course.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity()
export class Enrollments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentName: string;

  @Column()
  studentEmail: string;

  @Column()
  studentPhone: string;

  @Column()
  birthDate: string;

  @Column()
  studentCpf: string;

  @Column()
  courseId: number;

  @ManyToOne(() => Course, course => course.enrollments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "courseId" })
  course: Course;

  @CreateDateColumn({ name: "createAt" })
  createAt: Date;
}