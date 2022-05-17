import { IconButton, TextField } from "@mui/material";
import { useState } from "react";
import Calculator from "./Calculator";
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';

const InputCalculator = ( props) => {

    const [show, SetShow] = useState(false)
    const [value, SetValue] = useState(props.DefaultValue || 0)

    const handleClick = (event) => {
        SetShow(!show)
    };

    const CalcButton = () => {

        return  (
            <IconButton color='primary' title="Show/hide calculator" onClick={handleClick} {...props}>
                {props.Icon || <CalculateOutlinedIcon fontSize="medium" />}
            </IconButton>
        )
    }

    

    return (
        <>
            <TextField
                style={{ width: props.InputWidth || '200px' }}
                label="Calculator"
                value={value}
                size="large"
                onChange={(e) => SetValue(e.target.value)}
                InputProps={{ endAdornment: <CalcButton />, style:{fontSize:props.InputFontSize || 14}}}
                {...props}
            />
            <Calculator Show={show} onBlur={()=> {alert('Blur');SetShow(false)}} onShow={SetShow} DefaultValue={value} onUpdateParentInput={SetValue} />
        </>
    );

}

export default InputCalculator
