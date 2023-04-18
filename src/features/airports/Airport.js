import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectAirportById } from './airportsApiSlice'

const Airport = ({ airportId }) => {
    const airport = useSelector(state => selectAirportById(state, airportId))

    const navigate = useNavigate()

    if (airport) {
        const handleEdit = () => navigate(`/home/airports/${airportId}`)

        const cellStatus = airport.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{airport.code}</td>
                <td className={`table__cell ${cellStatus}`}>{airport.fullName}</td>
                <td className={`table__cell ${cellStatus}`}>{airport.address}</td>
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
export default Airport