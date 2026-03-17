
import { Collaborator } from './src/auth/collaborator.entity';

import { Course } from './src/course/course.entity';
import { Enrollments } from './src/enrollment/enrollment.entity';
import { DataSource } from 'typeorm';


export default new DataSource({ // criando as imigrações
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'buss123',
  database: 'marischool',
  entities: [Collaborator, Course, Enrollments],
  migrations: ['dist/migrations/*.js'],
});