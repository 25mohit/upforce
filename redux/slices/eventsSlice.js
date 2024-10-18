import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ENDPOINT } from "../api";
import { GetResponse, ShowLoader } from "./settingSlice";

export const GetUserEvents = createAsyncThunk("GetUserEvents", async (payload, { dispatch }) => {
  dispatch(ShowLoader(true))
  try {
    const config = {
        headers: {
            authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTIyMTBlNDM3MjlmMWNiMTJkNTVhZCIsImVtYWlsIjoibW9oaXQ3MjRhZ2Fyd2FsQGdtYWlsLmNvbSIsIm5hbWUiOiJNb2hpdCBBZ2Fyd2FsIiwiaWF0IjoxNzI5MjQ5NjYyLCJleHAiOjE3MjkzMzYwNjJ9.fft_-7ADJf4-JJSUashV7Dv6dC7NTCi4D-OzrY1FR1o`, // Include the token in Authorization header
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