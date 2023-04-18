import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectAircraftCrewById } from './aircraftCrewsApiSlice'

const AircraftCrew = ({ aircraftCrewId }) => {
    const aircraftCrew = useSelector(state => selectAircraftCrewById(state, aircraftCrewId))

    const navigate = useNavigate()

    if (aircraftCrew) {
        const handleEdit = () => navigate(`/home/aircraftCrews/${aircraftCrewId}`)

        const cellStatus = aircraftCrew.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{aircraftCrew.name}</td>
                <td className={`table__cell ${cellStatus}`}>{aircraftCrew.mainPilotId}</td>
                <td className={`table__cell ${cellStatus}`}>{aircraftCrew.secondPilotId}</td>
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
export default AircraftCrew