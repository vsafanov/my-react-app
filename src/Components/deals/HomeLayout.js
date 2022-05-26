import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { Button } from "@mui/material";

const HomeLayout = ({Search}) => {

    const [value, setValue] = useState('')

    const defaultPath = '/deal'
    const location = useLocation();
    const navigate = useNavigate();

    const  navigateTo = (path) => {
        navigate(path);
    }

    useEffect(() => {
        if (location.pathname.toLowerCase() === '/') { navigateTo(defaultPath); }
    });

    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container">
                    <div className="row justify-content-center" style={{ '--bs-gutter-x': '10px' }}>
                        <div className="col-4">
                            <a className="navbar-brand " style={{ paddingRight: '300px' }} href={defaultPath} >
                                <img src='https://www.dealsdigger.com/deals/images/Digger.gif' alt='Home' />
                            </a>
                        </div>
                        <div className="col-5">
                            <div className="input-group input-group-sm mb-3 top-50" >
                                <input type="search" className="form-control" placeholder="What are you looking for?" onChange={(e)=>setValue(e.target.value)} value={value} />
                                <Button variant="contained" size="small" onClick={()=>Search(value)}>
                                    <ManageSearchIcon  />
                                </Button>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="input-group input-group-sm mb-3 top-50" >
                                <input type="text" className="form-control" placeholder="Free Newsletter" />
                                <button className="btn btn-sm btn-success" type="button" id="btnSignUp">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {/* {children} */}
            <Outlet />
        </>
        
    )
}

export default HomeLayout