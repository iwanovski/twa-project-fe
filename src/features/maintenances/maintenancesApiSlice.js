import {createSelector, createEntityAdapter} from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const maintenancesAdapter = createEntityAdapter({})

const initialState = maintenancesAdapter.getInitialState()

export const maintenancesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMaintenances: builder.query({
            query: () => '/maintenances',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // Transform response from mongo query
            transformResponse: responseData => {
                const loadedMaintenances = responseData.map(maintenance => {
                    maintenance.id = maintenance._id
                    return maintenance
                });
                return maintenancesAdapter.setAll(initialState, loadedMaintenances)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Maintenance', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Maintenance', id }))
                    ]
                } else return [{ type: 'Maintenance', id: 'LIST' }]
            }
        }),
        addNewMaintenance: builder.mutation({
            query: initialMaintenanceData => ({
                url: '/maintenances',
                method: 'POST',
                body: {
                    ...initialMaintenanceData,
                }
            }),
            invalidatesTags: [
                { type: 'Maintenance', id: "LIST" }
            ]
        }),
        updateMaintenance: builder.mutation({
            query: initialMaintenanceData => ({
                url: '/maintenances',
                method: 'PATCH',
                body: {
                    ...initialMaintenanceData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Maintenance', id: arg.id }
            ]
        }),
        deleteMaintenance: builder.mutation({
            query: ({ id }) => ({
                url: `/maintenances`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Maintenance', id: arg.id }
            ]
        }),
    }),
})
// Automatically generated hook
export const {
    useGetMaintenancesQuery,
    useAddNewMaintenanceMutation,
    useUpdateMaintenanceMutation,
    useDeleteMaintenanceMutation,
} = maintenancesApiSlice

// returns the query result object
export const selectMaintenancesResult = maintenancesApiSlice.endpoints.getMaintenances.select()

// creates memoized selector
const selectMaintenancesData = createSelector(
    selectMaintenancesResult,
    maintenancesResult => maintenancesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllMaintenances,
    selectById: selectMaintenanceById,
    selectIds: selectMaintenanceIds
    // Pass in a selector that returns the users slice of state
} = maintenancesAdapter.getSelectors(state => selectMaintenancesData(state) ?? initialState)