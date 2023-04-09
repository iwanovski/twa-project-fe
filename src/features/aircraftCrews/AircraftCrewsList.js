import { useGetAircraftCrewsQuery } from "./aircraftCrewsApiSlice"
import AircraftCrew from "./AircraftCrew"

const AircraftCrewsList = () => {

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAircraftCrewsQuery()

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {

      const { ids } = users

      const tableContent = ids?.length
          ? ids.map(aircraftCrewId => <AircraftCrew key={aircraftCrewId} aircraftCrewId={aircraftCrewId} />)
          : null

      content = (
          <table className="table table--users">
              <thead className="table__thead">
                  <tr>
                      <th scope="col" className="table__th user__username">Id</th>
                      <th scope="col" className="table__th user__roles">Main pilot</th>
                      <th scope="col" className="table__th user__edit">Second pilot</th>
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

export default AircraftCrewsList