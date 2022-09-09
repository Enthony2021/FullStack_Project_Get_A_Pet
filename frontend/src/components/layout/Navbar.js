import { NavLink } from "react-router-dom"
import Logo from '../../assets/img/logo.png'
import styles from './Navbar.module.css'

// Context
import { Context } from '../../context/UseContext'
import { useContext } from "react"

const Navbar = () => {

    const { authenticated, logout } = useContext(Context)

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={Logo} alt="Get A Pet" />
                <h2>Get A Pet</h2>
            </div>

            <ul >
                <li>
                    <NavLink to='/' >Adotar</NavLink>
                </li>

                {authenticated ? (<>
                    <li>
                        <NavLink to='/pet/myadoptions' >Minhas Adoções</NavLink>
                    </li>
                    <li>
                        <NavLink to='/pet/mypets' >Meus Pets</NavLink>
                    </li>
                    <li>
                        <NavLink to='/user/profile'>Perfil</NavLink>
                    </li>
                    <li onClick={logout} >Sair</li>
                </>) : (
                    <>
                        <li>
                            <NavLink to='/login' >Entrar</NavLink>
                        </li>

                        <li>
                            <NavLink to='/register' >Cadastrar</NavLink>
                        </li>
                    </>
                )}


            </ul>
        </nav>
    )
}

export default Navbar