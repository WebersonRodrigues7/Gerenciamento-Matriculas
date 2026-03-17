import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course } from './course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollments } from 'src/enrollment/enrollment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Enrollments])],
  providers: [CourseService],
  controllers: [CourseController]
})
export class CourseModule {}
