import { FaGithubSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../styles/footerstyle.css"
export default function Footer(){



    return (
        <>
            <footer>
                
                
                <p className="copy">Copyright 2026 &copy;</p>
                <p className="developer">Desenvolvido por </p>
                <div className="icons-footer">
                    <FaInstagram/>
                    <FaLinkedin />
                    <FaGithubSquare />
                </div>
            </footer>
        
        
        </>
    )
}