import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

import Modal from '@mui/material/Modal';
import UserModal from "./UserModal"

import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import useAuth from '../../hooks/useAuth';

const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId))
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { isAdmin } = useAuth()

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/home/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{user.username}</td>
                <td className={`table__cell ${cellStatus}`}>{user.fullName}</td>
                <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
                <td className={`table__cell ${cellStatus}`}>
                <div style={{ display: "flex" }}>
                    <button
                        className="icon-button table__button"
                        onClick={handleOpen}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            slotProps={{
                                BackdropProps: {
                                    onClick: handleClose
                                    }
                                }}
                        >
                            <UserModal
                                open={open}
                                handleClose={() => setOpen(false)}
                                user={user}
                            />
                        </Modal>
                    </button>
                    {isAdmin && <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>}
                    </div>
                </td>
            </tr>
        )

    } else return null
}
export default User