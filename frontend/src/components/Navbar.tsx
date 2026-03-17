import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export default function Navbar() {
const {logout} = useContext(AuthContext)
const token = localStorage.getItem('token')


// caso a pagina nao tiver token do usuario, nao mostra a navbar
if(!token) {
    return null
}

    return (
        
            <header>
                <Link to={'/courses'}>Cursos</Link>
                <Link to={'/enrollments'}>Matriculas</Link>
                <button onClick={logout}>Logout</button>
            </header>

    )
}