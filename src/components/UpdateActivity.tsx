import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography, Paper, Divider } from '@mui/material';

const UpdateActivity = ({ activityId }: { activityId: string }) => {
    const [nameActivity, setName] = useState('');
    const [dateActivity, setDateActivity] = useState('');
    const [detailsActivity, setDescription] = useState('');
    const [max, setMaxParticipants] = useState(0);
    const [showFields, setShowFields] = useState(false);

    useEffect(() => {
        const fetchActivity = async () => {
            if (!activityId) return;

            try {
                const response = await fetch(`https://server-react-tovumarpeh.onrender.com/getActivity/${activityId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const activity = await response.json();
                setName(activity.nameActivity);
                setDateActivity(activity.dateActivity);
                setDescription(activity.detailsActivity);
                setMaxParticipants(activity.max);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchActivity();
    }, [activityId]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!activityId || !nameActivity || !dateActivity || !detailsActivity || max <= 0) return;

        const parsedActivityId = Number(activityId);

        const updatedActivity = { 
            IdActivities: parsedActivityId, 
            NameActivity: nameActivity, 
            DateActivity: dateActivity, 
            DetailsActivity: detailsActivity, 
            Max: max 
        };

        try {
            const response = await fetch(`https://server-react-tovumarpeh.onrender.com/updateActivity/${parsedActivityId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedActivity),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setName('');
            setDescription('');
            setDateActivity('');
            setMaxParticipants(0);
            setShowFields(false);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const handleShowFields = () => {
        setShowFields(true);
    };

    return (
        <Box p={4}>
            {!showFields ? (
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleShowFields}
                    sx={{
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        marginRight: 2, // מרווח לימין בין כפתור לעריכה
                    }}
                >
                    Edit Activity
                </Button>
            ) : (
                <Paper elevation={3} sx={{ padding: '20px', borderRadius: '8px' }}>
                    <Typography variant="h5" gutterBottom align="center" color="primary">
                        Update Activity
                    </Typography>
                    <Divider sx={{ marginBottom: '16px' }} />

                    <form onSubmit={handleSubmit}>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <TextField
                                label="Activity Name"
                                variant="outlined"
                                value={nameActivity}
                                onChange={(e) => setName(e.target.value)}
                                margin="normal"
                                required
                                size="small"
                                fullWidth
                            />
                            <TextField
                                label="Activity Date"
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
                            <TextField
                                label="Activity Description"
                                variant="outlined"
                                value={detailsActivity}
                                onChange={(e) => setDescription(e.target.value)}
                                margin="normal"
                                required
                                size="small"
                                fullWidth
                                multiline
                                rows={3}
                            />
                            <TextField
                                label="Max Participants"
                                variant="outlined"
                                type="number"
                                value={max}
                                onChange={(e) => setMaxParticipants(Number(e.target.value))}
                                margin="normal"
                                required
                                size="small"
                                fullWidth
                            />
                        </Box>

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
                                    marginRight: 2, // מרווח לימין
                                }}
                            >
                                Update Activity
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => setShowFields(false)}
                                size="large"
                                sx={{
                                    borderRadius: '8px',
                                    padding: '10px 20px',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </form>
                </Paper>
            )}
        </Box>
    );
};

export default UpdateActivity;
