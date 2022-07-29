import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet, NavLink, Navigate } from 'react-router-dom';
import { Backdrop, Box, Button, CircularProgress, Tab } from '@mui/material';
import { isLoggedIn, LoadLookup } from '../../ClientApi';

// import { menuItems } from '../../routes';


const Layout = () => {

    // const navigate = useNavigate()
    const location = useLocation();
    const defaultPath = '/admin/Index'


    // useEffect(() => {
        if(!isLoggedIn()) {
            return <Navigate replace to="/login" />
        }
    // })


    const menuItems = [
        {
            text: 'AWS',
            path: '/admin/Index'
        },
        {
            text: 'Deals List',
            path: '/admin/DealsList'
        },
        {
            text: 'Error Log',
            path: '/admin/ErrorLog'
        },
        {
            text: 'Total Usage',
            path: '/admin/TotalUsage'
        },
        {
            text: 'User Statistics',
            path: '/admin/UserStatistics'
        },
        {
            text: 'Users',
            path: '/admin/Users'
        },
        {
            text: 'Email Body',
            path: '/admin/EmailBody'
        },
        {
            text: 'Logout',
            path: '/admin/Logout'
        },

    ]

    // let isAllDone = false

    const isAllDone = sessionStorage.getItem("Company") === null? LoadLookup(['Company', 'Status', 'Category']):false

    // const [active, setActive] = useState('/admin/Main')
    // const preventDefault = (event) => event.preventDefault();

    // const navigateTo = (path) => {
    //     navigate(path);
    //     // setActive(path);
    // }

    console.log(`Current path: ${location.pathname},  do not exist in array: ${!menuItems.some((item) => item.path === location.pathname)}`)

    // useEffect(() => {
        if (!menuItems.some((item) => item.path.toLowerCase() === location.pathname.toLowerCase())) {
            // navigateTo(defaultPath);
            return <Navigate replace to={defaultPath} />
        }
    // });

    return (
        <>
            {isAllDone &&
                (
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isAllDone} >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                )
            }

            {!isAllDone &&
                (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                padding: '15px ',
                                justifyContent: 'left',
                                // borderBottom: 1,
                                borderColor: 'divider'
                                //  typography: 'h5'
                            }}
                        // onClick={preventDefault}
                        >
                            {
                                menuItems.map((item) => (
                                    <NavLink

                                        style={({ isActive }) => {
                                            return {

                                                padding: "5px 20px",
                                                color: isActive ? "#2196f3" : "grey",
                                                textDecoration: 'none',
                                                borderBottom: isActive ? 0 : '1px grey solid',
                                                borderTop: isActive ? '1px grey solid' : 0,
                                                borderLeft: isActive ? '1px grey solid' : 0,
                                                borderRight: isActive ? '1px grey solid' : 0,
                                                fontFamily: '',
                                                fontWeight: '500',
                                                fontSize: '15px'

                                            };
                                        }}

                                        to={item.path}
                                        key={item.path}
                                        
                                    >
                                        {item.text}
                                    </NavLink>
                                ))
                            }
                            <div></div>

                        </Box>


                        <Outlet />
                    </>
                )
            }
            {/* <div>{children}</div> */}
        </>
    );
}

export default Layout;
