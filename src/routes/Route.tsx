import {Routes, Route} from 'react-router-dom'
import { Home, Login, Profil } from '../pages';

const AllRoutes = () => {
	
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/profil" element={<Profil />} />
			<Route path="*" element={<Home />} />
		</Routes>
	)
}

export default AllRoutes
