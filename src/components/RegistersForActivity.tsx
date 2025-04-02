import  { useState } from 'react';
import { Box, Button, Typography, CircularProgress, List, ListItem, ListItemText, Paper } from '@mui/material';

const ChildrenList = ({ activityId }: { activityId: string }) => {
    const [children, setChildren] = useState<any[]>([]);
    const [showChildren, setShowChildren] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchChildren = async () => {
        if (!activityId) return;

        setLoading(true);
        setError(null); // מאפס את השגיאות
        try {
            const response = await fetch(`http://localhost:5095/enrollments/${activityId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setChildren(data);
        } catch (error: any) {
            setError('There was a problem fetching the children list');
        } finally {
            setLoading(false);
        }
    };

    const handleShowChildren = () => {
        fetchChildren(); // טוען את רשימת הילדים
        setShowChildren(true); // מציג את רשימת הילדים
    };

    return (
        <Box p={4} display="flex" flexDirection="column" alignItems="center">
            <Button 
                variant="contained" 
                color="primary" 
                size="large"
                onClick={handleShowChildren} 
                sx={{ 
                    marginBottom: 2, 
                    borderRadius: '8px', 
                    position: 'fixed', 
                    top: '90px',  // גבול של 90px מלמעלה
                    left: '20px',  // ממוקם בצד שמאל של המסך
                    zIndex: 10, 
                    width: '250px'  // רוחב הכפתור
                }}
            >
                רשימת ילדים רשומים לפעילות זו
            </Button>

            {loading && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <Typography variant="h6" color="error">
                        {error}
                    </Typography>
                </Box>
            )}

            {showChildren && !loading && !error && (
                <Paper elevation={3} sx={{ width: '100%', maxWidth: 600, padding: 2, borderRadius: '8px', marginTop: 3 }}>
                    <List>
                        {children.length > 0 ? (
                            children.map((child: any) => (
                                <ListItem key={child.idNumber} sx={{ borderBottom: '1px solid #ddd', paddingY: 1 }}>
                                    <ListItemText
                                        primary={`${child.firstName} ${child.lastName}`}
                                    />
                                </ListItem>
                            ))
                        ) : (
                            <ListItem>
                                <ListItemText primary="No children enrolled." />
                            </ListItem>
                        )}
                    </List>
                </Paper>
            )}
        </Box>
    );
};

export default ChildrenList;
