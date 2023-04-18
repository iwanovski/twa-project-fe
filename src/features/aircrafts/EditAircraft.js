import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAircraftById } from './aircraftsApiSlice'
import EditAircraftForm from './EditAircraftForm'

const EditAircraft = () => {
    const { id } = useParams()

    const aircraft = useSelector(state => selectAircraftById(state, id))

    const content = aircraft ? <EditAircraftForm aircraft={aircraft} /> : <p>Loading...</p>

    return content
}
export default EditAircraft