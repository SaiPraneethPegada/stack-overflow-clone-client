import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = localStorage.getItem("token");
let userPosted = localStorage.getItem("displayName");

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),

  endpoints: (builder) => ({
    getAllQuestions: builder.query({
      query: () => ({
        url: "/questions/getAll",
        method: "GET",
      }),
    }),

    postQuestion: builder.mutation({
      query: (body) => {
        const { questionTitle, questionBody, questionTags } = body;
        return {
          url: "/questions/postQuestion",
          method: "POST",
          body: {
            questionTitle,
            questionBody,
            questionTags,
            userPosted,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    getQuestionById: builder.query({
      query: (id) => {
        console.log(id);
        return {
          url: `/questions/get/${id}`,
          method: "GET",
        };
      },
    }),

    postAnswer: builder.mutation({
      query: (answer) => {
        const { id, answerBody } = answer;
        return {
          url: `/answers/postAnswer/${id}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            answerBody,
          },
        };
      },
    }),

    voteQuestion: builder.mutation({
      query: (voteData) => {
        const { id, vote } = voteData;
        return {
          url: `/answers/postAnswer/${id}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            vote,
          },
        };
      },
    }),
  }),
});

export const {
  useGetAllQuestionsQuery,
  usePostQuestionMutation,
  useGetQuestionByIdQuery,
  usePostAnswerMutation,
  useVoteQuestionMutation,
} = questionApi;
