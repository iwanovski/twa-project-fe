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
            keepUnusedDataFor: 5,
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
    }),
})
// Automatically generated hook
export const {
    useGetAirportsQuery,
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