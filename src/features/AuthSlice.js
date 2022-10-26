import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../App";
let token = localStorage.getItem("token");
let id = localStorage.getItem("userId");

export const profile = createAsyncThunk("auth/profile", async () => {
  try {
    return axios.get(`${API_URL}/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    alert(error.message);
  }
});

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({ displayName, about, tags }) => {
    console.log(displayName, about, tags);
    try {
      return axios.patch(
        `${API_URL}/update/${id}`,
        { displayName, about, tags },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      alert(error.message);
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    userData: [],
  },
  extraReducers: {
    [profile.pending]: (state) => {
      state.loading = true;
    },
    [profile.fulfilled]: (state, action) => {
      console.log(action.payload.data);
      state.loading = false;
      state.userData = action.payload.data.user;
    },
    [profile.rejected]: (state, action) => {
      state.error = action.payload;
    },

    [updateProfile.pending]: (state) => {
      state.loading = true;
    },
    [updateProfile.fulfilled]: (state, action) => {
      console.log(action.payload.data);
      state.loading = false;
      state.userData = action.payload.data.updatedProfile;
    },
    [updateProfile.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default AuthSlice.reducer;
