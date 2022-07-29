import { Card } from "react-bootstrap"
import InfoIcon from '@mui/icons-material/Info'
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { Typography } from '@mui/material'
import CardFooter from "./CardFooter";

const Deal = ({ deal, cardWidth, showDetails, showEmail }) => {

    const { color, borderColor, Icon } = CardFooter(deal)

    return (
        <>
            {Icon &&
                <Card id={deal.dealId} key={deal.dealId} style={{ width: cardWidth }} className={`${borderColor} card-size`}>
                    <Card.Body className="overflow-hidden" style={{ padding: '8px' }}>
                        <Card.Text dangerouslySetInnerHTML={{ __html: deal.details }} />
                    </Card.Body>
                    <Card.Footer href="#" className={`card-footer bg-transparent ${borderColor}`}>

                        <div className="row">
                            <div className="col-8" >
                                <Typography color={color} fontSize='small' >
                                    {Icon}
                                </Typography>
                            </div>
                            <div className="col-4" style={{ textAlign: 'right' }}>
                                {/* <IconButton  > */}
                                <InfoIcon color="info" fontSize='medium' onClick={() => showDetails(deal)} style={{ cursor: 'pointer' }} />
                                {/* </IconButton> */}
                                <ForwardToInboxIcon style={{ color: 'burlywood',cursor: 'pointer' }} onClick={() => showEmail(deal)} fontSize='medium' />
                            </div>
                        </div>


                    </Card.Footer>
                </Card>
            }
        </>
    )

}

export default Deal