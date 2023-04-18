import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'

import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'

import AircraftTypesList from './features/aircraftTypes/AircraftTypesList'
import EditAircraftType from './features/aircraftTypes/EditAircraftType'
import NewAircraftTypeForm from './features/aircraftTypes/NewAircraftTypeForm'

import AircraftsList from './features/aircrafts/AircraftsList'
import EditAircraft from './features/aircrafts/EditAircraft'
import NewAircraftForm from './features/aircrafts/NewAircraftForm'

import AirportsList from './features/airports/AirportsList'
import EditAirport from './features/airports/EditAirport'
import NewAirportForm from './features/airports/NewAirportForm'

import AircraftCrewsList from './features/aircraftCrews/AircraftCrewsList'
import EditAircraftCrew from './features/aircraftCrews/EditAircraftCrew'
import NewAircraftCrewForm from './features/aircraftCrews/NewAircraftCrewForm'

import MechanicCrewsList from './features/mechanicCrews/MechanicCrewsList'
import EditMechanicCrew from './features/mechanicCrews/EditMechanicCrew'
import NewMechanicCrewForm from './features/mechanicCrews/NewMechanicCrewForm'

import FlightsList from './features/flights/FlightsList'
import EditFlight from './features/flights/EditFlight'
import NewFlightForm from './features/flights/NewFlightForm'

import MaintenancesList from './features/maintenances/MaintenancesList'

import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Public />} />
                <Route path="login" element={<Login />} />
                <Route element={<PersistLogin />}>
                <Route element={<Prefetch />}>
                  <Route path="home" element={<DashLayout />}>

                    <Route index element={<Welcome />} />

                    <Route path="users">
                        <Route index element={<UsersList />} />
                        <Route path=":id" element={<EditUser />}/>
                        <Route path="new" element={<NewUserForm />}/>
                    </Route>

                    <Route path="aircraftTypes">
                        <Route index element={<AircraftTypesList />} />
                        <Route path=":id" element={<EditAircraftType />}/>
                        <Route path="new" element={<NewAircraftTypeForm />}/>
                    </Route>

                    <Route path="aircrafts">
                        <Route index element={<AircraftsList />} />
                        <Route path=":id" element={<EditAircraft />}/>
                        <Route path="new" element={<NewAircraftForm />}/>
                    </Route>
                    
                    <Route path="airports">
                        <Route index element={<AirportsList />} />
                        <Route path=":id" element={<EditAirport />}/>
                        <Route path="new" element={<NewAirportForm />}/>
                    </Route>

                    <Route path="aircraftCrews">
                        <Route index element={<AircraftCrewsList />} />
                        <Route path=":id" element={<EditAircraftCrew />}/>
                        <Route path="new" element={<NewAircraftCrewForm />}/>
                    </Route>

                    <Route path="mechanicCrews">
                        <Route index element={<MechanicCrewsList />} />
                        <Route path=":id" element={<EditMechanicCrew />}/>
                        <Route path="new" element={<NewMechanicCrewForm />}/>
                    </Route>

                    <Route path="flights">
                        <Route index element={<FlightsList />} />
                        <Route path=":id" element={<EditFlight />}/>
                        <Route path="new" element={<NewFlightForm />}/>
                    </Route>

                    <Route path="maintenances">
                        <Route index element={<MaintenancesList />} />
                    </Route>

                  </Route>
                </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;