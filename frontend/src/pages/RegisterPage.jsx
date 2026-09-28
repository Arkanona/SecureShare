import { Link } from "react-router-dom";
import Register from "../components/auth/Register";

function RegisterPage() {
    return (
        <>
        <title>Inscription - SecureShare</title>
        <meta name="description" content="Inscrivez-vous à SecureShare, un site de publication de visuel." />
        <main>
            <div className="firstDivRegister">
            <Link to="/" className="arrowBack">←</Link>
            <Register/>
            </div>
        </main>
        </>
    )
}

export default RegisterPage