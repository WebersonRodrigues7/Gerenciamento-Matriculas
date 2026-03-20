import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Repository } from 'typeorm';
import { CourseDTO } from './dto/upsert-dto.collaborator';
import { Enrollments } from 'src/enrollment/enrollment.entity';

@Injectable()
export class CourseService {

    constructor(@InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Enrollments)
    private readonly enrollmentRepo: Repository<Enrollments>
) {}

getAll(){
    return this.courseRepository.find()
}

async getEnrollments(id: number){
   const gettingID = await this.courseRepository.findOne({where: {id}})
   if(!gettingID){
    throw new NotFoundException("Curso não encontrado")
   }

   return this.enrollmentRepo.find({
    where: {course: {id}}
   })
}

async create(courseBody: CourseDTO){
    const newCourse = await this.courseRepository.create(courseBody)
    await this.courseRepository.save(newCourse)
    return {
        "message": "Curso criado"
    }
}

async update(id: number, courseBody: CourseDTO){
    const gettingID = await this.courseRepository.findOne({where: {id}})
    if(!gettingID){
        throw new NotFoundException("Curso não encontrado")
    }

    return await this.courseRepository.update(id, courseBody)
}

async toggleActive(id:number){
   const gettingID = await this.courseRepository.findOne({where: {id}})
    if(!gettingID){
        throw new NotFoundException("Curso não encontrado")
    }

    const active = !gettingID.active

    await this.courseRepository.update(id, {active})


    return {
        message: active ? "Curso ativado!" :  "Curso desativado!"
    }
}


}
