import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useForm } from "react-hook-form"
import { loginschema, type LoginSchema } from "../schemas/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"


export default function Login(){
const {login, erro} = useContext(AuthContext)
const navigate = useNavigate()
const {register, handleSubmit, reset, formState: {errors}} = useForm<LoginSchema>({
    resolver: zodResolver(loginschema)
})


function onsubmit(data: LoginSchema){
    login(data.email, data.password)
    reset()
}

    return (
        <>
            <form onSubmit={handleSubmit(onsubmit)}>
                <label htmlFor="email">Email</label>
                <input {...register("email")} type="text"  id="email" placeholder="Digite seu email..."/>
                {errors.email && <p>{errors.email.message}</p>}
                <label htmlFor="pass">Senha</label>
                <input {...register("password")} type="text" id="pass" placeholder="Digite sua senha..."/>
                {errors.password && <p>{errors.password.message}</p>}
                <button type="submit" >Submit</button>
                {erro}
            </form>
        
        
        
        </>
    )
}