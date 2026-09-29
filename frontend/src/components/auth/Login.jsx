import { Link } from 'react-router-dom';
// import '../../styles/auth/login.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

function Login () {

    const login = useAuthStore((state) => state.login)
    const loading = useAuthStore((state) => state.loading)
    const error = useAuthStore((state) => state.error)
    

    const [ form, setForm ] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        })
    }
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (form.password)

        try{
            await login(form)

            navigate('/')
        } catch(error){
            console.error(error)
        }
    }
        
    return (
        <>
        <div className='items-center'>
            <article className='mx-auto mt-20
                max-w-[500px]
                rounded-lg
                bg-white
                px-[25px] pt-[35px] pb-[45px]
                text-center
                shadow-[0_2px_20px_rgba(0,0,0,0.2)]'>
                <form className='grid grid-cols-1 gap-[15px]' onSubmit={handleSubmit}>
                    <label className="text-left" htmlFor="email">E-mail :</label>
                    <input className="
                    rounded-[5px]
                    border-0
                    px-[10px] py-[9px]
                    shadow-[0_2px_10px_rgba(0,0,0,0.2)]
                    " type="email" name="email" id="email" placeholder="mail@exemple.com" value={form.email} onChange={handleChange}/>
                    
                    <label className="text-left" htmlFor="password">Mot de passe :</label>
                        <input className="
                    rounded-[5px]
                    border-0
                    px-[10px] py-[9px]
                    shadow-[0_2px_10px_rgba(0,0,0,0.2)]
                    " type="password" name="password" id="password" placeholder="Mot de passe" value={form.password} onChange={handleChange}/>
                    
                <button className='mt-[35px] mb-5
                w-full
                cursor-pointer
                rounded-[5px]
                border-0
                bg-[#E63946]
                p-[9px]
                text-[15px]
                font-semibold
                text-white' disabled={loading} type="submit">{loading ? 'Connexion...' : 'Se connecter'}</button>
                 {error && <p className='errorPass'>{error}</p>}
                </form>
                <a href="#" className='forgotPassLink'>Mot de passe oublié ?</a>
            </article>
            <div>
                <p>Pas de compte ?</p>
                <Link to="/inscription">Inscrivez-vous !</Link>
            </div>
        </div>
        </>
    )
}
export default Login