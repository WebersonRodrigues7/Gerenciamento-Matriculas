import { Link } from "react-router-dom";
import "../styles/navbar.css"

export default function Navbar() {


    return (
        <>
        
            
            <header>
                    <h1>Gerenciamento matrícula</h1>
                    <div>
                        <Link className="curemat" to={'/courses'}>Cursos</Link>
                        <Link className="curemat" to={'/enrollments'}>Matriculas</Link>
                    </div>
            </header>
        </>
    )
}