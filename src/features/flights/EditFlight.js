import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectFlightById } from './flightsApiSlice'
import EditFlightForm from './EditFlightForm'

const EditFlight = () => {
    const { id } = useParams()

    const flight = useSelector(state => selectFlightById(state, id))

    const content = flight ? <EditFlightForm flight={flight} /> : <p>Loading...</p>

    return content
}
export default EditFlight