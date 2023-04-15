import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import UsersList from './features/users/UsersList'
import AircraftTypesList from './features/aircraftTypes/AircraftTypesList'
import AircraftsList from './features/aircrafts/AircraftsList'
import AirportsList from './features/airports/AirportsList'
import AircraftCrewsList from './features/aircraftCrews/AircraftCrewsList'
import MechanicCrewsList from './features/mechanicCrews/MechanicCrewsList'
import FlightsList from './features/flights/FlightsList'
import MaintenancesList from './features/maintenances/MaintenancesList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
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
                    </Route>

                    <Route path="aircrafts">
                        <Route index element={<AircraftsList />} />
                    </Route>
                    
                    <Route path="airports">
                        <Route index element={<AirportsList />} />
                    </Route>

                    <Route path="aircraftCrews">
                        <Route index element={<AircraftCrewsList />} />
                    </Route>

                    <Route path="mechanicCrews">
                        <Route index element={<MechanicCrewsList />} />
                    </Route>

                    <Route path="flights">
                        <Route index element={<FlightsList />} />
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