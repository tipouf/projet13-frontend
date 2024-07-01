import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import AuthService from '../services/authService'

export interface IAuth {
    email: string
    password: string
}


export const login = createAsyncThunk(
	'auth/login',
	async (payload: IAuth) => {
		try {
			const data = await AuthService.login(payload)
			return data
		} catch (error: any) {
			throw new Error(error)
		}
	}
)

export const logout = createAsyncThunk(
	'auth/logout',
	async () => {
		try {
			const data = await AuthService.logout()
			return data
		}
		catch (error: any) {
			throw new Error(error)
		}
	}
)


const initialState = {
	token: null,
	isConnected: false
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
	builder
	  .addCase(login.fulfilled, (state, action) => {
		state.token = action.payload
		state.isConnected = true
	  })
	  .addCase(logout.fulfilled, (state) => {
		state.token = null
		state.isConnected = false
	  })
  }
})

const { reducer } = authSlice
export default reducer