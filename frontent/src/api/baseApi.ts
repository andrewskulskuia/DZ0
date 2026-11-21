import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { LoginForm, RegistrationForm, User } from '../type/user';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/',
        credentials: "include",
    }),
    tagTypes: ["Me"],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => 'posts',
        }),
        register: builder.mutation<User, RegistrationForm>({
            query: (data) => ({
                url: "/auth/sign-up",
                method: "POST",
                body: data
            })
        }),
        login: builder.mutation<User, LoginForm>({
            query: (data) => ({
                url: "/auth/sign-in",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Me"]
        }),
        getMe: builder.query<User, void>({
            query: () => "/auth/me",
            providesTags: ["Me"]
        }),
    }),
});

export const { useGetPostsQuery, useLoginMutation, useRegisterMutation, useGetMeQuery } = baseApi;