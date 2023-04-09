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

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {

      const { ids } = users

      const tableContent = ids?.length
          ? ids.map(mechanicCrewId => <MechanicCrew key={mechanicCrewId} mechanicCrewId={mechanicCrewId} />)
          : null

      content = (
          <table className="table table--users">
              <thead className="table__thead">
                  <tr>
                      <th scope="col" className="table__th user__username">Name</th>
                      <th scope="col" className="table__th user__roles">Home airport</th>
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

export default MechanicCrewsList