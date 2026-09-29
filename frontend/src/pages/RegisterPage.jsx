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
            <Link to="/" className="
                absolute -top-[90px] left-[10px]
                mt-5
                rounded-2xl
                bg-white/20
                px-[10px] py-[6px]
                text-xl font-black text-black
                shadow-[0_4px_30px_rgba(0,0,0,0.2)]
                backdrop-blur-[10px]
            ">←</Link>
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