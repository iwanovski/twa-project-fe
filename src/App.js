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

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Public />} />
                <Route path="login" element={<Login />} />

                <Route path="home" element={<DashLayout />}>

                    <Route index element={<Welcome />} />

                    <Route path="users">
                        <Route index element={<UsersList />} />
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

                </Route>
            </Route>
        </Routes>
    );
}

export default App;