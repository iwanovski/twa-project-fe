import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

import Modal from '@mui/material/Modal';
import AirportModal from "./AirportModal"

import { useSelector } from 'react-redux'
import { selectAirportById } from './airportsApiSlice'

const Airport = ({ airportId }) => {
    const airport = useSelector(state => selectAirportById(state, airportId))
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate()

    if (airport) {
        const handleEdit = () => navigate(`/home/airports/${airportId}`)

        const cellStatus = airport.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{airport.code}</td>
                <td className={`table__cell ${cellStatus}`}>{airport.fullName}</td>
                <td className={`table__cell ${cellStatus}`}>{airport.address}</td>
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
                            <AirportModal
                                open={open}
                                handleClose={() => setOpen(false)}
                                airport={airport}
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
export default Airport