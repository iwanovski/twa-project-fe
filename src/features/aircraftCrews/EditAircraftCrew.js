import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAircraftCrewById } from './aircraftCrewsApiSlice'
import EditAircraftCrewForm from './EditAircraftCrewForm'

const EditAircraftCrew = () => {
    const { id } = useParams()

    const aircraftCrew = useSelector(state => selectAircraftCrewById(state, id))

    const content = aircraftCrew ? <EditAircraftCrewForm aircraftCrew={aircraftCrew} /> : <p>Loading...</p>

    return content
}
export default EditAircraftCrew