import {createSelector, createEntityAdapter} from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const airportsAdapter = createEntityAdapter({})

const initialState = airportsAdapter.getInitialState()

export const airportsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAirports: builder.query({
            query: () => '/airports',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // Transform response from mongo query
            transformResponse: responseData => {
                const loadedAirports = responseData.map(airport => {
                    airport.id = airport._id
                    return airport
                });
                return airportsAdapter.setAll(initialState, loadedAirports)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Airport', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Airport', id }))
                    ]
                } else return [{ type: 'Airport', id: 'LIST' }]
            }
        }),
        addNewAirport: builder.mutation({
            query: initialAirportData => ({
                url: '/airports',
                method: 'POST',
                body: {
                    ...initialAirportData,
                }
            }),
            invalidatesTags: [
                { type: 'Airport', id: "LIST" }
            ]
        }),
        updateAirport: builder.mutation({
            query: initialAirporttData => ({
                url: '/airports',
                method: 'PATCH',
                body: {
                    ...initialAirporttData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Airport', id: arg.id }
            ]
        }),
        deleteAirport: builder.mutation({
            query: ({ id }) => ({
                url: `/airports`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Airport', id: arg.id }
            ]
        }),
    }),
})
// Automatically generated hook
export const {
    useGetAirportsQuery,
    useAddNewAirportMutation,
    useUpdateAirportMutation,
    useDeleteAirportMutation,
} = airportsApiSlice

// returns the query result object
export const selectAirportsResult = airportsApiSlice.endpoints.getAirports.select()

// creates memoized selector
const selectAirportsData = createSelector(
    selectAirportsResult,
    airportsResult => airportsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllAirports,
    selectById: selectAirportById,
    selectIds: selectAirportIds
    // Pass in a selector that returns the users slice of state
} = airportsAdapter.getSelectors(state => selectAirportsData(state) ?? initialState)