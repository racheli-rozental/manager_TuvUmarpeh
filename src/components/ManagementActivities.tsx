import { Container, Box, Paper } from '@mui/material';
import GetActivity from './GetActivities';
import AddActivity from './AddActivity';

const ManagementActivities = () => {
  return (
    <Container maxWidth="lg">

      {/* רכיב GetActivity */}
      <Box mb={4}>
        <Paper elevation={3} style={{ padding: '16px', borderRadius: '8px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)' }}>
          <GetActivity />
        </Paper>
      </Box>

      {/* רכיב AddActivity */}
      <Box>
        <Paper elevation={3} style={{ padding: '16px', borderRadius: '8px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)' }}>
          <AddActivity />
        </Paper>
      </Box>
    </Container>
  );
};

export default ManagementActivities;



