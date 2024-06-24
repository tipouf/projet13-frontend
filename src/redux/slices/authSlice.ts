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

const authSlice = createSlice({
  name: 'auth',
  initialState: {
	token: localStorage.getItem('token'),
	isLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
	builder
	  .addCase(login.pending, (state) => {
		state.isLoading = true
	  })
	  .addCase(login.fulfilled, (state, action) => {
		state.isLoading = false
		state.token = action.payload.token
	  })
	  .addCase(login.rejected, (state) => {
		state.isLoading = false
		state.token = null
	  })
  }
})

const { reducer } = authSlice
export default reducer