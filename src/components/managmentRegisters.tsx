// import DeleteUserForActivity from "./DeleteUserForActivity";
// import UserFiles from "./FilesForRegisters";
// import ChildrenList from "./RegistersForActivity"
// import { useParams } from 'react-router-dom';
// const ManagementRegisters=()=>{
//     const { id } = useParams(); 
// return(
//     <>
//     <ChildrenList activityId={id || ''}/>
//     <UserFiles activityId={id||''}/>
//     <DeleteUserForActivity/>
//     </>
// )
// }
// export default ManagementRegisters


import DeleteUserForActivity from "./DeleteUserForActivity";
import UserFiles from "./FilesForRegisters";
import ChildrenList from "./RegistersForActivity";
import { useParams } from 'react-router-dom';
import { Box, Paper, Typography, Divider } from '@mui/material';

const ManagementRegisters = () => {
    const { id } = useParams(); 
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <Paper elevation={4} sx={{ p: 4, minWidth: 350, maxWidth: 600, width: '100%' }}>
                <Typography variant="h5" align="center" gutterBottom>
                    ניהול רישומים לפעילות
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <ChildrenList activityId={id || ''} />
                <Divider sx={{ my: 3 }} />
                <UserFiles activityId={id || ''} />
                <Divider sx={{ my: 3 }} />
                <DeleteUserForActivity />
            </Paper>
        </Box>
    );
};

export default ManagementRegisters;