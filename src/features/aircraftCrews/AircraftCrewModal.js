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

export default function AircraftCrewModal({ open, handleClose, aircraftCrew }) {
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
          AircraftCrew {aircraftCrew.name}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          ID: {aircraftCrew.id}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Main Pilot: {aircraftCrew.mainPilotId}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Second Pilot: {aircraftCrew.secondPilotId}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Members: {aircraftCrew.memberIds.toString()}
        </Typography>
      </Box>
    </Modal>
  );
}
