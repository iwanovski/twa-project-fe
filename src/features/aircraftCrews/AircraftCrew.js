import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

import Modal from '@mui/material/Modal';
import AircraftCrewModal from "./AircraftCrewModal"

import { useSelector } from 'react-redux'
import { selectAircraftCrewById } from './aircraftCrewsApiSlice'

const AircraftCrew = ({ aircraftCrewId }) => {
    const aircraftCrew = useSelector(state => selectAircraftCrewById(state, aircraftCrewId))
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { isAdmin, isAircraftCrewAdmin } = useAuth()

    const navigate = useNavigate()

    if (aircraftCrew) {
        const handleEdit = () => navigate(`/home/aircraftCrews/${aircraftCrewId}`)

        const cellStatus = aircraftCrew.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{aircraftCrew.name}</td>
                <td className={`table__cell ${cellStatus}`}>{aircraftCrew.mainPilotId}</td>
                <td className={`table__cell ${cellStatus}`}>{aircraftCrew.secondPilotId}</td>
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
                            <AircraftCrewModal
                                open={open}
                                handleClose={() => setOpen(false)}
                                aircraftCrew={aircraftCrew}
                            />
                        </Modal>
                    </button>
                    {(isAdmin || isAircraftCrewAdmin) && <button
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
export default AircraftCrew