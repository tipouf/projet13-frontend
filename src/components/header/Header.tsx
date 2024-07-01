import argentBankLogo from '../../assets/argentBankLogo.png';
import './Header.scss';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'

const Header = () => {
  const dispatch = useDispatch()
  const { isConnected, token } = useSelector((state) => state.auth);

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo }
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        {isConnected && <Link className="main-nav-item" to="/profil">
          <i className="fa fa-user-circle"></i>
          Profil
        </Link>}
        {isConnected && token ?
        <Link className="main-nav-item" to="/logout" onClick={() => dispatch(logout())}>
          <i className="fa fa-user-circle"></i>
          Sign Out
        </Link>
        : 
        <Link className="main-nav-item" to="/login">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
        }
      </div>
    </nav>
  )
}

export default Header