import { Link } from "react-router-dom";
import "../styles/navbar.css"
import { RxExit } from "react-icons/rx";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
const { logout } = useContext(AuthContext)
    const token = localStorage.getItem('token')
    const user = token ? jwtDecode<{ email: string }>(token) : null


    // caso a pagina nao tiver token do usuario, nao mostra a navbar
    if (!token) {
        return null
    }

    return (
        <>


            <header>
                <h3 className="title-courses">Gerenciamento de matrícula</h3>
                <div className="div-link-header">
                    
                        <Link className="curemat" to={'/courses'}>Cursos</Link>
                        <Link className="curemat" to={'/enrollments'}>Matriculas</Link>
                    
                </div>
                <div className="div-logParag">
                    <div className="div-logout"><button className="logout" onClick={logout}>Logout</button><RxExit size={10} color={"#0D47A1"} /></div>
                </div>
                <hr />
            </header>
        </>
    )
}