// import { Modal, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";


const DealDetails = (props) => {

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


  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading {props.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={props.onClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <Modal {...props}
        // open={props.open}
        // onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Details for Deal # {props.id}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal> */}
    </>
  )
}

export default DealDetails