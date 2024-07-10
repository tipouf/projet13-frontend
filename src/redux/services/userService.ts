const getUserToken = () => {
	const token = localStorage.getItem('token')
	console.log("tokenAAAAAA", token)
	if (!token) {
		return null
	}
return token
}

const API_URL = "http://localhost:3001/api/v1"

export const getUser = async () => {
	const token = getUserToken()

	console.log("getUser", token)

	const response = await fetch(`${API_URL}/user/profile`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` }
	})
	const data = await response.json()

	console.log("dataGetUser", data)
	if (!response.ok) {
		throw new Error(data.message)
	}
	return data
}

export const updateUser = async (data: any) => {
	console.log("dataUpdateUser", data)
	const token = getUserToken()
	const response = await fetch(`${API_URL}/user/profile`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(data)
	})
	const dataResponse = await response.json()
	if (!response.ok) {
		throw new Error(dataResponse.message)
	}
	return dataResponse
}

export const userReducer = (state = { firstName: '', lastName: '' }, action: any) => {
	switch (action.type) {
		case 'GET_USER':
			return { ...state, ...action.payload }
		case 'UPDATE_USER':
			return { ...state, ...action.payload }
		default:
			return state
	}
}

const UserService = {
	getUser,
	updateUser,
	userReducer
}

export default UserService