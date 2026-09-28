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
            navigate('/connexion')
        } catch(error){
            console.error(error)
        } 
    }
    return (
        <>
        <div className='divRegister'>
            <article className='registerArticle'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Prénom :</label>
                    <input type="text" name='name' id='name' placeholder='Prénom' value={form.name} onChange={handleChange}/>
                    <label htmlFor="email">E-mail :</label>
                    <input type="email" name="email" id="email" placeholder="mail@exemple.com" value={form.email} onChange={handleChange}/>
                    
                    <label htmlFor="password">Mot de passe :</label>
                        <input type="password" name="password" id="password" placeholder="Mot de passe" value={form.password} onChange={handleChange}/>
                    
                    <label htmlFor="confirmPassword">Confirmez mot de passe :</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirmez mot de passe" value={form.confirmPassword} onChange={handleChange}/>
                <button type="submit">S'inscrire</button>
                </form>
                {passwordError && (
                    <p className='errorPass'>{passwordError}</p>
                )}
                {error && <p className='errorPass'>{error}</p>}
            </article>
            <div>
                <p>Vous avez déjà un compte ?</p>
                <Link to="/connexion">Connectez-vous</Link>
            </div>
        </div>
        </>
    )
}
export default Register