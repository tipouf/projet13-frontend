import {Routes, Route} from 'react-router-dom'
import { Home, Login, Profil } from '../pages';
import { useSelector } from 'react-redux';

 const AllRoutes = () => {

	const isConnected = useSelector((state: { auth: { isConnected: boolean } }) => state.auth.isConnected) || localStorage.getItem('token') || sessionStorage.getItem('token')
	
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/profil" element={isConnected ? <Profil /> : <Login />} />
			<Route path="*" element={<Home />} />
		</Routes>
	)
}

export default AllRoutes