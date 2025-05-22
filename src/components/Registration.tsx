
import { Box, Button, Modal, Snackbar, TextField, Fab, Alert, Grid } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { FabStyle, Modalstyle, butttonStyle } from './styleType';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
const UserRegistration = () => {
    const [formData, setFormData] = useState({
        idNumber: '',
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        city: '',
        email: '',
        birthDate: '',
        files: []
    });
    const [alert] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleFileChange = (e: any) => {
        setFormData({
            ...formData,
            files: e.target.files
        });
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            if (key === 'files') {
                for (let i = 0; i < formData.files.length; i++) {
                    formDataToSend.append('files', formData.files[i]);
                }
            } else {
                formDataToSend.append(key, formData[key as keyof typeof formData] as string);
            }
        }

        try {
            const response = await axios.post('https://server-angular-tovumarpeh.onrender.com/users', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('User registered successfully:', response.data);
        } catch (error: any) {
            console.error('Error registering user:', error.response.data);
        }
    };
    const downloadFile = async (fileName: string) => {
        try {
            const response = await fetch(`https://server-react-tovumarpeh.onrender.com/files/${fileName}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading the file', error);
        }
    };
    return (<>
        <Box sx={{ padding: '20px', textAlign: 'center' }}>
            {/* כפתור לפתיחת המודל */}
            <Fab
                sx={{ ...FabStyle, bgcolor: 'transparent', marginTop: 10 }}
                variant="extended"
                size="large"
                onClick={handleOpen}
            >
                הוספת משתמש למערכת
            </Fab>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    // רקע כהה יותר
                    backdropFilter: 'blur(2px)',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                }}
            >
                <Box
                    sx={{
                        ...Modalstyle,
                        padding: '32px 24px',
                        textAlign: 'center',
                        maxWidth: 600,
                        margin: 'auto',
                        mt: 8,
                        bgcolor: '#fff',
                        border: '3px solid #1976d2',
                        boxShadow: '0 8px 32px rgba(25, 118, 210, 0.25), 0 2px 8px rgba(0,0,0,0.18)',
                        borderRadius: 2,
                        zIndex: 1301,
                        direction: 'rtl',
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {/* ...השדות שלך... */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="idNumber"
                                    label="מספר זהות"
                                    fullWidth
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="firstName"
                                    label="שם פרטי"
                                    fullWidth
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="lastName"
                                    label="שם משפחה"
                                    fullWidth
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="address"
                                    label="כתובת"
                                    fullWidth
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="phone"
                                    label="טלפון"
                                    fullWidth
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="city"
                                    label="עיר"
                                    fullWidth
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="email"
                                    label="אימייל"
                                    type="email"
                                    fullWidth
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="birthDate"
                                    label="תאריך לידה"
                                    type="date"
                                    fullWidth
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <label htmlFor="upload-files">
                                    <input
                                        id="upload-files"
                                        type="file"
                                        name="files"
                                        multiple
                                        required
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    <Button
                                        variant="contained"
                                        component="span"
                                        startIcon={<UploadFileIcon />}
                                        sx={{ ...butttonStyle }}
                                    >
                                        העלה קבצים
                                    </Button>
                                </label>
                                <Box sx={{ marginTop: '20px', width: '100%' }}>
                                    <Button
                                        sx={{ ...butttonStyle, margin: 1, marginLeft: 5 }}
                                        onClick={() => downloadFile('agreement.pdf')}
                                        startIcon={<DownloadIcon />}
                                    >
                                        הורד טופס הסכמות
                                    </Button>
                                    <Button
                                        sx={{ ...butttonStyle, marginRight: 3 }}
                                        onClick={() => downloadFile('Medications.pdf')}
                                        startIcon={<DownloadIcon />}
                                    >
                                        הורד טופס תרופות
                                    </Button>
                                    <Button
                                        sx={{ ...butttonStyle, marginRight: 1 }}
                                        onClick={() => downloadFile('personal.pdf')}
                                        startIcon={<DownloadIcon />}
                                    >
                                        הורד טופס פרטים
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ ...butttonStyle, marginTop: 3, padding: '10px 30px' }}
                        >
                            הרשמה
                        </Button>
                    </form>
                    <Snackbar open={alert} autoHideDuration={3000} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                        <Alert severity="success" sx={{ width: '100%' }}>
                            נרשמת בהצלחה!
                        </Alert>
                    </Snackbar>
                </Box>
            </Modal>
        </Box>
    </>
    );
};
export default UserRegistration;

