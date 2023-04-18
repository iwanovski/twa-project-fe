import { useNavigate } from 'react-router-dom'
import { useGetMaintenancesQuery } from "./maintenancesApiSlice"
import Maintenance from "./Maintenance"

const MaintenancesList = () => {

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetMaintenancesQuery()

  const navigate = useNavigate()

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
      const handleButtonClick = () => navigate(`/home/maintenances/new`)

      const { ids } = users

      const tableContent = ids?.length
          ? ids.map(maintenanceId => <Maintenance key={maintenanceId} maintenanceId={maintenanceId} />)
          : null

      content = (
          <table className="table__maintenances table--users">
              <thead className="table__thead">
                  <tr>
                      <th scope="col" className="table__th user__username">Aircraft</th>
                      <th scope="col" className="table__th user__roles">Airport</th>
                      <th scope="col" className="table__th user__roles">MechanicCrew</th>
                      <th scope="col" className="table__th user__edit">Date</th>
                      <th scope="col" className="table__th user__edit">Edit</th>
                  </tr>
              </thead>
              <tbody>
                  {tableContent}
              </tbody>
              <tfoot>
                <tr>
                    <td colSpan="1">
                        <button onClick={handleButtonClick}>Schedule maintenance</button>
                    </td>
                </tr>
              </tfoot>
          </table>
      )
  }

  return content
}

export default MaintenancesList