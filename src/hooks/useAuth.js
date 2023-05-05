import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isAdmin = false
    let isAirportsAdmin = false
    let isAirportManager = false
    let isAircraftController  = false
    let isAircraftMaintainer  = false
    let isMechanic = false
    let isMechanicCrewAdmin = false
    let isPilot = false
    let isSteward = false
    let isAircraftCrewAdmin = false
    let isPlanner = false
    let status = ""

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles, id } = decoded.UserInfo

        isPlanner = roles.includes('Planner')
        isAirportsAdmin = roles.includes('AirportsAdmin')
        isAirportManager = roles.includes('AirportManager')
        isAircraftController = roles.includes('AircraftController')
        isAircraftMaintainer = roles.includes('AircraftMaintainer')
        isMechanic = roles.includes('Mechanic')
        isMechanicCrewAdmin = roles.includes('MechanicCrewAdmin')
        isPilot = roles.includes('Pilot')
        isSteward = roles.includes('Steward')
        isAircraftCrewAdmin = roles.includes('AircraftCrewAdmin')
        isAdmin = roles.includes('Admin')

        if (isPlanner) status = status + "Planner"
        if (isPilot) status = status + "Pilot"
        if (isSteward) status = status + "Steward"
        if (isAircraftCrewAdmin) status = status + "AircraftCrewAdmin"
        if (isMechanicCrewAdmin) status = status + "MechanicCrewAdmin"
        if (isMechanic) status = status + "Mechanic"
        if (isAircraftMaintainer) status = status + "AircraftMaintainer"
        if (isAircraftController) status = status + "AircraftController"
        if (isAirportManager) status = status + "AirportManager"
        if (isAirportsAdmin) status = status + "AirportsAdmin"

        // Admin role overrides everything
        if (isAdmin) status = "Admin"

        return { username, id, roles, status, isPlanner, isAdmin, isPilot, isSteward, isAircraftCrewAdmin, isMechanicCrewAdmin, isMechanic, isAircraftController, isAircraftMaintainer, isAirportManager, isAirportsAdmin }
    }

    return { username: '', id: '', roles: [], isPlanner, isAdmin, isPilot, isSteward, isAircraftCrewAdmin, isMechanicCrewAdmin, isMechanic, isAircraftController, isAircraftMaintainer, isAirportManager, isAirportsAdmin, status }
}
export default useAuth