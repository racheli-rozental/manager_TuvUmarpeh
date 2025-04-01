//import * as React from 'react';
import Avatar from '@mui/material/Avatar';
//import Stack from '@mui/material/Stack';
//import { deepOrange, pink } from '@mui/material/colors';
import { useContext } from 'react';
//import { User } from './user';
import { UserContext } from './context';

const UserNavigate = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("UserContext must be used within a UserProvider");
    }
    const user = context.state;
    return (
        <Avatar
            sx={{
                position: 'fixed',
                top: 19,
                right: 10,
                bgcolor: '#f024f6',
                color: 'rgb(255, 255, 255)',
                border: '2px solid #f024f6',
                zIndex: 3,
               margin:0, 
            }}
            alt="Remy Sharp"
            src="/broken-image.jpg" >
            {user.firstName?.charAt(0).toLowerCase()}
            {user.lastName?.charAt(0).toLowerCase()}
        </Avatar>
    );
}
export default UserNavigate