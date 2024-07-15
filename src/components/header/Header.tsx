import argentBankLogo from '../../assets/argentBankLogo.png';
import { useEffect, useState } from 'react';
import './Header.scss';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { getUser } from '../../redux/slices/userSlice'
const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
      dispatch(getUser())
    }
  }, [])

  const { user } = useSelector((state: any) => state.user);

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
          <FaUserCircle />
          {user?.firstName}
        </Link>}
        {isConnected ?
        <Link className="main-nav-item" to="/" onClick={handleLogout}>
          <FaSignOutAlt />
          Sign Out
        </Link>
        : 
        <Link className="main-nav-item" to="/login">
          <FaUserCircle />
          Sign In
        </Link>
        }
      </div>
    </nav>
  )
}

export default Header
