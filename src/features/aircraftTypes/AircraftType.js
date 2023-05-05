import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

import Modal from '@mui/material/Modal';
import AircraftTypeModal from "./AircraftTypeModal"

import { useSelector } from 'react-redux'
import { selectAircraftTypeById } from './aircraftTypesApiSlice'

const AircraftType = ({ aircraftTypeId }) => {
    const aircraftType = useSelector(state => selectAircraftTypeById(state, aircraftTypeId))
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { isAdmin, isAircraftController } = useAuth()

    const navigate = useNavigate()

    if (aircraftType) {
        const handleEdit = () => navigate(`/home/aircraftTypes/${aircraftTypeId}`)

        const cellStatus = aircraftType.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{aircraftType.name}</td>
                <td className={`table__cell ${cellStatus}`}>{aircraftType.code}</td>
                <td className={`table__cell ${cellStatus}`}>{aircraftType.numberOfPlaces}</td>
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
                            <AircraftTypeModal
                                open={open}
                                handleClose={() => setOpen(false)}
                                aircraftType={aircraftType}
                            />
                        </Modal>
                    </button>
                    {(isAdmin || isAircraftController) && <button
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
export default AircraftType