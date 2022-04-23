import { useState}  from "react"
import { Card } from "react-bootstrap"
import { Button  } from "@mui/material"
import AlarmIcon from '@mui/icons-material/Alarm'
import Icon from '@mui/material/Icon'
import { red } from '@mui/material/colors';
import {Typography} from '@mui/material'

const Deal = ({deal}) => {

    const {ASIN,Title, Feature,ExpiresToday} = deal || {};
    
     const [cardWidth,SetCardWidth] = useState("23%"); 
     const [borderColor,SetBorderColor] = useState("border-success"); 
    // const [description,SetDescription] = useState("");


    return (
        <Card id={ASIN} key={ASIN} style={{width:cardWidth}} className={`${borderColor} card-size`}>
            <Card.Body className="overflow-hidden" style={{padding:'8px'}}>
            {/* <Card.Title></Card.Title> */}
                {/* <Card.Subtitle className="mb-2 text-muted"> */}
                    
                {/* </Card.Subtitle> */}
                <Card.Text>
                <b><a href='Amazon.com' >{Title}</a></b><br/>
                   {Feature}
                </Card.Text>
                
                {/* <Card.Link href="#">Another Link</Card.Link> */}
            </Card.Body>
            <Card.Footer href="#"  className= {`card-footer bg-transparent ${borderColor}`}>

            <Typography color="error" fontSize='small' >
                <AlarmIcon color="error" fontSize='small'  /> <b>Expired</b>
            </Typography>
            <h6 className="error" color="red">
                <AlarmIcon sx={{ color: red[500] }} fontSize='small' /> Expired
            </h6>
            <Button variant='text' color="secondary" startIcon={<AlarmIcon />}>Expired</Button>
                </Card.Footer>
        </Card>
    )

}

export default Deal