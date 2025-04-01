import { BrowserRouter, Route, Routes, createBrowserRouter } from "react-router";

import AppLayout from "./components/AppLayout";
import ManagementActivities from "./components/ManagementActivities";
import SystemManagement from "./components/SystemManagement";
import UserManagement from "./components/UserManagement";
import ActivityDetail from "./components/ActivityDetail";
import ManagementRegisters from "./components/managmentRegisters";

export const router = createBrowserRouter([
    {
    
        path: '/', element: <AppLayout />,
        errorElement:<h1>error</h1>,
        children: [
            { path: 'userManagement', element: <UserManagement /> },
            { path: 'managementActivities', element: <ManagementActivities /> },
            { path: 'systemManagement', element: <SystemManagement /> },
            {path:'/activity/:id',element:<ActivityDetail/>},
            {path:'/managementRegisters/:id',element:<ManagementRegisters/>},
            

        ]
    }
])