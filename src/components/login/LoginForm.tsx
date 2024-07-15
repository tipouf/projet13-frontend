import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { login } from '../../redux/slices/authSlice'
import { getUser } from '../../redux/slices/userSlice'
import { FaUserCircle } from "react-icons/fa";
import './LoginForm.scss'

type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm = () => {
  let navigate = useNavigate()

  const [error, setError] = useState<string | null>(null)


  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>()

  const { isConnected } = useSelector((state:any) => state.auth);

  const dispatch = useDispatch()

  useEffect(() => {
    if (isConnected) {
      navigate('/profil')
    }
  }, [isConnected])

  
  const onSubmit = async (data: LoginFormData) => {
    try {
      const dataResponse = await dispatch(login(data)).unwrap()
      const token = dataResponse.body.token
      dispatch(getUser(token))
      navigate('/profil');
      setError(null);
    } catch (error) {
      console.error("error login", error);
      setError('Invalid email or password');
    }
  }

  return (
    <main className="main bg-dark">
    <section className="sign-in-content">
      <FaUserCircle />
      <h1>Sign In</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-wrapper">
        <label htmlFor="email">Username</label>
      <input
        type="email"
        {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },)}
        autoComplete="username"
        autoFocus
      />
      </div>
      <p className="error-message">
        {errors.email && errors.email.type === 'pattern' && <span>Le format de l'email est invalide</span>}
        {errors.email && errors.email.type === 'required' && <span>L'email est obligatoire</span>}
      </p>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
      <input
        type="password"
        {...register('password', { required: true, minLength: 8 })}
        autoComplete="current-password"
      />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me"
          {...register('rememberMe')}
        />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <p className="error-message">
      {errors.password && errors.password.type === 'required' && <span>Le mot de passe est obligatoire</span>}
      {errors.password && errors.password.type === 'minLength' && <span>Le mot de passe doit contenir au moins 8 caractères</span>}
      </p>
    
      <button className="sign-in-button" type="submit">Sign In</button>
      {error && <p className="error-message">{error}</p>}
    </form>

    </section>
    </main>
  )
}

export default LoginForm

