import { FaGithubSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../styles/footerstyle.css"
export default function Footer(){



    return (
        <>
            <footer>

                <p className="title-footer">Gerenciamento de  Matrícula</p>
                <ul className="developer">
                    <li>Privacidade</li>
                    <li>Termos</li>
                    <li>Suporte</li>               
                </ul>
                <div className="copy">
                    <p>&copy; 2026 Gerenciamento de Matrícula. Todos os direitos reservados.</p>
                </div>
            </footer>
        
        
        </>
    )
}