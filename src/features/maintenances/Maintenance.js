import { useSelector } from 'react-redux'
import { selectMaintenanceById } from './maintenancesApiSlice'

const Maintenance = ({ airportId: flightId }) => {
    const maintenance = useSelector(state => selectMaintenanceById(state, flightId))

    if (maintenance) {
        const cellStatus = maintenance.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{maintenance.aircraftCode}</td>
                <td className={`table__cell ${cellStatus}`}>{maintenance.airportCode}</td>
                <td className={`table__cell ${cellStatus}`}>{maintenance.date}</td>
            </tr>
        )

    } else return null
}
export default Maintenance