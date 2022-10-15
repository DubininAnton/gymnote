import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const informationApi = createApi({
    reducerPath: "informationApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3000"}),
    tagTypes:["POST"],
    endpoints: (builder) => ({
        getInformationApi: builder.query({
            query: ()=> "/physicalManagement", 
            providesTags:["POST"]  
        }),
        postInformations: builder.mutation({
            query: (information) => ({
                url: "/physicalManagement",
                method: 'POST',
                body: information,
            }),
        invalidatesTags:["POST"]
        })
    })
         
})

export const {useGetInformationApiQuery, useGetRussianTextQuery, useGetEnglishTextQuery, usePostInformationsMutation} = informationApi;