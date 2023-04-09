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

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {

      const { ids } = users

      const tableContent = ids?.length
          ? ids.map(maintenanceId => <Maintenance key={maintenanceId} maintenanceId={maintenanceId} />)
          : null

      content = (
          <table className="table table--users">
              <thead className="table__thead">
                  <tr>
                      <th scope="col" className="table__th user__username">Aircraft</th>
                      <th scope="col" className="table__th user__roles">Airport</th>
                      <th scope="col" className="table__th user__edit">Date</th>
                  </tr>
              </thead>
              <tbody>
                  {tableContent}
              </tbody>
          </table>
      )
  }

  return content
}

export default MaintenancesList