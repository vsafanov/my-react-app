import { IconButton, TextField } from "@mui/material";
import { useState } from "react";
import Calculator from "./Calculator";
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';

const InputCalculator = (props) => {

    const [show, SetShow] = useState(false)
    const [text, SetText] = useState(props.defaultValue || 0)

    const handleClick = (event) => {
        SetShow(!show)
    };

    const CalcButton = () => {

        return (
            <IconButton color='primary' title="Show/hide calculator" onClick={handleClick} {...props}>
                {props.Icon || <CalculateOutlinedIcon fontSize="medium" />}
            </IconButton>
        )
    }

    return (
        <>
            <div style={{ display: 'inline-block' }} >
                <TextField
                    style={{ width: props.InputWidth || '200px' }}
                    label="Calculator"
                    value={text}
                    size="large"
                    onChange={(e) => SetText(e.target.value)}
                    InputProps={{ endAdornment: <CalcButton />, style: { fontSize: props.InputFontSize || 14 } }}
                    {...props}
                />
                <Calculator Show={show} onBlur={() => { SetShow(false) }} onShow={SetShow}  defaultValue={text} onUpdateParentInput={SetText} />
            </div>
        </>
    );
}

export default InputCalculator
