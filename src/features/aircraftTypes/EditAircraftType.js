import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAircraftTypeById } from './aircraftTypesApiSlice'
import EditAircraftTypeForm from './EditAircraftTypeForm'

const EditAircraftType = () => {
    const { id } = useParams()

    const aircraftType = useSelector(state => selectAircraftTypeById(state, id))

    const content = aircraftType ? <EditAircraftTypeForm aircraftType={aircraftType} /> : <p>Loading...</p>

    return content
}
export default EditAircraftType