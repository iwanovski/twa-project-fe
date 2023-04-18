import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectMaintenanceById } from './maintenancesApiSlice'

const Maintenance = ({ maintenanceId }) => {
    const maintenance = useSelector(state => selectMaintenanceById(state, maintenanceId))

    const navigate = useNavigate()

    if (maintenance) {
        const handleEdit = () => navigate(`/home/maintenances/${maintenanceId}`)

        const cellStatus = maintenance.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{maintenance.aircraftCode}</td>
                <td className={`table__cell ${cellStatus}`}>{maintenance.airportCode}</td>
                <td className={`table__cell ${cellStatus}`}>{maintenance.mechanicCrewId}</td>
                <td className={`table__cell ${cellStatus}`}>{maintenance.date}</td>
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
export default Maintenance