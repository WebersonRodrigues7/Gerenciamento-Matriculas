import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useForm } from "react-hook-form"
import { loginschema, type LoginSchema } from "../schemas/loginSchema"
import { zodResolver } from "@hookform/resolvers/zod"

import  "../styles/formLogin.css"
import { CircleUserRound } from 'lucide-react';




export default function Login(){
const {login} = useContext(AuthContext)
const {register, handleSubmit, reset, formState: {errors}} = useForm<LoginSchema>({
    resolver: zodResolver(loginschema)
})


function onsubmit(data: LoginSchema){
    login(data.email, data.password)
    reset()
}

    return (
        <>
        

        
            <div className="container">
                <form onSubmit={handleSubmit(onsubmit)}>
                    < CircleUserRound size={100} color="white" strokeWidth={1.3}/>
                    <h3>Login</h3>
                        <div>             
                            <input {...register("email")} type="text"  id="email" placeholder="Digite seu email..."/>
                            {errors.email && <p>{errors.email.message}</p>}
                        </div>
                        <div className="div-pass">                   
                            <input {...register("password")} type="password" id="pass" placeholder="Digite sua senha..."/>
                            {errors.password && <p className="error-pass">{errors.password.message}</p>}
                        </div>
                        <button type="submit" >Submit</button>
                        
                </form>
            </div>
        
        
        
        </>
    )
}