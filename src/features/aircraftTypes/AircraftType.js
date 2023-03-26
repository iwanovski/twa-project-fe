import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectAircraftTypeById } from './aircraftTypesApiSlice'

const AircraftType = ({ aircraftTypeId }) => {
    const aircraftType = useSelector(state => selectAircraftTypeById(state, aircraftTypeId))

    const navigate = useNavigate()

    if (aircraftType) {
        const handleEdit = () => navigate(`/dash/aircraftTypes/${aircraftTypeId}`)

        const cellStatus = aircraftType.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{aircraftType.name}</td>
                <td className={`table__cell ${cellStatus}`}>{aircraftType.code}</td>
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
export default AircraftType