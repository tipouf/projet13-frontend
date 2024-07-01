import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../services/userService";

const initialState = {
    user: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload
      })
  }
})

export const getUser = createAsyncThunk(
  'user/getUser',
  async () => {
    const response = await UserService.getUser()
    return response
  }
)

const { reducer } = userSlice
export default reducer