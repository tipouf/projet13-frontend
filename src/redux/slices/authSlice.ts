import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import AuthService from '../services/authService'

interface IAuth {
    email: string
    password: string
    rememberMe?: boolean
}

export const login = createAsyncThunk(
	'auth/login',
	async (payload: IAuth) => {
		try {
			const data = await AuthService.login(payload)

			if (payload.rememberMe) {
				localStorage.setItem('token', data?.body?.token)
			} else {
				sessionStorage.setItem('token', data?.body?.token)
			}
			return data
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
)

interface IAuthState {
	token: string | null,
	isConnected: boolean,
	rememberMe: boolean
}

const initialState: IAuthState = {
	token: localStorage.getItem('token') || null,
	isConnected: !!localStorage.getItem('token'),
	rememberMe: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
		logout: (state) => {
			state.token = null
			state.isConnected = false
			localStorage.removeItem('token')
			sessionStorage.removeItem('token')
		}
  },
  extraReducers: (builder) => {
	builder
	  .addCase(login.fulfilled, (state, action) => {
		state.token = action.payload
		state.isConnected = true
	  })
  }
})

const { reducer } = authSlice
export default reducer
