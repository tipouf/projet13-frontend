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
    return data
}

export const logout = () => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
}

const initialState = {
    isConnected: false,
    token: null
}

export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isConnected: true,
            }
        case 'LOGOUT':
            return {
                ...state,
                isConnected: false,
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

