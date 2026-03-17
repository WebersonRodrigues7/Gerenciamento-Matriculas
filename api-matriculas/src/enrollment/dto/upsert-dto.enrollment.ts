import { IsDate, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator"


export class EnrollmentsDTO {
  @IsNotEmpty()
  @IsString()   
  studentName: string;

  @IsNotEmpty()
  @IsString()
  studentEmail: string;

  @IsNotEmpty()
  studentCpf: string;

  @IsNotEmpty()
  studentPhone: string;

  @IsNotEmpty()
  birthDate: string;

  @IsNotEmpty()
  @IsNumber()
  courseId: number;
}