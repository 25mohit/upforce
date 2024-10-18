import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ENDPOINT } from "../api";
import { GetResponse, ShowLoader } from "./settingSlice";
import { toast } from "react-toastify";

export const GetUserEvents = createAsyncThunk("GetUserEvents", async (payload, { dispatch }) => {
  dispatch(ShowLoader(true))
  try {
    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token in Authorization header
        },
    };
    console.log("config", config);
    
    const response = await axios.get(`${ENDPOINT}api/events/user`, config);

    dispatch(ShowLoader(false))
    dispatch(GetResponse(response.data))
    return response.data
}
catch (error) {
    dispatch(ShowLoader(false))
    dispatch(GetResponse(error.response.data))
    throw error;
  }
})


export const AddNewEvent = createAsyncThunk("GetUserEvents", async (payload, { dispatch }) => {
  dispatch(ShowLoader(true))
  try {
    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token in Authorization header
        },
    };
    console.log("config", config);
    
    const response = await axios.post(`${ENDPOINT}api/events`, payload, config);

    dispatch(ShowLoader(false))
    dispatch(GetResponse(response.data))
    toast.success("Event Successfully Created");

    return response.data
}
catch (error) {
    dispatch(ShowLoader(false))
    dispatch(GetResponse(error.response.data))
    throw error;
  }
})
export const UpdateEvent = createAsyncThunk("GetUserEvents", async (payload, { dispatch }) => {
  dispatch(ShowLoader(true))
  try {
    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token in Authorization header
        },
    };
    console.log("config", config);
    
    const response = await axios.put(`${ENDPOINT}api/events/${payload?._id}`, payload, config);

    dispatch(ShowLoader(false))
    dispatch(GetResponse(response.data))
    toast.success("Event Successfully Updated");

    return response.data
}
catch (error) {
    dispatch(ShowLoader(false))
    dispatch(GetResponse(error.response.data))
    throw error;
  }
})


const EventsSlice = createSlice({
  name: "events",
  initialState: {
    eventsList: []
  }, // Explicitly define the type of initialState
  reducers: {}, // Define your reducers if any
  extraReducers: (builder) => {
    builder.addCase(GetUserEvents.fulfilled, (state, action) => {
        const payload = action.payload
        console.log("payload", payload);
        state.eventsList = payload;
    })
  }
});

export default EventsSlice.reducer;