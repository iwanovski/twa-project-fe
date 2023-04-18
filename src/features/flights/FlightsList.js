import { useNavigate } from 'react-router-dom'
import { useGetFlightsQuery } from "./flightsApiSlice"
import Flight from "./Flight"

const FlightsList = () => {

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetFlightsQuery()

  const navigate = useNavigate()

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
    const handleButtonClick = () => navigate(`/home/flights/new`)

      const { ids } = users

      const tableContent = ids?.length
          ? ids.map(flightId => <Flight key={flightId} flightId={flightId} />)
          : null

      content = (
          <table className="table__flights table--users">
              <thead className="table__thead">
                  <tr>
                      <th scope="col" className="table__th user__username">Code</th>
                      <th scope="col" className="table__th user__edit">AircraftCrewId</th>
                      <th scope="col" className="table__th user__roles">Departure from</th>
                      <th scope="col" className="table__th user__edit">Arrival at</th>
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
                        <button onClick={handleButtonClick}>Schedule flight</button>
                    </td>
                </tr>
              </tfoot>
          </table>
      )
  }

  return content
}

export default FlightsList