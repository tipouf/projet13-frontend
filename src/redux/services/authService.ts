export type AuthLogin = {
    email: string
    password: string
}

const API_URL = "http://localhost:3001/api/v1"

export const login = async ({ email, password }: AuthLogin) => {
    const response = await fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message)
    }
    console.log("login here", data.body.token)

    localStorage.setItem('token', data?.body?.token)
    return data
}

export const logout = () => {
    localStorage.removeItem('token')
}

export const authReducer = (state = { isConnected: false, token: null }, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isConnected: true,
                token: action.payload

            }
        case 'LOGOUT':
            return {
                ...state,
                isConnected: false,
                token: null
            }
        default:
            return state
    }
}

const AuthService = {
    login,
    logout,
    authReducer
}

export default AuthService

