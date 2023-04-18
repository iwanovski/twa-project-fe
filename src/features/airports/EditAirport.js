import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAirportById } from './airportsApiSlice'
import EditAirportForm from './EditAirportForm'

const EditAirport = () => {
    const { id } = useParams()

    const airport = useSelector(state => selectAirportById(state, id))

    const content = airport ? <EditAirportForm airport={airport} /> : <p>Loading...</p>

    return content
}
export default EditAirport