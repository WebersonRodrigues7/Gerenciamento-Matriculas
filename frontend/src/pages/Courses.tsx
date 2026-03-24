import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ICourses } from "../types/ICourses";
import styles from "../styles/modal.module.css"
import "../styles/courseStyle.css"
import { useForm } from "react-hook-form";
import { courseschema, type CourseSchema } from "../schemas/courseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { IEnrollments } from "../types/IEnrollments";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { IoIosRemoveCircle } from "react-icons/io";
import { IoAddCircle, IoEyeSharp } from "react-icons/io5";
import { FaMoneyBill1Wave } from "react-icons/fa6";

import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

export default function Courses() {
    const [cursoselecionado, setCursoselecionado] = useState<number | null>(null)
    const queryClient = useQueryClient()
    const [modal, setModal] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CourseSchema>({
        resolver: zodResolver(courseschema)
    })


    const { data, isLoading, isError } = useQuery<ICourses[]>({
        queryKey: ["courses"],
        // pegando a api
        queryFn: () => fetch("http://localhost:3000/courses", {
            // usando o metodo get pra reotrnar os cursos
            method: "GET",
            // pegando o token q é retornado no header
            headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
        }).then((r) => {
            // caso nao encontre a resposta da requisicao, mande um erro
            if (!r.ok) {
                throw new Error()
            } return r.json()
        }),
    })
    const { mutate: criar } = useMutation<ICourses, Error, { name: string, price: number, active: boolean }>({
        mutationFn: (data) => fetch("http://localhost:3000/courses", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        }).then(r => {
            if (!r.ok) throw new Error()
            return r.json()
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] })
        }
    })

    const { mutate: deletar } = useMutation<void, Error, { id: number }>({
        mutationFn: (data) => fetch(`http://localhost:3000/courses/${data.id}/toggle`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((r) => {
            if (!r.ok) throw new Error()
            return r.json()
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] })
        }
    })
    const { data: matriculas } = useQuery<IEnrollments[]>({
        queryKey: ["enrollments", cursoselecionado],
        enabled: cursoselecionado !== null,
        //
        queryFn: () => fetch(`http://localhost:3000/courses/${cursoselecionado}/enrollments`, {
            // usando o metodo get pra pegar todas as matriculas
            method: "GET",
            // autorizando pelo token q é retornado no header
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }).then((r) => {
            if (!r.ok) {
                throw new Error();
            }
            return r.json()
        }),
    })

    function onsubmit(data: CourseSchema) {
        criar({ ...data, active: true })
        reset()
    }


    return (

        <div className="body">
            <Navbar />

            <h1 className="h1-courses">Cursos</h1>
            <div className="div-courses-all">
                <p className="courses-paragraph">Gerencie o catálogo de cursos, monitore o status de ativação e visualize as matrículas ativas em cada módulo.</p>
                <div className="btn-createCourse"><button onClick={() => setModal(true)}>
                    <IoAddCircle size={17}  />
                Criar curso</button></div>
                {modal && (
                    <div className={styles.overlay} onClick={() => setModal(false)}>
                        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => setModal(false)}>Fechar</button>
                            <form onSubmit={handleSubmit(onsubmit)}>
                                <label htmlFor="name">Nome do curso</label>
                                <input {...register("name")} id="name" type="text" placeholder="Ex: Curso de TI" />
                                {errors.name && <p>{errors.name.message}</p>}
                                <label htmlFor="price">Preço</label>
                                <input {...register("price", { valueAsNumber: true })} type="text" id="price" placeholder="Ex: 200" />
                                {errors.price && <p>{errors.price.message}</p>}
                                <label htmlFor="description">Descrição</label>
                                <input {...register("description")} type="text" id="description" placeholder="Aprender a..." />
                                {errors.description && <p>{errors.description.message}</p>}
                                <button type="submit">Criar</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>


            {isLoading && <p>Carregando...</p>}
            {isError && <p>Erro na requisição!</p>}
            <div className="pai-courses-container">
                <div className="courses-container">
                    {data?.map((item, i) => (
                        <div key={i} className={item.active ? "div-courses" : "div-courses-inative"} >
                            <div className="actid">
                                <p className={item.active ? "status-ativo" : "status-inativo"}>{item.active ? 'Ativo' : 'Inativo'}</p>
                                <p className="id-course">ID: {item.id}</p>
                            </div>
                            <h4>{item.name}</h4>
                            <p > <FaMoneyBill1Wave color="grey" />Preço: <span className="price">R$ {item.price}</span></p>
                
                            <div className="btn-div-courses">
                                <button className={item.active ?  "curso-ativo" : "curso-inativo"} onClick={() => deletar({ id: item.id })}>{item.active ?  (
                                    <div className="desactive-btn">
                                       <IoIosRemoveCircle /> Desativar
                                    </div>
                                    ) : (
                                        <div className="active-btn">
                                            <FaCheckCircle color="skyblue" /> Ativar
                                        </div>
                                    )}
                                    </button>
                                <button className={item.active ? "btn-enrollments" : "btn-enrollments-desac"} onClick={() => setCursoselecionado(item.id)}>{item.active ? (
                                    <div className="arr-enrollments">
                                        Ver matrículas<FaArrowRight />
                                    </div>
                                ) : (
                                    <div className="eye-enrollments">
                                        Ver matrículas <IoEyeSharp />
                                    </div>
                                )}
                                    
                                    </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {
                //se o curso foi diferente de nulo, mostra o modal
                cursoselecionado !== null && (
                    //mostra o medal e coloca o curso como nulo
                    <div className={styles.overlay} onClick={() => setCursoselecionado(null)}>
                        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                            {matriculas?.map((item, i) => (
                                <div key={i}>
                                    <h1>{item.studentName}</h1>
                                    <p>{item.studentEmail}</p>
                                </div>
                            ))}

                        </div>

                    </div>
                )}


            <Footer />
        </div>
    )



}