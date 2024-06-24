
export interface AuthLogin {
    email: string
    password: string
}

const API_URL = "http://localhost:3001/api/v1"

export const login = async ({ email, password }: AuthLogin) => {
    console.log("i am here")
    const response = await fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    const data = await response.json()
    console.log("data", data)
    if (!response.ok) {
        throw new Error(data.message)
    }

    localStorage.setItem('token', data.token)
    return data
}

const AuthService = {
    login
}

export default AuthService