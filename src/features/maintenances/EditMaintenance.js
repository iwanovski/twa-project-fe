import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectMaintenanceById } from './maintenancesApiSlice'
import EditMaintenanceForm from './EditMaintenanceForm'

const EditMaintenance = () => {
    const { id } = useParams()

    const maintenance = useSelector(state => selectMaintenanceById(state, id))

    const content = maintenance ? <EditMaintenanceForm maintenance={maintenance} /> : <p>Loading...</p>

    return content
}
export default EditMaintenance