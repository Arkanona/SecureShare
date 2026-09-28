import { Link } from "react-router-dom";
import Login from "../components/auth/Login";

function LoginPage() {
    return (
        <>
        <title>Connexion - SecureShare</title>
        <meta name="description" content="Connecter vous à SecureShare un site de publication de visuel." />
        <main>
            <div className="firstDivLogin">
            <Link to="/" className="arrowBack">←</Link>
            <Login/>
            </div>
        </main>
        </>
    )
}

export default LoginPage