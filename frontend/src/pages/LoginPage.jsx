import { Link } from "react-router-dom";
import Login from "../components/auth/Login";
import '../index.css';


function LoginPage() {
    return (
        <>
        <title>Connexion - SecureShare</title>
        <meta name="description" content="Connecter vous à SecureShare un site de publication de visuel." />
        <main>
            <div className="relative max-w-[1440px] mx-auto px-[15px]">
            <Link to="/" className="arrowBack-top-[90px] left-[10px]
                mt-5
                rounded-2xl
                bg-white/20
                px-[10px] py-[6px]
                text-xl font-black text-black
                shadow-[0_4px_30px_rgba(0,0,0,0.2)]
                backdrop-blur-[10px]
            ">←</Link>
            <Login/>
            </div>
        </main>
        </>
    )
}

export default LoginPage