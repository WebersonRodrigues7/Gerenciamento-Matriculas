import { Body, Post, Get, Delete, Controller, UseGuards, Param } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentsDTO } from './dto/upsert-dto.enrollment';
import { Public } from 'src/auth/auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('enrollments')
export class EnrollmentController {
    constructor(private enrollments: EnrollmentService ) {}

    @Public()
    @Get()
    getall(){
        return this.enrollments.getAll()
    }

    @Public()
    @Post()
    create(@Body() enrollmentsBody: EnrollmentsDTO){
        return this.enrollments.create(enrollmentsBody)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    delete(@Param('id') id: number){
        return this.enrollments.delete(id)
    }
}

