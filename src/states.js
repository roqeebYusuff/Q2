import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  records: [],
  error: "",
};

export const fetchCovid = createAsyncThunk("states/fetchCovid", () => {
  return axios
    .get("https://covidnigeria.herokuapp.com/api")
    .then(({ data }) => data.data);
});

const slice = createSlice({
  name: "state",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCovid.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCovid.fulfilled, (state, action) => {
      state.loading = false;
      state.records = action.payload;
      state.error = "";
    });
    builder.addCase(fetchCovid.rejected, (state, action) => {
      state.loading = false;
      state.records = [];
      state.error = action.error.message;
    });
  },
});

export default slice.reducer;
