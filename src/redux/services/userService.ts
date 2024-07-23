const getUserToken = () => localStorage.getItem('token') || sessionStorage.getItem('token');

const API_URL = "http://localhost:3001/api/v1"

export const getUser = async (tokenResponse: string) => {
	const token = tokenResponse || getUserToken()

	const response = await fetch(`${API_URL}/user/profile`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` }
	})
	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.message)
	}
	return data
}

export const updateUser = async (data: { firstName: string; lastName: string }) => {
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

const UserService = {
	getUser,
	updateUser
}

export default UserService;
