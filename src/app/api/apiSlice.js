import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    // Base URL
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    // Used for cached data
    tagTypes: ['User'],
    endpoints: builder => ({})
})