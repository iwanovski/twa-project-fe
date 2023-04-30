import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isPlanner = false
    let isAdmin = false
    let status = "Reader"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo

        isPlanner = roles.includes('Planner')
        isAdmin = roles.includes('Admin')

        if (isPlanner) status = "Planner"
        if (isAdmin) status = "Admin"

        return { username, roles, status, isPlanner, isAdmin }
    }

    return { username: '', roles: [], isPlanner, isAdmin, status }
}
export default useAuth