import {Routes, Route, Navigate} from 'react-router-dom'
// import { useAuth } from '../store'
import { Home, Login, Profil } from '../pages';

const AllRoutes = () => {
	// const { isAuthenticated } = useAuth()
	
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/profil" element={<Profil />} />
		</Routes>
	)
}

export default AllRoutes
