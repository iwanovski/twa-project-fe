import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const closeButtonStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bgcolor: 'transparent',
  color: 'black',
  fontSize: 24,
  '&:hover': {
    bgcolor: 'transparent',
    color: 'black',
  }
}

export default function FlightModal({ open, handleClose, flight }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} onClick={(event) => event.stopPropagation()}>
        <Button onClick={handleClose} sx={closeButtonStyle}>
          <FontAwesomeIcon icon={faXmark} />
        </Button>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Flight {flight.code}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          ID: {flight.id}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Aircraft: {flight.aircraftCode}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Departing from: {flight.departureAirportCode}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Arriving to: {flight.arrivalAirportCode}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Date {flight.date}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Planned by: {flight.plannedBy}
        </Typography>
      </Box>
    </Modal>
  );
}
