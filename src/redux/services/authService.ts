export type AuthLogin = {
	email: string
	password: string
}

const API_URL = "http://localhost:3001/api/v1"

const login = async ({ email, password }: AuthLogin) => {
	const response = await fetch(`${API_URL}/user/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password })
	})
	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.message)
	}
return data
}

const AuthService = {
	login
}

export default AuthService

