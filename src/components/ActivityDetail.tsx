import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeleteActivity from './deleteActivity';
import UpdateActivity from './UpdateActivity';
import { Box, Button, Typography, Paper, CircularProgress, Divider } from '@mui/material';
import DeleteUserForActivity from './DeleteUserForActivity';
const ActivityDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await fetch(`http://localhost:5095/getActivity/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setActivity(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchActivity();
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <Typography variant="h6" color="error">
                    Error: {error}
                </Typography>
            </Box>
        );
    }

    if (!activity) {
        return (
            <Box display="flex" justifyContent="center" mt={4}>
                <Typography variant="h6" color="textSecondary">
                    No activity found.
                </Typography>
            </Box>
        );
    }
 
   const Registers=()=>{
   navigate(`/managementRegisters/${id}`)
   };

    return (
        <Box p={4}>
            {/* כרטיס עם פרטי הפעילות */}
            <Paper 
                elevation={3} 
                sx={{ 
                    padding: '20px', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center' // ממרכז את התוכן בתוך הכרטיס
                }}
            >
                {/* כותרת */}
                <Typography 
                    variant="h4" 
                    component="h2" 
                    color="primary" 
                    fontWeight={600} 
                    gutterBottom
                    sx={{ textAlign: 'center' }} // ממרכז את הכותרת
                >
                    {activity.nameActivity}
                </Typography>

                {/* תאריך */}
                <Typography 
                    variant="h6" 
                    color="textSecondary" 
                    gutterBottom
                    sx={{ textAlign: 'center' }} // ממרכז את התאריך
                >
                    <strong>תאריך: </strong>{activity.dateActivity}
                </Typography>

                {/* תיאור הפעילות */}
                <Typography 
                    variant="body1" 
                    paragraph
                    sx={{ textAlign: 'center' }} // ממרכז את התיאור
                >
                    <strong>פרטים:</strong> {activity.detailsActivity}
                </Typography>

                {/* מקסימום משתתפים */}
                <Typography 
                    variant="body1" 
                    paragraph
                    sx={{ textAlign: 'center' }} // ממרכז את מספר המשתתפים
                >
                    <strong>כמות משתתפים מקסימלית:</strong> {activity.max}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* כפתורים */}
                <Box display="flex" justifyContent="center" gap={2}>
                    {id && <UpdateActivity activityId={id} />}
                    {id && <DeleteActivity activityId={id} />}
                       <Button 
                                    variant="contained" 
                                    color="primary" 
                                    size="large"
                                    onClick={Registers}
                                     
                                    sx={{ margin: 4, borderRadius: '8px' }}
                                >
                                 ילדים רשומים לפעילות זו
                                </Button>
                                <DeleteUserForActivity/>
                    {/* {id && <ChildrenList activityId={id}/>} */}
                </Box>
            </Paper>
        </Box>
    );
};

export default ActivityDetails;

