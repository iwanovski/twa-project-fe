import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

import Modal from '@mui/material/Modal';
import MaintenanceModal from "./MaintenanceModal"

import { useSelector } from 'react-redux'
import { selectMaintenanceById } from './maintenancesApiSlice'

const Maintenance = ({ maintenanceId }) => {
    const maintenance = useSelector(state => selectMaintenanceById(state, maintenanceId))
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { isAdmin, isAircraftMaintainer } = useAuth()

    const navigate = useNavigate()

    if (maintenance) {
        const handleEdit = () => navigate(`/home/maintenances/${maintenanceId}`)

        const cellStatus = maintenance.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{maintenance.aircraftCode}</td>
                <td className={`table__cell ${cellStatus}`}>{maintenance.airportCode}</td>
                <td className={`table__cell ${cellStatus}`}>{maintenance.mechanicCrewId}</td>
                <td className={`table__cell ${cellStatus}`}>{maintenance.date}</td>
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
                            <MaintenanceModal
                                open={open}
                                handleClose={() => setOpen(false)}
                                maintenance={maintenance}
                            />
                        </Modal>
                    </button>
                    {(isAdmin || isAircraftMaintainer) && <button
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
export default Maintenance