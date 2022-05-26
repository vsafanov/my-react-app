import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet, NavLink } from 'react-router-dom';
import { Box, Button, Tab } from '@mui/material';

// import { menuItems } from '../../routes';


const Layout = () => {

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

    const location = useLocation();
    const defaultPath = '/admin/Index'
    // const [active, setActive] = useState('/admin/Main')
    // const preventDefault = (event) => event.preventDefault();

    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
        // setActive(path);
    }

    console.log(`Current path: ${location.pathname},  do not exist in array: ${!menuItems.some((item) => item.path === location.pathname)}`)

    useEffect(() => {
        if (!menuItems.some((item) => item.path.toLowerCase() === location.pathname.toLowerCase())) {
            navigateTo(defaultPath);
        }
    });


    return (
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

            {/* Use Outlet to render components from Routes, no need to use children */}
            <Outlet />
            {/* <div>{children}</div> */}
        </>
    );
}

export default Layout;
