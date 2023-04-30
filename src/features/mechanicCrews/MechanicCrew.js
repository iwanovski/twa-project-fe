import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

import Modal from '@mui/material/Modal';
import MechanicCrewModal from "./MechanicCrewModal"
import { useSelector } from 'react-redux'
import { selectMechanicCrewById } from './mechanicCrewsApiSlice'

const MechanicCrew = ({ mechanicCrewId }) => {
    const mechanicCrew = useSelector(state => selectMechanicCrewById(state, mechanicCrewId))
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate()

    if (mechanicCrew) {
        const handleEdit = () => navigate(`/home/mechanicCrews/${mechanicCrewId}`)

        const cellStatus = mechanicCrew.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{mechanicCrew.name}</td>
                <td className={`table__cell ${cellStatus}`}>{mechanicCrew.homeAirportCode}</td>
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
                            <MechanicCrewModal
                                open={open}
                                handleClose={() => setOpen(false)}
                                mechanicCrew={mechanicCrew}
                            />
                        </Modal>
                    </button>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    </div>
                </td>
            </tr>
        )

    } else return null
}
export default MechanicCrew