import { useSelector } from 'react-redux'
import { selectMechanicCrewById } from './mechanicCrewsApiSlice'

const MechanicCrew = ({ mechanicCrewId }) => {
    const mechanicCrew = useSelector(state => selectMechanicCrewById(state, mechanicCrewId))

    if (mechanicCrew) {
        const cellStatus = mechanicCrew.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{mechanicCrew.name}</td>
                <td className={`table__cell ${cellStatus}`}>{mechanicCrew.homeAirportCode}</td>
                <td className={`table__cell ${cellStatus}`}>{"test"}</td>
            </tr>
        )

    } else return null
}
export default MechanicCrew