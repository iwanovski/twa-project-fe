import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const aircraftCrewsAdapter = createEntityAdapter({})

const initialState = aircraftCrewsAdapter.getInitialState()

export const aicraftCrewsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAircraftCrews: builder.query({
            query: () => '/aircraftCrews',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            // Transform response from mongo query
            transformResponse: responseData => {
                const loadedAircraftCrews = responseData.map(aircraftCrew => {
                    aircraftCrew.id = aircraftCrew._id
                    return aircraftCrew
                });
                return aircraftCrewsAdapter.setAll(initialState, loadedAircraftCrews)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'AircraftCrew', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'AircraftCrew', id }))
                    ]
                } else return [{ type: 'AircraftCrew', id: 'LIST' }]
            }
        }),
    }),
})
// Automatically generated hook
export const {
    useGetAircraftCrewsQuery,
} = aicraftCrewsApiSlice

// returns the query result object
export const selectAircrafCrewsResult = aicraftCrewsApiSlice.endpoints.getAircraftCrews.select()

// creates memoized selector
const selectAircraftCrewsData = createSelector(
    selectAircrafCrewsResult,
    aircraftCrewsResult => aircraftCrewsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllAircraftCrews,
    selectById: selectAircraftCrewById,
    selectIds: selectAircraftCrewIds
    // Pass in a selector that returns the users slice of state
} = aircraftCrewsAdapter.getSelectors(state => selectAircraftCrewsData(state) ?? initialState)