import { useNavigate } from 'react-router-dom'
import { useGetUsersQuery } from "./usersApiSlice"
import User from "./User"

const UsersList = () => {

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery('usersList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  const navigate = useNavigate()

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
      const handleButtonClick = () => navigate(`/home/users/new`)

      const { ids } = users

      const tableContent = ids?.length
          ? ids.map(userId => <User key={userId} userId={userId} />)
          : null

      content = (
          <table className="table table--users">
              <thead className="table__thead">
                  <tr>
                      <th scope="col" className="table__th user__username">Username</th>
                      <th scope="col" className="table__th user__roles">Roles</th>
                      <th scope="col" className="table__th user__edit">Edit</th>
                  </tr>
              </thead>
              <tbody>
                  {tableContent}
              </tbody>
              <tfoot>
                <tr>
                    <td colSpan="1">
                        <button onClick={handleButtonClick}>Create user</button>
                    </td>
                </tr>
              </tfoot>
          </table>
      )
  }

  return content
}

export default UsersList