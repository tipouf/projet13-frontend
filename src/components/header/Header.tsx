import argentBankLogo from '../../assets/argentBankLogo.png';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { logout } from '../../redux/slices/authSlice'
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { getUser } from '../../redux/slices/userSlice'
const Header = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const token = localStorage.getItem('token') || sessionStorage.getItem('token') || null

  useEffect(() => {
    if (token !== null) {
      dispatch(getUser({ token }));
    }
  }, []);

  const { user } = useAppSelector((state: any) => state.user);

  const isConnected = localStorage.getItem('token') || sessionStorage.getItem('token')

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

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

      <div className="main-nav-items">
        {isConnected && <Link className="main-nav-item" to="/profil">
          <FaUserCircle className="main-nav-item-icon" />
          <span>
          {user?.firstName}
          </span>
        </Link>}
        {isConnected ?
        <Link className="main-nav-item" to="/" onClick={handleLogout}>
          <FaSignOutAlt className='main-nav-item-icon' />
          Sign Out
        </Link>
        : 
        <Link className="main-nav-item" to="/login">
          <FaUserCircle className="main-nav-item-icon" />
          Sign In
        </Link>
        }
      </div>
    </nav>
  )
}

export default Header
