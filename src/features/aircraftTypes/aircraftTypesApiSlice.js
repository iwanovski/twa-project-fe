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
        addNewAircraftType: builder.mutation({
            query: initialAircraftTypeData => ({
                url: '/aircraftTypes',
                method: 'POST',
                body: {
                    ...initialAircraftTypeData,
                }
            }),
            invalidatesTags: [
                { type: 'AircraftType', id: "LIST" }
            ]
        }),
        updateAircraftType: builder.mutation({
            query: initialAircraftTypeData => ({
                url: '/aircraftTypes',
                method: 'PATCH',
                body: {
                    ...initialAircraftTypeData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'AircraftType', id: arg.id }
            ]
        }),
        deleteAircraftType: builder.mutation({
            query: ({ id }) => ({
                url: `/aircraftTypes`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'AircraftType', id: arg.id }
            ]
        }),
    }),
})
// Automatically generated hook
export const {
    useGetAircraftTypesQuery,
    useAddNewAircraftTypeMutation,
    useUpdateAircraftTypeMutation,
    useDeleteAircraftTypeMutation,
} = aicraftTypesApiSlice

// returns the query result object
export const selectAircraftTypesResult = aicraftTypesApiSlice.endpoints.getAircraftTypes.select()

// creates memoized selector
const selectAircraftTypesData = createSelector(
    selectAircraftTypesResult,
    aircraftTypesResult => aircraftTypesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllAircraftTypes,
    selectById: selectAircraftTypeById,
    selectIds: selectAircraftTypeIds
    // Pass in a selector that returns the users slice of state
} = aircraftTypesAdapter.getSelectors(state => selectAircraftTypesData(state) ?? initialState)