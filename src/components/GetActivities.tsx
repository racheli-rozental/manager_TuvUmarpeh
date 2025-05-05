import  { useState } from 'react';
import { Button, Typography, Box, Paper, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GetActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://server-react-tovumarpeh.onrender.com/activity'); // החלף ב-URL הנכון
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setActivities(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleActivityClick = (id: number) => {
    navigate(`/activity/${id}`);
  };

  return (
    <Box p={4}>
      {/* כפתור להורדת הפעילויות */}
      <Box mb={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={fetchActivities}
          sx={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', padding: '10px 20px' }}
        >
          Get Activities
        </Button>
      </Box>

      {/* הודעת טעינה */}
      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {/* הודעת שגיאה */}
      {error && (
        <Box display="flex" justifyContent="center" mb={4}>
          <Typography variant="h6" color="error">
            Error: {error}
          </Typography>
        </Box>
      )}

      {/* רשימת הפעילויות */}
      <Box>
        {activities.length > 0 ? (
          activities.map((activity: any) => (
            <Paper
              key={activity.idActivities}
              elevation={3}
              sx={{
                padding: '16px',
                marginBottom: '16px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                },
              }}
              onClick={() => handleActivityClick(activity.idActivities)}
            >
              <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
                {activity.nameActivity}
              </Typography>
            </Paper>
          ))
        ) : (
          <Box display="flex" justifyContent="center" mt={4}>
            <Typography variant="h6" color="textSecondary">
              No activities available.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default GetActivity;

