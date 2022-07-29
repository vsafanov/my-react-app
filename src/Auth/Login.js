import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { ClientApi, BODY_TYPE, METHOD_TYPE, setCookieToken } from '../ClientApi';
import configData from "../config.json";
import { Box } from '@mui/material';



function Login() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [err, setError] = useState('');

    const navigate = useNavigate()


    const getToken = async () => {
        var data = JSON.stringify({
            "username":  userName ,
            "password":  password 
        })

        const url = `${configData.SERVER_URL}token`

        const [{ result, error, response }] = await ClientApi(url, METHOD_TYPE.post, BODY_TYPE.text, data, false)

        setError(error)

        let status = response.status   //statusCode
        switch (status) {
            case 200:
                setCookieToken(result)
                navigate('/admin')
                break

            case 401:
                console.log('Unauthorized: ' + status);
                setError('Access Denied')
                break

            default:
                console.log('Looks like there was a problem. Status Code: ' + status);
                setError(status)
                break;
        }
        console.log(result)
        console.error('E', error)
    }

    const SubmitLogin = async (e) => {
        e.preventDefault = true
        getToken()
    }

    return (

        <>
            <Box
                sx={{
                    width: 400,
                    height: 300,
                    backgroundColor: '',
                    padding: '10px',

                    // border: 'solid 1px black',
                    position: 'absolute',
                    left: '40%',
                    top: '20%'
                }}
            >
                <div className="col-md-12 " >
                    <h3><strong>Log In</strong></h3><br />
                    {/* <form method="post" action="/deals/Account/login"> */}
                    <div >
                        <label htmlFor="userName" className="col-3 col-form-label">User&nbsp;Name</label>
                        <div className="col-9">
                            <input type="text" className="form-control" id="userName" onChange={(e) => setUserName(e.target.value)} value={userName} name="userName" placeholder="Enter user name" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="col-3 col-form-label">Password</label>
                        <div className="col-9">
                            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} value={password} name="password" id="password" placeholder="Password" />
                        </div>
                    </div>
                    <div className="col-9" style={{ paddingTop: '20px', textAlign: 'right' }}>
                        <button type="button" onClick={SubmitLogin} className="btn btn-primary btn-sm">Submit</button>
                    </div>
                    {/* </form> */}
                    {err && <div style={{ color: 'red' }} > Error occured: {err.toString()}</div>}
                </div>
            </Box>



        </>
    );
}

export default Login;
