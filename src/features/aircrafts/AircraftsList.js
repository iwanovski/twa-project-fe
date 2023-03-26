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

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {

      const { ids } = users

      const tableContent = ids?.length
          ? ids.map(aircraftId => <Aircraft key={aircraftId} aircraftId={aircraftId} />)
          : null

      content = (
          <table className="table table--users">
              <thead className="table__thead">
                  <tr>
                      <th scope="col" className="table__th user__username">Code</th>
                      <th scope="col" className="table__th user__roles">AircraftType code</th>
                      <th scope="col" className="table__th user__edit">Home airport code</th>
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

export default AircraftsList