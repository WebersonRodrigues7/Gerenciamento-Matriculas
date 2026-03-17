import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollments } from './enrollment.entity';
import { Repository } from 'typeorm';
import { EnrollmentsDTO } from './dto/upsert-dto.enrollment';
import { Course } from '../course/course.entity';

@Injectable()
export class EnrollmentService {
    
    constructor(@InjectRepository(Enrollments)
    private enrollmentsRepository: Repository<Enrollments>,
    @InjectRepository(Course)
    private courseRepo: Repository<Course>
) {}


getAll(){
    return this.enrollmentsRepository.find()
}

async create(enrollments: EnrollmentsDTO){
    const course = await this.courseRepo.findOne({where: {id: enrollments.courseId}})
    if(!course){
        throw new NotFoundException("Curso não encontrado")
    }
    if(!course.active){
        throw new BadRequestException("Curso inativo")
    }

    const newEnrollments = this.enrollmentsRepository.create(enrollments);
    await this.enrollmentsRepository.save(newEnrollments)

    return {
        message: "Matrícula criada com sucesso!"
    }

}

async delete(id: number){
    const gettingID = await this.enrollmentsRepository.findOne({where: {id}})
    if(!gettingID){
        throw new NotFoundException("Matrícula não encontrada")
    }
    await this.enrollmentsRepository.delete(id)

    return {
        message: "Matrícula excluída com sucesso!"
    }
}
    



}
