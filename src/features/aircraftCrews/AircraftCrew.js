import { useSelector } from 'react-redux'
import { selectAircraftCrewById } from './aircraftCrewsApiSlice'

const AircraftCrew = ({ aircraftCrewId }) => {
    const aircraftCrew = useSelector(state => selectAircraftCrewById(state, aircraftCrewId))

    if (aircraftCrew) {
        const cellStatus = aircraftCrew.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{aircraftCrew.id}</td>
                <td className={`table__cell ${cellStatus}`}>{aircraftCrew.mainPilotId}</td>
                <td className={`table__cell ${cellStatus}`}>{"test"}</td>
            </tr>
        )

    } else return null
}
export default AircraftCrew