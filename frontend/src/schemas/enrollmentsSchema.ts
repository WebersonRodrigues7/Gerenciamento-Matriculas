import {z} from "zod"

export const enrollmentSchema = z.object({
    studentName: z.string().min(3, "Nome com no minimo 3 caracteres"),
    studentEmail: z.email(),
    studentPhone: z.string(),
    studentCpf: z.string().min(11, "Cpf com 11 caracteres!"),
    birthDate: z.string(),
    courseId: z.number()

})

export type EnrollmentsSchema = z.infer<typeof enrollmentSchema>