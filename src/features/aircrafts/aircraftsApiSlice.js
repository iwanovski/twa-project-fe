import {createSelector, createEntityAdapter} from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const aircraftsAdapter = createEntityAdapter({})

const initialState = aircraftsAdapter.getInitialState()

export const aicraftsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAircrafts: builder.query({
            query: () => '/aircrafts',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            // Transform response from mongo query
            transformResponse: responseData => {
                const loadedAircrafts = responseData.map(aircraft => {
                    aircraft.id = aircraft._id
                    return aircraft
                });
                return aircraftsAdapter.setAll(initialState, loadedAircrafts)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Aircraft', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Aircraft', id }))
                    ]
                } else return [{ type: 'Aircraft', id: 'LIST' }]
            }
        }),
    }),
})
// Automatically generated hook
export const {
    useGetAircraftsQuery,
} = aicraftsApiSlice

// returns the query result object
export const selectAircrafsResult = aicraftsApiSlice.endpoints.getAircrafts.select()

// creates memoized selector
const selectAircraftsData = createSelector(
    selectAircrafsResult,
    aircraftsResult => aircraftsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllAircrafts,
    selectById: selectAircraftById,
    selectIds: selectAircraftIds
    // Pass in a selector that returns the users slice of state
} = aircraftsAdapter.getSelectors(state => selectAircraftsData(state) ?? initialState)