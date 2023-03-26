import { useGetAircraftTypesQuery } from "./aircraftTypesApiSlice"
import AircraftType from "./AircraftType"

const AircraftTypesList = () => {

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAircraftTypesQuery()

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {

      const { ids } = users

      const tableContent = ids?.length
          ? ids.map(aircraftTypeId => <AircraftType key={aircraftTypeId} aircraftTypeId={aircraftTypeId} />)
          : null

      content = (
          <table className="table table--users">
              <thead className="table__thead">
                  <tr>
                      <th scope="col" className="table__th user__username">Name</th>
                      <th scope="col" className="table__th user__roles">Code</th>
                      <th scope="col" className="table__th user__edit">Edit</th>
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

export default AircraftTypesList