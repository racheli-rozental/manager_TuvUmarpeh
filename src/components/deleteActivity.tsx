// import axios from 'axios';
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const DeleteActivity = ({ activityId }: { activityId: string }) => {
//     const navigate = useNavigate(); // ודא שאתה מייבא את useNavigate

//     const handleDelete = async () => {
//         if (!activityId) return;

//         try {
//             const response = await axios.delete(`http://localhost:5095/deleteActivity/${activityId}`);
//             console.log('Activity deleted:', response.data);
//             navigate('/managementActivities'); // ניתוב לדף הבית לאחר המחיקה
//         } catch (error) {
//             console.error('There was a problem with the delete operation:', error);
//         }
//     };

//     return (
//         <div>
//             <button onClick={handleDelete}>Delete Activity</button>
//         </div>
//     );
// };

// export default DeleteActivity;
////////////////


import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const DeleteActivity = ({ activityId }: { activityId: string }) => {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleDelete = async () => {
        if (!activityId) return;

        try {
            const response = await axios.delete(`http://localhost:5095/deleteActivity/${activityId}`);
            console.log('Activity deleted:', response.data);
            navigate('/managementActivities');
        } catch (error) {
            console.error('There was a problem with the delete operation:', error);
        }
        setOpenDialog(false);
    };

    const handleDialogClose = () => setOpenDialog(false);
    const handleDialogOpen = () => setOpenDialog(true);

    return (
        <Box p={4}>
            <Button
                 variant="contained"
                 color="primary"
                 size="large"
               
                onClick={handleDialogOpen}
                sx={{
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    textTransform: 'none',
                    padding: '10px 20px',
                    marginRight: 2, // מרווח לימין בין כפתור למחיקת פעילות
                }}
            >
                Delete Activity
            </Button>

            {/* דיאלוג אישור מחיקה */}
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Are you sure you want to delete this activity? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DeleteActivity;
