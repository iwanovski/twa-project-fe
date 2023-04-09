import { useSelector } from 'react-redux'
import { selectFlightById } from './flightsApiSlice'

const Flight = ({ airportId: flightId }) => {
    const flight = useSelector(state => selectFlightById(state, flightId))

    if (flight) {
        const cellStatus = flight.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{flight.code}</td>
                <td className={`table__cell ${cellStatus}`}>{flight.departureAirportCode}</td>
                <td className={`table__cell ${cellStatus}`}>{flight.arrivalAirportCode}</td>
            </tr>
        )

    } else return null
}
export default Flight