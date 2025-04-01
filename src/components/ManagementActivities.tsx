// import React from 'react';
// import { Container, Typography, Box } from '@mui/material';
// import GetActivity from './GetActivities';
// import AddActivity from './AddActivity';

// const ManagementActivities = () => {
//   return (
//     <Container maxWidth="lg">
//       <Box my={4}>
//         <Typography variant="h3" component="h1" gutterBottom align="center">
//           Management Activities
//         </Typography>
//       </Box>
      
//       <GetActivity />
//       <AddActivity />
//     </Container>
//   );
// };

// export default ManagementActivities;
//////////////////
import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import GetActivity from './GetActivities';
import AddActivity from './AddActivity';

const ManagementActivities = () => {
  return (
    <Container maxWidth="lg">
      {/* כותרת */}
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom align="center" style={{ fontWeight: 700, color: '#3f51b5' }}>
          Management Activities
        </Typography>
      </Box>

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



