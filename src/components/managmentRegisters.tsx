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
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: '#f3f6fa',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                py: 6,
                direction: 'rtl'
            }}
        >
            <Paper
                elevation={8}
                sx={{
                    p: 5,
                    minWidth: 370,
                    maxWidth: 700,
                    width: '100%',
                    borderRadius: 5,
                    bgcolor: '#fff',
                    boxShadow: '0 8px 32px rgba(25, 118, 210, 0.13), 0 2px 8px rgba(0,0,0,0.10)'
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        color: '#1976d2',
                        mb: 2,
                        textAlign: 'right',
                        letterSpacing: 1
                    }}
                >
                    ניהול רישומים לפעילות
                </Typography>
                <Divider sx={{ mb: 4 }} />
                <Box sx={{ mb: 4 }}>
                    <ChildrenList activityId={id || ''} />
                </Box>
                <Divider sx={{ mb: 4 }} />
                <Box sx={{ mb: 4 }}>
                    <UserFiles activityId={id || ''} />
                </Box>
                <Divider sx={{ mb: 4 }} />
                <Box>
                    <DeleteUserForActivity />
                </Box>
            </Paper>
        </Box>
    );
};

export default ManagementRegisters;