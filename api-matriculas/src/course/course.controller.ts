import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDTO } from './dto/upsert-dto.collaborator';
import { Public } from 'src/auth/auth.guard';
import { NotFoundError } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

@Controller('courses')
export class CourseController {
    constructor(private readonly courseService: CourseService){}

    @Public()
    @Get('')
    async showALlCourses() {
        let courses = await this.courseService.getAll();
        return courses;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id/enrollments')
    async showEnrollments(@Param('id') id:number){
        const foundCourse = await this.courseService.getEnrollments(id)
        if(!foundCourse){
            throw new NotFoundException("Curso não encontrado")
        }

        return foundCourse;

        
        
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('')
    create(@Body() customerBody: CourseDTO){
        return this.courseService.create(customerBody);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    update(@Param('id') courseID: number, @Body() updateBody: CourseDTO){
        return this.courseService.update(courseID, updateBody);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    delete(@Param('id') courseID: number){
        return this.courseService.delete(courseID);
    }


}
