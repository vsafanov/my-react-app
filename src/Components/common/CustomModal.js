
import { Label, Save } from "@mui/icons-material";
import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";


const CustomModal = ({ onSave, ShowSaveButton, MyButton, ...rest }) => {

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

    const [formData, setFormData] = useState('')
    const [user, setUser] = useState({})

    const myUser = {
        name: "Max",
        email: "test@hotmail.com"
    }

    
    useEffect(() => {
        // alert(JSON.stringify(myUser, null, 2))
        setUser(myUser)
    },[rest.id])

   

    const handleChange = e => {
        e.preventDefault()
        let key = { name: e.target.value }
        setUser({ ...user, ...key });
    }

    const handleSubmit = e => {
        e.preventDefault()

        alert(JSON.stringify(user, null, 2))
    }

    // !!!!!!!!!!! VERY IMPORTANT TO SEPARATE EVENT WITH REST OF PROPS  !!!!!!!!!!!!!!!!!
    //   const { onSave, ...rest } = props
    // OR USER THE CURRENT COMPONENT HEADER with {onSave,...rest}  IN CURLY BRACKETS

    return (
        <>
            <Modal {...rest}>
                <Modal.Header closeButton>
                    <Modal.Title>{rest.title} </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {rest.children}
                    {/* <form onSubmit={handleSubmit}>
                        <TextField
                            id="name"
                            label="Name"
                            value={user.name}
                            onChange={handleChange}
                        //onChange={e=> {setUser({...user, name: e.target.value});}}
                        />
                        <TextField
                            id="email"
                            label="email"
                            value={user.email}
                            onChange={e => { setUser({ ...user, email: e.target.value }); }}
                        />
                        <label id='username' width='100%' >{JSON.stringify(user)}</label>
                        <Button type="submit" variant="primary" >
                            Submit
                        </Button>
                    </form> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={rest.onHide}>
                        Close
                    </Button>
                    {ShowSaveButton ?
                        // <Button variant="primary" onClick={() => onSave("Deal #" + rest.id)} >
                        <Button variant="primary" type={rest.type} form={rest.form} onClick={() => onSave && onSave()} >
                            Save Changes
                        </Button>
                        : ''
                    }

                    {MyButton && MyButton}

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

export default CustomModal