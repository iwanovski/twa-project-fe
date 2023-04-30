import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

import Modal from '@mui/material/Modal';
import AircraftModal from "./AircraftModal"

import { useSelector } from 'react-redux'
import { selectAircraftById } from './aircraftsApiSlice'

const Aircraft = ({ aircraftId }) => {
    const aircraft = useSelector(state => selectAircraftById(state, aircraftId))
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate()

    if (aircraft) {
        const handleEdit = () => navigate(`/home/aircrafts/${aircraftId}`)

        const cellStatus = aircraft.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{aircraft.code}</td>
                <td className={`table__cell ${cellStatus}`}>{aircraft.aircraftTypeCode}</td>
                <td className={`table__cell ${cellStatus}`}>{aircraft.homeAirportCode}</td>
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
                            <AircraftModal
                                open={open}
                                handleClose={() => setOpen(false)}
                                aircraft={aircraft}
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
export default Aircraft