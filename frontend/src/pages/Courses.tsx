import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ICourses } from "../types/ICourses";
import { useState } from "react";
import styles from "../styles/modal.module.css"
import "../styles/courseStyle.css"
import { useForm } from "react-hook-form";
import { courseschema, type CourseSchema } from "../schemas/courseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { IEnrollments } from "../types/IEnrollments";

export default function Courses() {
    const [cursoselecionado, setCursoselecionado] = useState<number | null>(null)
    const queryClient = useQueryClient()
    const [modal, setModal] = useState(false)
    const {register, handleSubmit, reset, formState: {errors}} = useForm<CourseSchema>({
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
    const {mutate: criar} = useMutation<ICourses, Error, {name: string, price: number, active: boolean}>({
        mutationFn: (data) => fetch("http://localhost:3000/courses", {
            method: "POST",
            headers: {'Content-Type': 'application/json', 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        }).then(r => {
            if(!r.ok) throw new Error()
                return r.json()
        }),
        onSuccess:  () => {
            queryClient.invalidateQueries({ queryKey: ['courses']})
        }
    })

    const {mutate: deletar} = useMutation<void,Error, {id: number}>({
        mutationFn: (data) => fetch(`http://localhost:3000/courses/${data.id}/toggle`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then((r) => {
            if(!r.ok) throw new Error()
                return r.json()
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses']})
        }
    })
    const {data: matriculas} = useQuery<IEnrollments[]>({
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

    function onsubmit(data: CourseSchema){
        criar({...data, active: true})
        reset()
    }


    return (
        <>
        <h1 className="h1-courses">Cursos</h1>
        <button onClick={() => setModal(true)}>Criar curso</button>
        {modal && (
    <div className={styles.overlay} onClick={() => setModal(false)}>
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <button onClick={() => setModal(false)}>Fechar</button>
      <form onSubmit={handleSubmit(onsubmit)}>
        <label htmlFor="name">Nome do curso</label>
        <input {...register("name")} id="name" type="text" placeholder="Ex: Curso de TI"/>
        {errors.name && <p>{errors.name.message}</p>}
        <label htmlFor="price">Preço</label>
        <input {...register("price", {valueAsNumber: true})} type="text" id="price" placeholder="Ex: 200"/>
        {errors.price && <p>{errors.price.message}</p>}
        <label htmlFor="description">Descrição</label>
        <input {...register("description")} type="text" id="description" placeholder="Aprender a..." />
        {errors.description && <p>{errors.description.message}</p>}
        <button type="submit">Criar</button>
        
      </form>
    </div>
  </div>
)}
        {isLoading && <p>Carregando...</p>}
        {isError && <p>Erro na requisição!</p>} 
        <div className="courses-container">
            {data?.map((item, i) => (
            
                    <div key={i} className="div-courses" >
                        <h4>{item.name}</h4>
                        <p>ID: {item.id}</p>
                        <p>Preço: {item.price}</p>
                        <p>{item.active ? 'Ativo' : 'Inativo'}</p>
                        <button onClick={() => deletar({id: item.id})}>{item.active ? "Desativar": "Ativar"}</button>
                        <button onClick={() => setCursoselecionado(item.id)}>Ver matrículas</button>
                    </div>
                
            ))}
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
            
        
        
        
        </>
    )



}