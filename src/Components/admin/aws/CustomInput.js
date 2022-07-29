import { TextField } from '@mui/material'
import React from 'react'


const CustomInput = (props) => {
    return (

        <TextField
            key={`${props.label}_${props.id}`}
            InputLabelProps={{ shrink: true }}
            label={props.label} //Expired
            fullWidth={true}
            // defaultValue={props.defaultValue}
            size="small"
            // type="date"
            InputProps={{ style: { fontSize: 12 } }}
            // focused
            // { ...props.register(`result.${props.index}.${props.name}`)}
        // onChange={handleChange}
        {...props}
        />

    )
}

export default CustomInput
