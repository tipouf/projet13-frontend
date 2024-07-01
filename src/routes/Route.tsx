import {Routes, Route} from 'react-router-dom'
import { Home, Login, Profil } from '../pages';
import { useSelector } from 'react-redux';


 const AllRoutes = () => {
	
	const isConnected = useSelector((state: any) => state.auth.isConnected)

	console.log("isConnected", isConnected)

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