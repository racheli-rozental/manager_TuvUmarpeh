// import { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const DeleteComponent = () => {
//     const { id } = useParams();
//     const [identityNumber, setIdentityNumber] = useState('');
//     const [isDeleted, setIsDeleted] = useState(false);
//     const [error, setError] = useState(null);
//     const [showDelete, setShowDelete] = useState(false);

//     const handleDelete = async () => {
//         try {
//             await axios.delete(`https://server-react-tovumarpeh.onrender.com/activity/${id}/children/${identityNumber}`, {
//                 data: { identityNumber }
//             });
//             setIsDeleted(true);
//         } catch (err: any) {
//             setError(err.message);
//         }
//     };

//     if (isDeleted) {
//         return <div>Item deleted successfully!</div>;
//     }

//     return (
//         <div>
//             {!showDelete ? (
//                 <button onClick={() => setShowDelete(true)}>הצג מחיקת ילד</button>
//             ) : (
//                 <>
//                     <input
//                         type="text"
//                         value={identityNumber}
//                         onChange={(e) => setIdentityNumber(e.target.value)}
//                         placeholder="Enter Identity Number"
//                     />
//                     <button onClick={handleDelete}>Delete Item</button>
//                     {error && <div>Error: {error}</div>}
//                 </>
//             )}
//         </div>
//     );
// };

// export default DeleteComponent;

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, TextField, Typography, Alert, Paper } from '@mui/material';

const DeleteComponent = () => {
    const { id } = useParams();
    const [identityNumber, setIdentityNumber] = useState('');
    const [isDeleted, setIsDeleted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showDelete, setShowDelete] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.delete(`https://server-react-tovumarpeh.onrender.com/activity/${id}/children/${identityNumber}`, {
                data: { identityNumber }
            });
            setIsDeleted(true);
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (isDeleted) {
        return (
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Alert severity="success" sx={{ width: 300 }}>
                    הילד נמחק בהצלחה!
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ p: 4, minWidth: 320, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                    מחיקת ילד מפעילות
                </Typography>
                {!showDelete ? (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => setShowDelete(true)}
                        sx={{ mt: 2 }}
                    >
                        הצג מחיקת ילד
                    </Button>
                ) : (
                    <>
                        <TextField
                            label="מספר זהות של הילד"
                            value={identityNumber}
                            onChange={(e) => setIdentityNumber(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDelete}
                            disabled={!identityNumber}
                            sx={{ mb: 2 }}
                        >
                            מחק ילד
                        </Button>
                        {error && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {error}
                            </Alert>
                        )}
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default DeleteComponent;