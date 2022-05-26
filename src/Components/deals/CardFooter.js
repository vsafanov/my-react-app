import AlarmIcon from '@mui/icons-material/Alarm'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import moment from 'moment';


const CardFooter = (deal) => {

    const convertDate = (date) => {
        return date ? moment(date).format("MM/DD/YYYY") : null;
    };

    let color = null, borderColor = 'border-success', Icon = <></>
    switch (deal?.Status) {
        case 'Expired':
            color = 'error.main'
            borderColor = 'border-danger'
            Icon = <><AlarmIcon color={color} fontSize='small' /> <b style={{verticalAlign:'middle'}}>Expired</b></>
            break

        case 'Expires Today':
            color = 'warning.main'
            borderColor = 'border-warning'
            Icon = <><ElectricBoltIcon color={color} fontSize='small'  /> <b style={{verticalAlign:'middle'}}>Expires Today</b></>
            break

        case 'Active':
            color='success.main'
            borderColor = 'border-success'
            Icon = <><AlarmIcon color={color} fontSize='small'  /> <b style={{verticalAlign:'middle'}}>Expired on {convertDate(deal?.ExpirationDate)}</b></>
            break
        default:

    }

    return { color, borderColor, Icon , convertDate}
}

export default CardFooter