import { useNavigate } from 'react-router-dom'
import { useGetAirportsQuery } from "./airportsApiSlice"
import Airport from "./Airport"
import useAuth from '../../hooks/useAuth'

const AirportsList = () => {

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAirportsQuery()

  const navigate = useNavigate()

  const { isAdmin, isAirportsAdmin, isAirportManager  } = useAuth()

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
      const handleButtonClick = () => navigate(`/home/airports/new`)

      const { ids } = users

      const tableContent = ids?.length
          ? ids.map(airportId => <Airport key={airportId} airportId={airportId} />)
          : null

      content = (
          <table className="table__airports table--users">
              <thead className="table__thead">
                  <tr>
                      <th scope="col" className="table__th user__username">Code</th>
                      <th scope="col" className="table__th user__roles">Fullname</th>
                      <th scope="col" className="table__th user__edit">Address</th>
                      <th scope="col" className="table__th user__edit">Edit</th>
                  </tr>
              </thead>
              <tbody>
                  {tableContent}
              </tbody>
              <tfoot>
                {(isAdmin || isAirportsAdmin || isAirportManager) && <tr>
                    <td colSpan="1">
                        <button onClick={handleButtonClick}>Create new airport</button>
                    </td>
                </tr>}
              </tfoot>
          </table>
      )
  }

  return content
}

export default AirportsList