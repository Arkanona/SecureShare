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
        <div className='divLogin'>
            <article className='loginArticle'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">E-mail :</label>
                    <input type="email" name="email" id="email" placeholder="mail@exemple.com" value={form.email} onChange={handleChange}/>
                    
                    <label htmlFor="password">Mot de passe :</label>
                        <input type="password" name="password" id="password" placeholder="Mot de passe" value={form.password} onChange={handleChange}/>
                    
                <button disabled={loading} type="submit">{loading ? 'Connexion...' : 'Se connecter'}</button>
                 {error && <p className='errorPass'>{error}</p>}
                </form>
                <a href="#" className='forgotPassLink'>Mot de passe oublié ?</a>
                <div>
                    <span></span>
                    <p>Ou se connecter avec</p>
                    <span></span>
                </div>
                <Link to="#" className='googleLink'>GOOGLE</Link>
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