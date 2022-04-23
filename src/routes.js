
import Index from "./Components/admin/Index"
import DealsList from "./Components/admin/DealsList"

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
            Component: <Index/>,
            path: 'Index',
        },
        {
            Component: <DealsList/>,
            path: 'DealsList',
        },
        // {
        //     component: 'ErrorLog',
        //     path: 'ErrorLog'
        // },
        // {
        //     component: 'TotalUsage',
        //     path: 'TotalUsage'
        // },
        // {
        //     component: 'UserStatistics',
        //     path: 'UserStatistics'
        // },
        // {
        //     component: 'Users',
        //     path: 'Users'
        // },
        // {
        //     component: 'EmailBody',
        //     path: 'EmailBody'
        // },
        // {
        //     component: 'Logout',
        //     path: 'Logout'
        // },

     ]