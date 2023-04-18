import { useNavigate } from 'react-router-dom'
import { useGetMechanicCrewsQuery } from "./mechanicCrewsApiSlice"
import MechanicCrew from "./MechanicCrew"

const MechanicCrewsList = () => {

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetMechanicCrewsQuery()

  const navigate = useNavigate()

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
      const handleButtonClick = () => navigate(`/home/mechanicCrews/new`)

      const { ids } = users

      const tableContent = ids?.length
          ? ids.map(mechanicCrewId => <MechanicCrew key={mechanicCrewId} mechanicCrewId={mechanicCrewId} />)
          : null

      content = (
          <table className="table__mechanicCrews table--users">
              <thead className="table__thead">
                  <tr>
                      <th scope="col" className="table__th user__username">Name</th>
                      <th scope="col" className="table__th user__roles">Home airport</th>
                      <th scope="col" className="table__th user__edit">Edit</th>
                  </tr>
              </thead>
              <tbody>
                  {tableContent}
              </tbody>
              <tfoot>
                <tr>
                    <td colSpan="1">
                        <button onClick={handleButtonClick}>Create mechanicCrew</button>
                    </td>
                </tr>
              </tfoot>
          </table>
      )
  }

  return content
}

export default MechanicCrewsList