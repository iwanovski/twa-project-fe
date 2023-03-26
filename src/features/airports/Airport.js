import { useSelector } from 'react-redux'
import { selectAirportById } from './airportsApiSlice'

const Airport = ({ airportId }) => {
    const airport = useSelector(state => selectAirportById(state, airportId))

    if (airport) {
        const cellStatus = airport.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{airport.code}</td>
                <td className={`table__cell ${cellStatus}`}>{airport.fullName}</td>
                <td className={`table__cell ${cellStatus}`}>{airport.homeAirportCode}</td>
            </tr>
        )

    } else return null
}
export default Airport