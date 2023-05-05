import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUserGear,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'

import useAuth from '../hooks/useAuth'

const HOME_REGEX = /^\/home(\/)?$/
const NOTES_REGEX = /^\/home\/notes(\/)?$/
const USERS_REGEX = /^\/home\/users(\/)?$/

const DashHeader = () => {
    const { isAdmin, isPlanner, id} = useAuth()
    // Chceme pridat userGear ktory posle usera na editaciu seba sameho - samozrejme bez roli

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    if (isLoading) return <p>Logging Out...</p>

    if (isError) return <p>Error: {error.data?.message}</p>

    const onUserSettingsClicked = () => navigate(`/home/users/${id}`)

    let dashClass = null
    if (!HOME_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    let userButton = null
    if (pathname.includes('/home')) {
        userButton = (
            <button
                className="icon-button"
                title="Users"
                onClick={onUserSettingsClicked}
            >
                <FontAwesomeIcon icon={faUserGear} />
            </button>
        )
    }
    

    const content = (
        <header className="dash-header">
            <div className={`dash-header__container ${dashClass}`}>
                <Link to="/home">
                    <h1 className="dash-header__title">Aircraft Manager</h1>
                </Link>
                <nav className="dash-header__nav">
                    {/* add more buttons later */}
                    {userButton}
                    {logoutButton}
                </nav>
            </div>
        </header>
    )

    return content
}
export default DashHeader