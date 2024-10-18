import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const ShowLoader = createAsyncThunk("ShowLoader", async (isLoading) => {    
    return isLoading;
  }
)
const initialState = {
  customLoading: false,
  customNotification: {}
};

const SettingSlice = createSlice({
  name: "settings",
  initialState, // Explicitly define the type of initialState
  reducers: {}, // Define your reducers if any
  extraReducers: (builder) => {
      builder.addCase(ShowLoader.fulfilled, (state, action) => {
        // Dispatch setCustomLoading(false) when ShowLoader is fulfilled        
        state.customLoading = action.payload;
      })
  },
});

export default SettingSlice.reducer;
