import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { Enrollments } from './enrollment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../course/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollments,Course])],
  providers: [EnrollmentService],
  controllers: [EnrollmentController]
})
export class EnrollmentModule {}
