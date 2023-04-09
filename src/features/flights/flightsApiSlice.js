import {createSelector, createEntityAdapter} from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const flightsAdapter = createEntityAdapter({})

const initialState = flightsAdapter.getInitialState()

export const flightsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFlights: builder.query({
            query: () => '/flights',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            // Transform response from mongo query
            transformResponse: responseData => {
                const loadedFlights = responseData.map(flight => {
                    flight.id = flight._id
                    return flight
                });
                return flightsAdapter.setAll(initialState, loadedFlights)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Flight', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Flight', id }))
                    ]
                } else return [{ type: 'Flight', id: 'LIST' }]
            }
        }),
    }),
})
// Automatically generated hook
export const {
    useGetFlightsQuery,
} = flightsApiSlice

// returns the query result object
export const selectFlightsResult = flightsApiSlice.endpoints.getFlights.select()

// creates memoized selector
const selectFlightsData = createSelector(
    selectFlightsResult,
    flightsResult => flightsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllFlights,
    selectById: selectFlightById,
    selectIds: selectFlightIds
    // Pass in a selector that returns the users slice of state
} = flightsAdapter.getSelectors(state => selectFlightsData(state) ?? initialState)