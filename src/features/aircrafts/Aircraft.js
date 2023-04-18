import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectAircraftById } from './aircraftsApiSlice'

const Aircraft = ({ aircraftId }) => {
    const aircraft = useSelector(state => selectAircraftById(state, aircraftId))

    const navigate = useNavigate()

    if (aircraft) {
        const handleEdit = () => navigate(`/home/aircrafts/${aircraftId}`)

        const cellStatus = aircraft.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{aircraft.code}</td>
                <td className={`table__cell ${cellStatus}`}>{aircraft.aircraftTypeCode}</td>
                <td className={`table__cell ${cellStatus}`}>{aircraft.homeAirportCode}</td>
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
export default Aircraft