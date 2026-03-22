import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { IEnrollments } from "../types/IEnrollments"
import { useForm } from "react-hook-form"
import type {EnrollmentsSchema} from "../schemas/enrollmentsSchema"
import { enrollmentSchema,  } from "../schemas/enrollmentsSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"


export default function Enrollments() {
    const {register, handleSubmit, reset, formState: {errors}} =useForm<EnrollmentsSchema>({
        resolver: zodResolver(enrollmentSchema)
    })
    const queryClient = useQueryClient()
    const {mutate: criar} = useMutation<IEnrollments, Error, {
    studentName: string,
    studentEmail: string,
    studentPhone: string,
    birthDate: string,
    studentCpf: string,
    courseId: number}>({
        // pegando a api
        mutationFn: (data) => fetch("http://localhost:3000/enrollments", {
            method: "POST",
            //passando o conteudo q vem pro header
            headers: {"Content-Type": "application/json", 
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            //transformando o conteudo em json
            body: JSON.stringify(data)
        }).then (r => {
            if(!r) throw new Error()
               return r.json()
        }),
        // se for sucesso, re-renderize a pagine
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["enrollments"]})
        }
    })

function onsubmit(data: EnrollmentsSchema) {
    criar(data)
    reset()
}

    return (
        <>
        <Navbar />
        <form onSubmit={handleSubmit(onsubmit)}>
            <label htmlFor="name">Nome</label>
            <input {...register("studentName")} id="name" type="text" />
            {errors.studentName && <p>{errors.studentName.message}</p>}
            <label htmlFor="cpf">Cpf</label>
            <input {...register("studentCpf")} id="cpf" type="text" />
            {errors.studentCpf && <p>{errors.studentCpf.message}</p>}
            <label htmlFor="email">Email</label>
            <input {...register("studentEmail")} id="email" type="text" />
            {errors.studentEmail && <p>{errors.studentEmail.message}</p>}
            <label htmlFor="phone">Celular</label>
            <input {...register("studentPhone")} id="phone" type="text" />
            {errors.studentPhone && <p>{errors.studentPhone.message}</p>}
            <label htmlFor="birth">Data Nasc.</label>
            <input {...register("birthDate")} id="birth" type="text" />
            {errors.birthDate && <p>{errors.birthDate.message}</p>}
            <label htmlFor="courseid">Curso Id</label>
            <input {...register("courseId", {valueAsNumber: true})} id="courseid" type="text" />
            {errors.courseId && <p>{errors.courseId.message}</p>}
            <button type="submit">Criar matricula</button>
        </form>
        <Footer />
        </>
    )
}