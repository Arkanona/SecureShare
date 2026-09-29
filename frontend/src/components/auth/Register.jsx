import { Link, useNavigate } from 'react-router-dom';
// import '../../styles/auth/register.scss';
import { useState } from 'react';
import useAuthStore from '../../store/authStore';

function Register () {

    const register = useAuthStore((state) => state.register)
    const error = useAuthStore((state) => state.error)

    const [passwordError, setPasswordError] = useState('')

    const navigate = useNavigate()

    const  [form, setForm]  = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    })


    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        setPasswordError('')

        if (form.password !== form.confirmPassword){
            setPasswordError('Les mots de passe ne correspondent pas !')
            return
        }

        try{
            await register({
                name: form.name,
                email: form.email,
                password: form.password
            })
            navigate('/login')
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
                <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-[15px]'>
                    <label className="text-left" htmlFor="name">Prénom :</label>
                    <input className="
                    rounded-[5px]
                    border-0
                    px-[10px] py-[9px]
                    shadow-[0_2px_10px_rgba(0,0,0,0.2)]
                    " type="text" name='name' id='name' placeholder='Prénom' value={form.name} onChange={handleChange}/>
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
                    
                    <label className="text-left" htmlFor="confirmPassword">Confirmez mot de passe :</label>
                        <input className="
                    rounded-[5px]
                    border-0
                    px-[10px] py-[9px]
                    shadow-[0_2px_10px_rgba(0,0,0,0.2)]
                " type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirmez mot de passe" value={form.confirmPassword} onChange={handleChange}/>
                <button type="submit" className='mt-[35px] mb-5
    w-full
    cursor-pointer
    rounded-[5px]
    border-0
    bg-[#E63946]
    p-[9px]
    text-[15px]
    font-semibold
    text-white'>S'inscrire</button>
                </form>
                {passwordError && (
                    <p className='errorPass'>{passwordError}</p>
                )}
                {error && <p className='errorPass'>{error}</p>}
            </article>
            <div>
                <p>Vous avez déjà un compte ?</p>
                <Link to="/login">Connectez-vous</Link>
            </div>
        </div>
        </>
    )
}
export default Register