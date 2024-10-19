import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ENDPOINT } from "../api";
import { GetResponse, ShowLoader } from "./settingSlice";
import { toast } from "react-toastify";

export const SignInUser = createAsyncThunk("SignInUser", async (payload, { dispatch }) => {
  dispatch(ShowLoader(true))
  try {
    const response = await axios.post(`${ENDPOINT}api/users/login`, payload);
    localStorage.setItem('token', response.data.token)
    dispatch(ShowLoader(false))
    dispatch(GetResponse(response.data))
    toast.success("Logged In Successfully");
    return response.data
}
catch (error) {
    dispatch(ShowLoader(false))
    dispatch(GetResponse(error.response.data))
    toast.warn(error.response.data.message);
    throw error;
  }
})

export const RegisterUser = createAsyncThunk("RegisterUser", async (payload, { dispatch }) => {
  dispatch(ShowLoader(true))
  try {
    const response = await axios.post(`${ENDPOINT}api/users/register`, payload);
    dispatch(ShowLoader(false))
    dispatch(GetResponse(response.data))
    toast.success("Registered Successfully");
    return response.data
}
catch (error) {
    dispatch(ShowLoader(false))
    dispatch(GetResponse(error.response.data))
    toast.warn(error.response.data.message);
    throw error;
  }
})

const UserSlice = createSlice({
  name: "user",
  initialState: {
    data: {}, 
    otpData: {} ,
    checkEmailData:{},
    registerData:{}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(RegisterUser.fulfilled, (state, action) => {
        const payload = action.payload
        state.registerData = payload;
    })
  }
});

export default UserSlice.reducer;