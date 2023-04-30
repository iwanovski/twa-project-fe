import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

import Modal from '@mui/material/Modal';
import FlightModal from "./FlightModal"

import { useSelector } from 'react-redux'
import { selectFlightById } from './flightsApiSlice'

const Flight = ({ flightId }) => {
    const flight = useSelector(state => selectFlightById(state, flightId))
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate()

    if (flight) {
        const handleEdit = () => navigate(`/home/flights/${flightId}`)

        const cellStatus = flight.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{flight.code}</td>
                <td className={`table__cell ${cellStatus}`}>{flight.aircraftCrewId}</td>
                <td className={`table__cell ${cellStatus}`}>{flight.departureAirportCode}</td>
                <td className={`table__cell ${cellStatus}`}>{flight.arrivalAirportCode}</td>
                <td className={`table__cell ${cellStatus}`}>{flight.date}</td>
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
                            <FlightModal
                                open={open}
                                handleClose={() => setOpen(false)}
                                flight={flight}
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
export default Flight