import { Link } from "react-router-dom";
import Register from "../components/auth/Register";
import '../index.css';

function RegisterPage() {
    return (
        <>
        <title>Inscription - SecureShare</title>
        <meta name="description" content="Inscrivez-vous à SecureShare, un site de publication de visuel." />
        <main>
            <div className="relative max-w-[1440px] mx-auto px-[15px]">
            <Link to="/" className="arrowBack">←</Link>
            <Register/>
            </div>
            {/* <div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <h1 className="text-5xl font-bold text-white">
                Tailwind fonctionne !
            </h1>
            </div> */}
        </main>
        </>
    )
}

export default RegisterPage