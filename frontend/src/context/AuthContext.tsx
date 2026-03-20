import React, { createContext, useState } from "react";
import type { IUser } from "../types/IUser";
import { useMutation } from "@tanstack/react-query";
import type { ILoginresponse } from "../types/ILoginresponse";
import { useNavigate } from "react-router-dom";

// criando a interface do contexto

export interface AuthContext {
    user: IUser | null
    login: ((email: string, password: string) => void)
    logout: (() => void)
    erro: string | null
}

//criando o contexto
export const AuthContext = createContext({} as AuthContext)

// cria funcao autenticar
export default function Auth({ children }: { children: React.ReactNode }) {
    const [logado, setLogado] = useState(false)
    const [user, setUser] = useState<IUser | null>(null)
    const navigate  = useNavigate()
    const [erro, setErro] = useState<string | null>(null)
    // criando a mutacao
    const { mutate } = useMutation<ILoginresponse, Error, { email: string, password: string }>(
        {
            //passando os dados da api pro data
            mutationFn: (data) =>
                fetch("http://localhost:3000/auth/login", {
                    method: "POST",
                    // passando o header pro backend entender o json
                    headers: { 'Content-Type': 'application/json' },
                    // transformando em json
                    body: JSON.stringify(data)
                }).then(r => {
                    if (!r.ok) throw new Error('Unauthorized')
                        return r.json()
                }),
            // quando der certo, retornar os dados e as "variaveis"
            onSuccess: (data, variables) => {
                //setando o email no usuario
                setUser({ email: variables.email })
                setLogado(true)
                // guardando o bearer token
                localStorage.setItem('token', data.access_token)
                navigate("/courses")
                setErro(null)
            },
            // tratando o erro
            onError: () => {
                setErro("Email ou senha incorretos")
            }
        },
    );


    //funcao para logar
    function login(email: string, password: string) {
        // passando os parametros para logar
        mutate({ email, password })
    }

    function logout() {
        setUser(null)
        setLogado(false)
        // removendo o token
        localStorage.removeItem('token')
        navigate('/')
    }
    return (
        <>
            <AuthContext.Provider value={{ user, login, logout, erro }}> {children}
            </AuthContext.Provider>

        </>
    )
}