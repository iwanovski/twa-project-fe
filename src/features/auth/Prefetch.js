import { store } from '../../app/store'
import { usersApiSlice } from '../users/usersApiSlice';
import { aicraftCrewsApiSlice } from '../aircraftCrews/aircraftCrewsApiSlice'
import { aicraftsApiSlice } from '../aircrafts/aircraftsApiSlice'
import { airportsApiSlice } from '../airports/airportsApiSlice'
import { aicraftTypesApiSlice } from '../aircraftTypes/aircraftTypesApiSlice'
import { mechanicCrewsApiSlice } from '../mechanicCrews/mechanicCrewsApiSlice'
import { flightsApiSlice } from '../flights/flightsApiSlice'
import { maintenancesApiSlice } from '../maintenances/maintenancesApiSlice'
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const aircraftCrews = store.dispatch(aicraftCrewsApiSlice.endpoints.getAircraftCrews.initiate())
        const aircrafts = store.dispatch(aicraftsApiSlice.endpoints.getAircrafts.initiate())
        const airports = store.dispatch(airportsApiSlice.endpoints.getAirports.initiate())
        const aircraftTypes = store.dispatch(aicraftTypesApiSlice.endpoints.getAircraftTypes.initiate())
        const mechanicCrews = store.dispatch(mechanicCrewsApiSlice.endpoints.getMechanicCrews.initiate())
        const flights = store.dispatch(flightsApiSlice.endpoints.getFlights.initiate())
        const maintenances = store.dispatch(maintenancesApiSlice.endpoints.getMaintenances.initiate())

        return () => {
            users.unsubscribe()
            aircraftCrews.unsubscribe()
            aircrafts.unsubscribe()
            airports.unsubscribe()
            aircraftTypes.unsubscribe()
            mechanicCrews.unsubscribe()
            flights.unsubscribe()
            maintenances.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch