const getUserToken = () => {
	const token = localStorage.getItem('token')
	if (!token) {
		return null
	}
return token
}

const API_URL = "http://localhost:3001/api/v1"

export const getUser = async () => {
	const token = getUserToken()

	const response = await fetch(`${API_URL}/user`, {
		headers: { Authorization: `Bearer ${token}` }
	})
	const data = await response.json()
	if (!response.ok) {
		throw new Error(data.message)
	}
	return data
}

export const updateUser = async (data: any) => {
	const token = getUserToken()
	const response = await fetch(`${API_URL}/user`, {
		method: 'PATCH',
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

export const userReducer = (state = {}, action: any) => {
	switch (action.type) {
		case 'GET_USER':
			return action.payload
		case 'UPDATE_USER':
			return action.payload
		default:
			return state
	}
}

const UserService = {
	getUser,
	updateUser
}

export default UserService