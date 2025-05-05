// import  { useState, ChangeEvent, FormEvent } from 'react';
// import { Box, Button, Modal, Snackbar, TextField, Grid, Fab, Alert } from '@mui/material';
// import axios from 'axios';

// // סטיילים
// const FabStyle = {
//     position: 'fixed',
//     bottom: 20,
//     right: 20,
//     backgroundColor: '#1976d2',
//     color: 'white',
// };

// const ModalStyle = {
//     position: 'absolute' as 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//     width: '80%',
//     maxWidth: 600
// };

// const ButtonStyle = {
//     backgroundColor: '#1976d2',
//     color: 'white',
//     marginTop: 2,
//     padding: '10px 20px',
// };

// const DownloadButtonStyle = {
//     backgroundColor: '#1976d2',
//     color: 'white',
//     margin: '5px',
//     padding: '10px 15px',
// };

// interface FormData {
//     IdNumber: string;
//     FirstName: string;
//     LastName: string;
//     Address: string;
//     Phone: string;
//     City: string;
//     Email: string;
//     BirthDate: string;
//     files: File[]; // הגדר את סוג הקבצים
// }

// const RegisterComponent = () => {
//     const [formData, setFormData] = useState<FormData>({
//         IdNumber: '',
//         FirstName: '',
//         LastName: '',
//         Address: '',
//         Phone: '',
//         City: '',
//         Email: '',
//         BirthDate: '',
//         files: []
//     });
//     const [alert, setAlert] = useState(false);
//     const [open, setOpen] = useState(false);

//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleFileChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
//         const file = e.target.files ? e.target.files[0] : null;
//         const filesArray = [...formData.files];
//         if (file) {
//             filesArray[index] = file; // עדכון הקובץ במיקום המתאים
//             setFormData({ ...formData, files: filesArray });
//         }
//     };

//     const downloadFile = (fileName: string) => {
//         axios.get(`https://server-react-tovumarpeh.onrender.com/files/${fileName}`, { responseType: 'blob' })
//             .then(response => {
//                 const url = window.URL.createObjectURL(new Blob([response.data]));
//                 const a = document.createElement('a');
//                 a.href = url;
//                 a.download = fileName;
//                 document.body.appendChild(a);
//                 a.click();
//                 a.remove();
//             })
//             .catch(error => {
//                 console.error('Error downloading the file', error);
//             });
//     };

//     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const data = new FormData();
//         formData.files.forEach(file => {
//             if (file) {
//                 data.append('files', file); // ודא שהמפתח תואם למה שהשרת מצפה
//             }
//         });

//         axios.post('https://server-angular-tovumarpeh.onrender.com/users', data)
//             .then((response) => {
//                 console.log(response)
//                 setAlert(true); // הצגת הודעת הצלחה
//                 handleClose(); // סגירת המודל
//                 setTimeout(() => setAlert(false), 3000); // הסרת ההודעה לאחר 3 שניות
//             })
//             .catch(error => {
//                 console.error('Error creating user:', error);
//             });
//     };

//     return (
//         <Box sx={{ padding: '20px', textAlign: 'center' }}>
//             {/* כפתור לפתיחת המודל */}
//             <Fab sx={FabStyle} variant="extended" size="large" onClick={handleOpen}>
//                 הוספת משתמש למערכת
//             </Fab>

//             {/* מודל עבור הטופס */}
//             <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
//                 <Box sx={ModalStyle}>
//                     <h2 id="parent-modal-title">הכנס את פרטיך:</h2>
//                     <form onSubmit={handleSubmit}>
//                         {/* השתמש ב-Grid כדי להציג את השדות במספר עמודות */}
//                         <Grid container spacing={2}>
//                             <Grid item xs={12} sm={4}>
//                                 <TextField
//                                     name="IdNumber"
//                                     label="מספר זהות"
//                                     fullWidth
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={4}>
//                                 <TextField
//                                     name="FirstName"
//                                     label="שם פרטי"
//                                     fullWidth
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={4}>
//                                 <TextField
//                                     name="LastName"
//                                     label="שם משפחה"
//                                     fullWidth
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={4}>
//                                 <TextField
//                                     name="Address"
//                                     label="כתובת"
//                                     fullWidth
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={4}>
//                                 <TextField
//                                     name="Phone"
//                                     label="טלפון"
//                                     fullWidth
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={4}>
//                                 <TextField
//                                     name="City"
//                                     label="עיר"
//                                     fullWidth
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={4}>
//                                 <TextField
//                                     name="Email"
//                                     label="אימייל"
//                                     type="email"
//                                     fullWidth
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </Grid>
//                             <Grid item xs={12} sm={4}>
//                                 <TextField
//                                     name="BirthDate"
//                                     label="תאריך לידה"
//                                     type="date"
//                                     fullWidth
//                                     onChange={handleChange}
//                                     InputLabelProps={{ shrink: true }}
//                                     required
//                                 />
//                             </Grid>
//                             {[...Array(4)].map((_, index) => (
//                                 <Grid item xs={12} sm={4} key={index}>
//                                     <input
//                                         type="file"
//                                         onChange={(e) => handleFileChange(e, index)}
//                                     />
//                                 </Grid>
//                             ))}
//                         </Grid>

//                         <div>
//                             <Button sx={ButtonStyle} type="submit" fullWidth>
//                                 שלח
//                             </Button>
//                         </div>
//                             {/* כפתורים להורדה */}
//             <Box sx={{ marginTop: '20px' }}>
//                 <Button sx={DownloadButtonStyle} onClick={() => downloadFile('Medications.pdf')}>הורד קובץ 1</Button>
//                 <Button sx={DownloadButtonStyle} onClick={() => downloadFile('agreement.pdf')}>הורד קובץ 2</Button>
//                 <Button sx={DownloadButtonStyle} onClick={() => downloadFile('personal.pdf')}>הורד קובץ 3</Button>
//             </Box>
//                     </form>
//                 </Box>
//             </Modal>

        

//             {/* הודעת הצלחה */}
//             <Snackbar open={alert} autoHideDuration={3000} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
//                 <Alert severity="success" sx={{ width: '100%' }}>
//                     נרשמת בהצלחה!
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };

// export default RegisterComponent;
import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterComponent = () => {
    const [formData, setFormData] = useState({
        IdNumber: '',
        FirstName: '',
        LastName: '',
        Address: '',
        Phone: '',
        City: '',
        Email: '',
        BirthDate: '',
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFilesChange = (e:any) => {
        setSelectedFiles(Array.from(e.target.files));
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key as keyof typeof formData]);
        }
        selectedFiles.forEach(file => {
            formDataToSend.append('files', file);
        });

        try {
            const response = await axios.post('/users', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('User created successfully:', response.data);
            navigate('/'); // ניווט לעמוד הבית
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="IdNumber" placeholder="ID Number" onChange={handleChange} required />
            <input type="text" name="FirstName" placeholder="First Name" onChange={handleChange} required />
            <input type="text" name="LastName" placeholder="Last Name" onChange={handleChange} required />
            <input type="text" name="Address" placeholder="Address" onChange={handleChange} required />
            <input type="text" name="Phone" placeholder="Phone" onChange={handleChange} required />
            <input type="text" name="City" placeholder="City" onChange={handleChange} required />
            <input type="email" name="Email" placeholder="Email" onChange={handleChange} required />
            <input type="date" name="BirthDate" onChange={handleChange} required />
            <input type="file" name="files" onChange={handleFilesChange} multiple required />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterComponent;
