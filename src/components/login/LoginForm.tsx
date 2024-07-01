
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { login } from '../../redux/slices/authSlice'
import './LoginForm.scss'

type LoginFormData = {
  email: string;
  password: string;
}

const LoginForm = () => {
  let navigate = useNavigate()

  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>()

  const { isConnected } = useSelector((state) => state.auth);

  const dispatch = useDispatch()

  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(login(data)).unwrap().then((dataResponse: { token: string } | undefined) => console.log("datavvdfdf", dataResponse))
      .then(() => isConnected && navigate('/profil'))

      setError(null)

    } catch (error) {
      console.error("error login", error)
      setError('Invalid email or password')
    }
  }



  return (
    <main className="main bg-dark">
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Email"
        {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },)}
        autoComplete="username"
        autoFocus
      />
      <p className="error-message">
        {errors.email && errors.email.type === 'pattern' && <span>Le format de l'email est invalide</span>}
        {errors.email && errors.email.type === 'required' && <span>L'email est obligatoire</span>}
      </p>
      <input
        type="password"
        placeholder="Password"
        {...register('password', { required: true, minLength: 8 })}
        autoComplete="current-password"
      />
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
