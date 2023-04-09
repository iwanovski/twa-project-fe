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

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {

      const { ids } = users

      const tableContent = ids?.length
          ? ids.map(flightId => <Flight key={flightId} flightId={flightId} />)
          : null

      content = (
          <table className="table table--users">
              <thead className="table__thead">
                  <tr>
                      <th scope="col" className="table__th user__username">Code</th>
                      <th scope="col" className="table__th user__roles">Fullname</th>
                      <th scope="col" className="table__th user__edit">Placeholder</th>
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

export default FlightsList