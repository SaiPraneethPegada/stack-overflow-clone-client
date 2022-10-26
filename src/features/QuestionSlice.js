import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../App";
const token = localStorage.getItem("token");
let userPosted = localStorage.getItem("displayName");

export const getQuestions = createAsyncThunk(
  "question/getQuestions",
  async () => {
    return axios.get(`${API_URL}/questions/getAll`);
  }
);

export const getById = createAsyncThunk("question/getById", async ({ id }) => {
  return axios.get(`${API_URL}/questions/get/${id}`);
});

export const askQuestion = createAsyncThunk(
  "question/askQuestion",
  async ({ body }) => {
    const { questionTitle, questionBody, questionTags } = body;
    let res = axios.post(
      `${API_URL}/questions/postQuestion`,
      {
        questionTitle,
        questionBody,
        questionTags,
        userPosted,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  }
);

export const editQue = createAsyncThunk(
  "question/editQue",
  async ({ body, id }) => {
    const { questionTitle, questionBody, questionTags } = body;
    return axios.put(
      `${API_URL}/questions/edit/${id}`,
      {
        questionTitle,
        questionBody,
        questionTags,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
);

const QuestionSlice = createSlice({
  name: "question",
  initialState: {
    value: [],
    searchTerm: "",
    loading: false,
    questionsData: [],
    questionData: [],
    postData: [],
    error: null,
  },
  reducers: {
    increment: (state, action) => {
      const itemIndex = state.value.findIndex(
        (item) => item._id === action.payload._id
      );
      // console.log(itemIndex);

      if (itemIndex === -1) {
        const temp = { ...action.payload, count: 1 };
        state.value.push(temp);
      } else {
        state.value[itemIndex].count += 1;
      }
    },
    search: (state, action) => {
      // console.log(action.payload);
      state.searchTerm = action.payload;
    },
  },
  extraReducers: {
    [getQuestions.pending]: (state, action) => {
      state.loading = true;
    },
    [getQuestions.fulfilled]: (state, action) => {
      // console.log(action.payload);
      state.loading = false;
      state.questionsData = [action.payload.data.allQuestions];
    },

    [getById.pending]: (state, action) => {
      state.loading = true;
    },
    [getById.fulfilled]: (state, action) => {
      // console.log(action.payload);
      state.loading = false;
      state.questionData = [action.payload.data.question];
    },

    [askQuestion.pending]: (state, action) => {
      state.loading = true;
    },
    [askQuestion.fulfilled]: (state, action) => {
      // console.log(action.payload);
      state.loading = false;
      state.postData = action.payload.data;
      state.error = action.payload.data.error;
      if (action.payload.data.statusCode === 200) {
        alert(action.payload.data.message);
      } else {
        alert(action.payload.data.message);
      }
    },

    [editQue.pending]: (state, action) => {
      state.loading = true;
    },
    [editQue.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.postData = [action.payload.data];
      if (action.payload.data.statusCode === 200) {
        alert(action.payload.data.message);
      } else {
        alert(action.payload.data.message);
      }
    },
  },
});

export const { increment, search } = QuestionSlice.actions;
export default QuestionSlice.reducer;
