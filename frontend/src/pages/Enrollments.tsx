import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { IEnrollments } from "../types/IEnrollments"
import { useForm } from "react-hook-form"
import type { EnrollmentsSchema } from "../schemas/enrollmentsSchema"
import { enrollmentSchema, } from "../schemas/enrollmentsSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../styles/enrollmentStyle.css"
import { FaArrowLeft, FaGraduationCap } from "react-icons/fa"


export default function Enrollments() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<EnrollmentsSchema>({
        resolver: zodResolver(enrollmentSchema)
    })
    const queryClient = useQueryClient()
    const { mutate: criar } = useMutation<IEnrollments, Error, {
        studentName: string,
        studentEmail: string,
        studentPhone: string,
        birthDate: string,
        studentCpf: string,
        courseId: number
    }
    >

        ({
            // pegando a api
            mutationFn: (data) => fetch("http://localhost:3000/enrollments", {
                method: "POST",
                //passando o conteudo q vem pro header
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                //transformando o conteudo em json
                body: JSON.stringify(data)
            }).then(r => {
                if (!r) throw new Error()
                return r.json()
            }),
            // se for sucesso, re-renderize a pagine
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["enrollments"] })
            }
        })

    function onsubmit(data: EnrollmentsSchema) {
        criar(data)
        reset()
    }

    return (
        <>
            <Navbar />
            <div className="top-enrollments">
                <p className="back-to"><FaArrowLeft size={10} /> Voltar para listagem</p>
                <h2 className="h2-enrollment">Nova Matrícula</h2>
                <p className="p-enrollments">Preencha os dados abaixo para formalizar o ingresso do novo aluno no ecossistema de cursos</p>
            </div>
            <div className="form-div">
                <form onSubmit={handleSubmit(onsubmit)}>
 
                    
                    <div className="div-input">
                        <label className="label-form" htmlFor="name">Nome Completo</label>
                        <input
                            className="input-padrao"
                            {...register("studentName")}
                            id="name"
                            type="text"
                            placeholder="Ex: Maria Silva Oliveira"
                        />
                        {errors.studentName && <p className="erro-msg">{errors.studentName.message}</p>}
                    </div>
 
                    
                    <div className="sec-div">
                        <div className="div-input">
                            <label className="label-form" htmlFor="cpf">CPF</label>
                            <input
                                className="input-padrao"
                                {...register("studentCpf")}
                                id="cpf"
                                type="text"
                                placeholder="000.000.000-00"
                            />
                            {errors.studentCpf && <p className="erro-msg">{errors.studentCpf.message}</p>}
                        </div>
                        <div className="div-input">
                            <label className="label-form" htmlFor="birth">Data de Nascimento</label>
                            <input
                                className="input-padrao"
                                {...register("birthDate")}
                                id="birth"
                                type="date"
                            />
                            {errors.birthDate && <p className="erro-msg">{errors.birthDate.message}</p>}
                        </div>
                    </div>
 
                    
                    <div className="sec-div">
                        <div className="div-input">
                            <label className="label-form" htmlFor="email">E-mail</label>
                            <input
                                className="input-padrao"
                                {...register("studentEmail")}
                                id="email"
                                type="text"
                                placeholder="nome@exemplo.com"
                            />
                            {errors.studentEmail && <p className="erro-msg">{errors.studentEmail.message}</p>}
                        </div>
                        <div className="div-input">
                            <label className="label-form" htmlFor="phone">Celular</label>
                            <input
                                className="input-padrao"
                                {...register("studentPhone")}
                                id="phone"
                                type="text"
                                placeholder="(00) 00000-0000"
                            />
                            {errors.studentPhone && <p className="erro-msg">{errors.studentPhone.message}</p>}
                        </div>
                    </div>
 
                    
                    <div className="div-input">
                        <label className="label-form" htmlFor="courseid">Seleção de Curso</label>
                        <input
                            className="input-padrao select-curso"
                            {...register("courseId", { valueAsNumber: true })}
                            id="courseid"
                            type="number"
                            placeholder="ID do curso"
                        />
                        {errors.courseId && <p className="erro-msg">{errors.courseId.message}</p>}
                    </div>
 
                    
                    <div className="info-aviso">
                        <div className="info-aviso-icon">
                            <span>i</span>
                        </div>
                        <p>Ao criar a matrícula, o sistema enviará automaticamente os dados de acesso para o e-mail do aluno.</p>
                    </div>
 
                    
                    <button className="btn-submit" type="submit">
                        Criar Matrícula <FaGraduationCap size={14} />
                    </button>
 
                </form>
            </div>
 
            <Footer />
        </>
    )
}