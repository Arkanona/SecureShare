import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faRightFromBracket  } from '@fortawesome/free-solid-svg-icons';
import useAuthStore from '../store/authStore';


function Navbar () {
   
    const navigate = useNavigate()
    const { user, logout } = useAuthStore()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }
    return (
        <>
        <header className="bg-black">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center px-[15px]">
            <Link className='text-white' to='/'>SECURESHARE</Link>   
            <nav className='flex'>
                <ul className="flex gap-[10px]">
                    <li><Link className='text-white' to='/'>Accueil</Link></li>
                </ul>
            </nav>
            <div className="flex gap-[10px] items-center">
                {user ? (
                    // Ce qui s'affiche si l'utilisateur est connecté
                    <>
                    <button className='linkLogout text-white' onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} /></button>
                    </>
                ) : (
                    // Ce qui s'affiche si l'utilisateur n'est pas connecté
                    <>
                    <Link className='text-white' to='/login'>Connexion</Link>
                    <Link className='text-white' to='/register'>Inscription</Link> 
                    </>
                )}
            </div>
        </div>
        </header>
        </>
    )
};

export default Navbar