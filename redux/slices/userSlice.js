import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ENDPOINT } from "../api";
import { ShowLoader } from "./settingSlice";
import { toast } from "react-toastify";

// export const SignInUser = createAsyncThunk("SignInUser", async (payload, { dispatch }) => {
//   dispatch(ShowLoader(true))
//   try {
//     const response = await axios.post(`${ENDPOINT}api/users/login`, payload);
//     dispatch(ShowLoader(false))
//     return response.data
//   }
//   catch (error) {
//     dispatch(ShowLoader(false))
//     throw error;
//   }
// })

export const RegisterUser = createAsyncThunk("RegisterUser", async (payload, { dispatch }) => {
  dispatch(ShowLoader(true))
  try {
    const response = await axios.post(`${ENDPOINT}api/users/register`, payload);
    dispatch(ShowLoader(false))
    toast.success("MY SUCCESS");
    return response.data
}
catch (error) {
    console.log("mohit error",error);
    dispatch(ShowLoader(false))
    toast.warn("MY SUCCESS");    
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
  }, // Explicitly define the type of initialState
  reducers: {}, // Define your reducers if any
  extraReducers: (builder) => {
    // builder.addCase(SignInUser.fulfilled, (state, action) => {
    //     const payload = action.payload
    //     console.log("payload", payload);
    //     state.data = payload;
    // })
    builder.addCase(RegisterUser.fulfilled, (state, action) => {
        const payload = action.payload
        console.log("payload", payload);
        state.registerData = payload;
    })
  }
});

export default UserSlice.reducer;