import { useNavigate } from 'react-router-dom'
import { useGetAircraftTypesQuery } from "./aircraftTypesApiSlice"
import AircraftType from "./AircraftType"
import useAuth from '../../hooks/useAuth'

const AircraftTypesList = () => {

  const {
    data: aircraftTypes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAircraftTypesQuery()

  const navigate = useNavigate()

  const { isAdmin, isAircraftController } = useAuth()

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
      const handleButtonClick = () => navigate(`/home/aircraftTypes/new`)

      const { ids } = aircraftTypes

      const tableContent = ids?.length
          ? ids.map(aircraftTypeId => <AircraftType key={aircraftTypeId} aircraftTypeId={aircraftTypeId} />)
          : null

      content = (
          <table className="table__aircraftTypes table--users">
              <thead className="table__thead">
                  <tr>
                      <th scope="col" className="table__th user__username">Name</th>
                      <th scope="col" className="table__th user__roles">Code</th>
                      <th scope="col" className="table__th user__edit">Space</th>
                      <th scope="col" className="table__th user__edit">Edit</th>
                  </tr>
              </thead>
              <tbody>
                  {tableContent}
              </tbody>
              <tfoot>
                {(isAdmin || isAircraftController) && <tr>
                    <td colSpan="1">
                        <button onClick={handleButtonClick}>Create new aircraftType</button>
                    </td>
                </tr>}
              </tfoot>
          </table>
      )
  }

  return content
}

export default AircraftTypesList