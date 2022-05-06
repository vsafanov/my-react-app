
import { Label, Save } from "@mui/icons-material";
import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";


const CustomModal = ({ onSave, ShowSaveButton, AddButton, ...rest }) => {

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
    }, [rest.id])



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
            <Modal {...rest} >
                <Modal.Header closeButton>
                    <Modal.Title>{rest.title} </Modal.Title>
                </Modal.Header>
                <Modal.Body >

                    {rest.children}

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

                    {AddButton}

                </Modal.Footer>
            </Modal>


        </>
    )
}

export default CustomModal