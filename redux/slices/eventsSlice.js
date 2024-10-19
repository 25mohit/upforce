import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ENDPOINT } from "../api";
import { GetResponse, ShowLoader } from "./settingSlice";
import { toast } from "react-toastify";


export const AddNewEvent = createAsyncThunk("AddNewEvent", async (payload, { dispatch }) => {
  dispatch(ShowLoader(true))
  try {
    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token in Authorization header
        },
    };
    
    const response = await axios.post(`${ENDPOINT}api/events`, payload, config);

    dispatch(ShowLoader(false))
    dispatch(GetResponse(response.data))
    dispatch(GetFilteredEvents({sort: 'createdAt'}))
    toast.success("Event Successfully Created");

    return response.data
}
catch (error) {
    dispatch(ShowLoader(false))
    dispatch(GetResponse(error.response.data))
    throw error;
  }
})

export const UpdateEvent = createAsyncThunk("UpdateEvent", async (payload, { dispatch }) => {
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
    dispatch(GetFilteredEvents({sort: 'createdAt'}))
    toast.success("Event Successfully Updated");

    return response.data
}
catch (error) {
    dispatch(ShowLoader(false))
    dispatch(GetResponse(error.response.data))
    toast.warn(error.response?.data?.m);
    throw error;
  }
})

export const DeleteEvent = createAsyncThunk("DeleteEvent", async (payload, { dispatch }) => {
  dispatch(ShowLoader(true))
  try {
    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token in Authorization header
        },
    };
    console.log("config", config);
    
    const response = await axios.delete(`${ENDPOINT}api/events/${payload?._id}`, config);

    dispatch(ShowLoader(false))
    dispatch(GetResponse(response.data))
    dispatch(GetFilteredEvents({sort:'name'}))
    toast.warn("Event Successfully Deleted");

    return response.data
}
catch (error) {
    dispatch(ShowLoader(false))
    dispatch(GetResponse(error.response.data))
    throw error;
  }
})

export const GetFilteredEvents = createAsyncThunk("GetFilteredEvents", async (payload, { dispatch }) => {
  dispatch(ShowLoader(true))
  try {
    const config = {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token in Authorization header
        },
        params: payload
    };
    console.log("config", config);
    
    const response = await axios.get(`${ENDPOINT}api/events/filter`,config);

    console.log("asdadsresponse", response);
    
    dispatch(ShowLoader(false))
    dispatch(GetResponse(response.data))
    // dispatch(GetUserEvents())

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
    builder.addCase(GetFilteredEvents.fulfilled, (state, action) => {
        const payload = action.payload
        console.log("payload", payload);
        state.eventsList = payload;
    })
  }
});

export default EventsSlice.reducer;