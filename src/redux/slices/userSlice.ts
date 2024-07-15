import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../services/userService";

export const getUser = createAsyncThunk(
  'user/getUser',
  async ({ token }: { token: string }) => {
    try {
      const response = await UserService.getUser(token)
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
    async (data: any) => {
      const response = await UserService.updateUser(data)
    return response
  }
)

const initialState = {
  user: { firstName: '', lastName: '' }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = {firstName: action.payload.body.firstName, lastName: action.payload.body.lastName}
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = {firstName: action.payload.body.firstName, lastName: action.payload.body.lastName}
      })
  }
})

const { reducer } = userSlice
export default reducer