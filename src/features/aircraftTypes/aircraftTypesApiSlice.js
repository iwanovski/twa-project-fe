import {createSelector, createEntityAdapter} from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const aircraftTypesAdapter = createEntityAdapter({})

const initialState = aircraftTypesAdapter.getInitialState()

export const aicraftTypesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAircraftTypes: builder.query({
            query: () => '/aircraftTypes',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            // Transform response from mongo query
            transformResponse: responseData => {
                const loadedAircraftTypes = responseData.map(aircraftType => {
                    aircraftType.id = aircraftType._id
                    return aircraftType
                });
                return aircraftTypesAdapter.setAll(initialState, loadedAircraftTypes)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'AircraftType', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'AircraftType', id }))
                    ]
                } else return [{ type: 'AircraftType', id: 'LIST' }]
            }
        }),
    }),
})
// Automatically generated hook
export const {
    useGetAircraftTypesQuery,
} = aicraftTypesApiSlice

// returns the query result object
export const selectAircrafTypesResult = aicraftTypesApiSlice.endpoints.getAircraftTypes.select()

// creates memoized selector
const selectAircraftTypesData = createSelector(
    selectAircrafTypesResult,
    aircraftTypesResult => aircraftTypesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllAircraftTypes,
    selectById: selectAircraftTypeById,
    selectIds: selectAircraftTypeIds
    // Pass in a selector that returns the users slice of state
} = aircraftTypesAdapter.getSelectors(state => selectAircraftTypesData(state) ?? initialState)