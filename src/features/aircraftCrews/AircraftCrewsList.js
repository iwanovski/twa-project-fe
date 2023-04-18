import { useNavigate } from 'react-router-dom'
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

  const navigate = useNavigate()

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
      const handleButtonClick = () => navigate(`/home/aircraftCrews/new`)

      const { ids } = users

      const tableContent = ids?.length
          ? ids.map(aircraftCrewId => <AircraftCrew key={aircraftCrewId} aircraftCrewId={aircraftCrewId} />)
          : null

      content = (
          <table className="table__aircraftCrews table--users">
              <thead className="table__thead">
                  <tr>
                      <th scope="col" className="table__th user__username">Name</th>
                      <th scope="col" className="table__th user__roles">Main pilot</th>
                      <th scope="col" className="table__th user__edit">Second pilot</th>
                      <th scope="col" className="table__th user__edit">Edit</th>
                  </tr>
              </thead>
              <tbody>
                  {tableContent}
              </tbody>
              <tfoot>
                <tr>
                    <td colSpan="1">
                        <button onClick={handleButtonClick}>Create new aicraftCrew</button>
                    </td>
                </tr>
              </tfoot>
          </table>
      )
  }

  return content
}

export default AircraftCrewsList