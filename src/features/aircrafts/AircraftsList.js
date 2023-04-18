import { useNavigate } from 'react-router-dom'
import { useGetAircraftsQuery } from "./aircraftsApiSlice"
import Aircraft from "./Aircraft"

const AircraftsList = () => {

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAircraftsQuery()

  const navigate = useNavigate()

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
      const handleButtonClick = () => navigate(`/home/aircrafts/new`)

      const { ids } = users

      const tableContent = ids?.length
          ? ids.map(aircraftId => <Aircraft key={aircraftId} aircraftId={aircraftId} />)
          : null

      content = (
          <table className="table__aircrafts table--users">
              <thead className="table__thead">
                  <tr>
                      <th scope="col" className="table__th user__username">Code</th>
                      <th scope="col" className="table__th user__roles">AircraftType code</th>
                      <th scope="col" className="table__th user__edit">Home airport code</th>
                      <th scope="col" className="table__th user__edit">Edit</th>
                  </tr>
              </thead>
              <tbody>
                  {tableContent}
              </tbody>
              <tfoot>
                <tr>
                    <td colSpan="1">
                        <button onClick={handleButtonClick}>Create new aicraft</button>
                    </td>
                </tr>
              </tfoot>
          </table>
      )
  }

  return content
}

export default AircraftsList