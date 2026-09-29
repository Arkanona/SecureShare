import { Link, useNavigate } from 'react-router-dom';
// import './index.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faRightFromBracket  } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import useAuthStore from '../store/authStore';


function Navbar () {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev)
    }
    const navigate = useNavigate()
    const { user, logout } = useAuthStore()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }
    return (
        <>
        <header>
        <div className="divHeader">
            <Link to='/'>SECURESHARE</Link>   
            <nav className='navbar'>
                <ul>
                    <li><Link to='/'>Accueil</Link></li>
                </ul>
            </nav>
            <div>
                {user ? (
                    // Ce qui s'affiche si l'utilisateur est connecté
                    <>
                    <Link className='linkLogout' onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} /></Link>
                    </>
                ) : (
                    // Ce qui s'affiche si l'utilisateur n'est pas connecté
                    <>
                    <Link to='/login'>Connexion</Link>
                    <Link to='/register'>Inscription</Link> 
                    </>
                )}
            </div>
            <nav className='navbarBurger'>
                <div className='divBurger' onClick={toggleMenu}>
                    <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
                </div>
                <ul className={`navbarList ${isMenuOpen ? 'show' : ''}`}>
                    <li className='navbarItem'>
                        <NavLink end to="/" onClick={toggleMenu}>
                            Accueil
                        </NavLink>
                    </li>
                    {user ? (
                        <>
                        <li className='navbarItem'>
                            <Link onClick={handleLogout}>Déconnexion</Link>
                        </li>
                        </>
                    ) : (
                        <>
                        <li className='navbarItem'>
                            <NavLink end to="/login" onClick={toggleMenu}>
                                Connexion
                            </NavLink>
                        </li>
                        <li className='navbarItem'>
                            <NavLink end to="/register" onClick={toggleMenu}>
                                Inscription
                            </NavLink>
                        </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
        </header>
        </>
    )
};

export default Navbar