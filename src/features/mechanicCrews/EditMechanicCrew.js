import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectMechanicCrewById } from './mechanicCrewsApiSlice'
import EditMechanicCrewForm from './EditMechanicCrewForm'

const EditMechanicCrew = () => {
    const { id } = useParams()

    const mechanicCrew = useSelector(state => selectMechanicCrewById(state, id))

    const content = mechanicCrew ? <EditMechanicCrewForm mechanicCrew={mechanicCrew} /> : <p>Loading...</p>

    return content
}
export default EditMechanicCrew