import { useSelector } from 'react-redux'
import { selectAircraftById } from './aircraftsApiSlice'

const Aircraft = ({ aircraftId }) => {
    const aircraft = useSelector(state => selectAircraftById(state, aircraftId))

    if (aircraft) {
        const cellStatus = aircraft.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{aircraft.code}</td>
                <td className={`table__cell ${cellStatus}`}>{aircraft.aircraftTypeCode}</td>
                <td className={`table__cell ${cellStatus}`}>{aircraft.homeAirportCode}</td>
            </tr>
        )

    } else return null
}
export default Aircraft