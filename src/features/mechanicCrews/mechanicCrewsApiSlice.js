import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const mechanicCrewsAdapter = createEntityAdapter({})

const initialState = mechanicCrewsAdapter.getInitialState()

export const mechanicCrewsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMechanicCrews: builder.query({
            query: () => '/mechanicCrews',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // Transform response from mongo query
            transformResponse: responseData => {
                const loadedMechanicCrews = responseData.map(mechanicCrew => {
                    mechanicCrew.id = mechanicCrew._id
                    return mechanicCrew
                });
                return mechanicCrewsAdapter.setAll(initialState, loadedMechanicCrews)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'MechanicCrew', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'MechanicCrew', id }))
                    ]
                } else return [{ type: 'MechanicCrew', id: 'LIST' }]
            }
        }),
        addNewMechanicCrew: builder.mutation({
            query: initialMechanicCrewData => ({
                url: '/mechanicCrews',
                method: 'POST',
                body: {
                    ...initialMechanicCrewData,
                }
            }),
            invalidatesTags: [
                { type: 'MechanicCrew', id: "LIST" }
            ]
        }),
        updateMechanicCrew: builder.mutation({
            query: initialMechanicCrewData => ({
                url: '/mechanicCrews',
                method: 'PATCH',
                body: {
                    ...initialMechanicCrewData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'MechanicCrew', id: arg.id }
            ]
        }),
        deleteMechanicCrew: builder.mutation({
            query: ({ id }) => ({
                url: `/mechanicCrews`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'MechanicCrew', id: arg.id }
            ]
        }),
    }),
})
// Automatically generated hook
export const {
    useGetMechanicCrewsQuery,
    useAddNewMechanicCrewMutation,
    useUpdateMechanicCrewMutation,
    useDeleteMechanicCrewMutation,
} = mechanicCrewsApiSlice

// returns the query result object
export const selectMechanicCrewsResult = mechanicCrewsApiSlice.endpoints.getMechanicCrews.select()

// creates memoized selector
const selectMechanicCrewsData = createSelector(
    selectMechanicCrewsResult,
    mechanicCrewsResult => mechanicCrewsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllMechanicCrews,
    selectById: selectMechanicCrewById,
    selectIds: selectMechanicCrewIds
    // Pass in a selector that returns the users slice of state
} = mechanicCrewsAdapter.getSelectors(state => selectMechanicCrewsData(state) ?? initialState)