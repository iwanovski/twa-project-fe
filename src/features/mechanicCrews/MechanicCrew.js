import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectMechanicCrewById } from './mechanicCrewsApiSlice'

const MechanicCrew = ({ mechanicCrewId }) => {
    const mechanicCrew = useSelector(state => selectMechanicCrewById(state, mechanicCrewId))

    const navigate = useNavigate()

    if (mechanicCrew) {
        const handleEdit = () => navigate(`/home/mechanicCrews/${mechanicCrewId}`)

        const cellStatus = mechanicCrew.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{mechanicCrew.name}</td>
                <td className={`table__cell ${cellStatus}`}>{mechanicCrew.homeAirportCode}</td>
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
export default MechanicCrew