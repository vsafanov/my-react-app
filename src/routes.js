
import Index from "./Components/admin/Index"
import DealsList from "./Components/admin/DealsList"
import Logout from "./Components/admin/Logout"


export const menuItems = [
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

export const adminRoutes = [
    {
        element: <Index />,
        path: 'Index',
    },
    {
        element: <DealsList />,
        path: 'DealsList',
    },
    // {
    //     element: <Logout />,
    //     path: 'ErrorLog'
    // },
    // {
    //     element: <Logout />,
    //     path: 'TotalUsage'
    // },
    // {
    //     element: <Logout />,
    //     path: 'UserStatistics'
    // },
    // {
    //     element: <Logout />,
    //     path: 'Users'
    // },
    // {
    //     element: <Logout />,
    //     path: 'EmailBody'
    // },
    {
        element: <Logout />,
        path: 'Logout'
    },

]