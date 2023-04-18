import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectFlightById } from './flightsApiSlice'

const Flight = ({ flightId }) => {
    const flight = useSelector(state => selectFlightById(state, flightId))

    const navigate = useNavigate()

    if (flight) {
        const handleEdit = () => navigate(`/home/flights/${flightId}`)

        const cellStatus = flight.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{flight.code}</td>
                <td className={`table__cell ${cellStatus}`}>{flight.aircraftCrewId}</td>
                <td className={`table__cell ${cellStatus}`}>{flight.departureAirportCode}</td>
                <td className={`table__cell ${cellStatus}`}>{flight.arrivalAirportCode}</td>
                <td className={`table__cell ${cellStatus}`}>{flight.date}</td>
                <td className={`table__cell ${cellStatus}`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Flight