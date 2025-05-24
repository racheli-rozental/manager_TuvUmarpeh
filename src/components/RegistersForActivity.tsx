// import  { useState } from 'react';
// import { Box, Button, Typography, CircularProgress, List, ListItem, ListItemText, Paper } from '@mui/material';

// const ChildrenList = ({ activityId }: { activityId: string }) => {
//     const [children, setChildren] = useState<any[]>([]);
//     const [showChildren, setShowChildren] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     const fetchChildren = async () => {
//         if (!activityId) return;

//         setLoading(true);
//         setError(null); // מאפס את השגיאות
//         try {
//             const response = await fetch(`https://server-react-tovumarpeh.onrender.com/enrollments/${activityId}`);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             setChildren(data);
//         } catch (error: any) {
//             setError('There was a problem fetching the children list');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleShowChildren = () => {
//         fetchChildren(); // טוען את רשימת הילדים
//         setShowChildren(true); // מציג את רשימת הילדים
//     };

//     return (
//         <Box p={4} display="flex" flexDirection="column" alignItems="center">
//             <Button 
//                 variant="contained" 
//                 color="primary" 
//                 size="large"
//                 onClick={handleShowChildren} 
//                 sx={{ 
//                     marginBottom: 2, 
//                     borderRadius: '8px', 
//                     position: 'fixed', 
//                     top: '90px',  // גבול של 90px מלמעלה
//                     left: '20px',  // ממוקם בצד שמאל של המסך
//                     zIndex: 10, 
//                     width: '250px'  // רוחב הכפתור
//                 }}
//             >
//                 רשימת ילדים רשומים לפעילות זו
//             </Button>

//             {loading && (
//                 <Box display="flex" justifyContent="center" mt={4}>
//                     <CircularProgress />
//                 </Box>
//             )}

//             {error && (
//                 <Box display="flex" justifyContent="center" mt={4}>
//                     <Typography variant="h6" color="error">
//                         {error}
//                     </Typography>
//                 </Box>
//             )}

//             {showChildren && !loading && !error && (
//                 <Paper elevation={3} sx={{ width: '100%', maxWidth: 600, padding: 2, borderRadius: '8px', marginTop: 3 }}>
//                     <List>
//                         {children.length > 0 ? (
//                             children.map((child: any) => (
//                                 <ListItem key={child.idNumber} sx={{ borderBottom: '1px solid #ddd', paddingY: 1 }}>
//                                     <ListItemText
//                                         primary={`${child.firstName} ${child.lastName}`}
//                                     />
//                                 </ListItem>
//                             ))
//                         ) : (
//                             <ListItem>
//                                 <ListItemText primary="No children enrolled." />
//                             </ListItem>
//                         )}
//                     </List>
//                 </Paper>
//             )}
//         </Box>
//     );
// };

// export default ChildrenList;
import { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Paper,
    Avatar,
    Divider
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const ChildrenList = ({ activityId }: { activityId: string }) => {
    const [children, setChildren] = useState<any[]>([]);
    const [showChildren, setShowChildren] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchChildren = async () => {
        if (!activityId) return;

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://server-react-tovumarpeh.onrender.com/enrollments/${activityId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setChildren(data);
        } catch (error: any) {
            setError('אירעה שגיאה בטעינת רשימת הילדים');
        } finally {
            setLoading(false);
        }
    };

    const handleShowChildren = () => {
        fetchChildren();
        setShowChildren(true);
    };

    return (
        <Box
            sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                direction: 'rtl'
            }}
        >
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleShowChildren}
                sx={{
                    mb: 3,
                    borderRadius: 3,
                    fontWeight: 700,
                    boxShadow: 2,
                    px: 4,
                    py: 1.5,
                    fontSize: 18,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5
                }}
                startIcon={<PeopleAltIcon />}
            >
                הצג ילדים רשומים לפעילות
            </Button>

            {loading && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress size={50} color="secondary" />
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
                <Paper
                    elevation={4}
                    sx={{
                        width: '100%',
                        maxWidth: 500,
                        p: 3,
                        borderRadius: 4,
                        mt: 2,
                        bgcolor: '#f9fafc'
                    }}
                >
                    <Typography variant="h6" fontWeight={700} color="primary" mb={2} textAlign="right">
                        ילדים רשומים:
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <List>
                        {children.length > 0 ? (
                            children.map((child: any) => (
                                <ListItem
                                    key={child.idNumber}
                                    sx={{
                                        borderBottom: '1px solid #e0e0e0',
                                        py: 1.5,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2
                                    }}
                                >
                                    <Avatar sx={{ bgcolor: '#1976d2', mr: 1 }}>
                                        {child.firstName?.charAt(0) || '?'}
                                    </Avatar>
                                    <ListItemText
                                        primary={`${child.firstName} ${child.lastName}`}
                                        primaryTypographyProps={{ fontWeight: 500, fontSize: 18, textAlign: 'right' }}
                                    />
                                </ListItem>
                            ))
                        ) : (
                            <ListItem>
                                <ListItemText
                                    primary="לא נמצאו ילדים רשומים."
                                    primaryTypographyProps={{ textAlign: 'right', color: 'gray' }}
                                />
                            </ListItem>
                        )}
                    </List>
                </Paper>
            )}
        </Box>
    );
};

export default ChildrenList;