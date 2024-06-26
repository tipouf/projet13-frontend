import argentBankLogo from '../../assets/argentBankLogo.png';
import './Header.scss';
import { Link } from 'react-router-dom'

const Header = () => {
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
      <Link className="main-nav-item" to="/login">
        <a className="main-nav-item" href="./sign-in.html">
          <i className="fa fa-user-circle"></i>
          Sign In
        </a>
      </Link>
      </div>
    </nav>
  )
}

export default Header