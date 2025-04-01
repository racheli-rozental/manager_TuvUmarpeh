// import React, { useState } from 'react';

// const AddActivity = () => {
//     const [nameActivity, setName] = useState('');
//     const [dateActivity, setDateActivity] = useState('');
//     const [detailsActivity, setDescription] = useState('');
//     const [max, setMaxParticipants] = useState(0); // שדה חדש למכסה
//     const [showFields, setShowFields] = useState(false); // מצב להציג שדות

//     const handleSubmit = async (event:any) => {
//         event.preventDefault();
//         console.log(nameActivity, dateActivity, detailsActivity, max);
//         if (!nameActivity || !dateActivity || !detailsActivity || max <= 0) return;

//         const newActivity = { nameActivity, dateActivity, detailsActivity, max };
//         console.log(newActivity);

//         try {
//             const response = await fetch('http://localhost:5095/addActivity', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(newActivity),
//             });
//             console.log(response);

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             // לנקות את השדות לאחר ההצלחה
//             setName('');
//             setDescription('');
//             setDateActivity('');
//             setMaxParticipants(0); // לנקות את שדה המכסה
//             setShowFields(false); // החבא את השדות לאחר ההצלחה
//         } catch (error) {
//             console.error('There was a problem with the fetch operation:', error);
//         }
//     };

//     return (
//         <div>
//             {!showFields && (
//                 <button onClick={() => setShowFields(true)}>Add Activity</button>
//             )}

//             {showFields && (
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type="text"
//                         value={nameActivity}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="Activity Name"
//                         required
//                     />
//                     <input
//                         type="date"
//                         value={dateActivity}
//                         onChange={(e) => setDateActivity(e.target.value)}
//                         placeholder="Activity Date"
//                         required
//                     />
//                     <input
//                         type="text"
//                         value={detailsActivity}
//                         onChange={(e) => setDescription(e.target.value)}
//                         placeholder="Activity Description"
//                         required
//                     />
//                     <input
//                         type="number"
//                         value={max}
//                         onChange={(e) => setMaxParticipants(Number(e.target.value))}
//                         placeholder="Max Participants"
//                         min="1"
//                         required
//                     />
//                     <button type="submit">Add Activity</button>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default AddActivity;

import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper, Divider, Grid } from '@mui/material';

const AddActivity = () => {
    const [nameActivity, setName] = useState('');
    const [dateActivity, setDateActivity] = useState('');
    const [detailsActivity, setDescription] = useState('');
    const [max, setMaxParticipants] = useState(0);
    const [showFields, setShowFields] = useState(false);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!nameActivity || !dateActivity || !detailsActivity || max <= 0) return;

        const newActivity = { nameActivity, dateActivity, detailsActivity, max };

        try {
            const response = await fetch('http://localhost:5095/addActivity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newActivity),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // לנקות את השדות לאחר ההצלחה
            setName('');
            setDescription('');
            setDateActivity('');
            setMaxParticipants(0);
            setShowFields(false); // החבא את השדות לאחר ההצלחה
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <Box p={4}>
            {!showFields ? (
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => setShowFields(true)}
                    sx={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                >
                    Add Activity
                </Button>
            ) : (
                <Paper elevation={3} sx={{ padding: '20px', borderRadius: '8px' }}>
                    <Typography variant="h5" gutterBottom align="center" color="primary">
                        Add a New Activity
                    </Typography>
                    <Divider sx={{ marginBottom: '16px' }} />

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="שם הפעילות"
                                    variant="outlined"
                                    value={nameActivity}
                                    onChange={(e) => setName(e.target.value)}
                                    margin="normal"
                                    required
                                    size="small"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="תאריך הפעילות"
                                    variant="outlined"
                                    type="date"
                                    value={dateActivity}
                                    onChange={(e) => setDateActivity(e.target.value)}
                                    margin="normal"
                                    required
                                    size="small"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            {/* שדות שממוקמים בשורה אחת */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="פרטי הפעילות"
                                    variant="outlined"
                                    value={detailsActivity}
                                    onChange={(e) => setDescription(e.target.value)}
                                    margin="normal"
                                    required
                                    size="small"
                                    fullWidth
                                    // multiline
                                    rows={2}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="מקסימום משתתפים"
                                    variant="outlined"
                                    type="number"
                                    value={max}
                                    onChange={(e) => setMaxParticipants(Number(e.target.value))}
                                    margin="normal"
                                    required
                                    size="small"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <Box display="flex" justifyContent="center" mt={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                size="large"
                                sx={{
                                    borderRadius: '8px',
                                    padding: '10px 20px',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                הוספת פעילות
                            </Button>
                        </Box>
                    </form>
                </Paper>
            )}
        </Box>
    );
};

export default AddActivity;
