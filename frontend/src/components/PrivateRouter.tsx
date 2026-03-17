import type React from "react"
import { Navigate } from "react-router-dom"



export default function PrivateRouter({children}: {children: React.ReactNode}){
    //pegando o token e caso nao achar, redirecionar pro login
    let token = localStorage.getItem('token')
    if (!token){
        return <Navigate to='/login' />
    }
    else {
        return (
        <>{children}</>
        )
    }
}