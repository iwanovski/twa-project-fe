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
    }),
})
// Automatically generated hook
export const {
    useGetMaintenancesQuery,
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