import { Navigate } from 'react-router-dom'
import { logout } from '../../ClientApi'

const Logout = () => {

    logout()

    return (

        <Navigate replace to="/login" />)
}

export default Logout
