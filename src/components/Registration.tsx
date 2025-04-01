// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import { ChangeEvent, FormEvent, useContext, useState } from 'react';
// import { Alert, Fab, Snackbar, TextField } from '@mui/material';
// import { User } from './user';
// import axios from 'axios';
// import { butttonStyle, FabStyle, Modalstyle } from './styleType';
// const Registration = () => {
//     const [open, setOpen] = useState(false);
//     const [formData, setFormData] = useState<User>({
//         idNumber: '',
//         firstName: '',
//         lastName: '',
//         email: '',
//         address: '',
//         phone: '',
//         city: '',
//         birthDate: '',
//     });
//     const [alert, setAlert] = useState(false);

//     const handleOpen = () => {
//         setOpen(true);
//     };
//     const handleClose = () => { setOpen(false); };



//     const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = event.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         const { idNumber,firstName, lastName, address, email, phone,city,birthDate } = formData;

//         if (idNumber&&firstName && email && phone && lastName  && address&&birthDate) {
//             try {
//                 const res = await axios.post('http://localhost:5095/users', {
//                     idNumber: formData.idNumber,
//                     email: formData.email,
//                     // password: formData.password,
//                     firstName: formData.firstName,
//                     lastName: formData.lastName,
//                     address: formData.address,
//                     phone: formData.phone,
//                     city: formData.city,
//                     birthDate: formData.birthDate,


//                 });
//                 setAlert(true);
//                 handleClose();
//                 setTimeout(() => setAlert(false), 3000);
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         else {
//             console.error("Some fields are missing");
//         }
//     };
//     return <>
//         <Fab
//             sx={{ ...FabStyle, bgcolor: 'transparent', marginTop: 9 }}
//             variant="extended"
//             size="large"
//             onClick={handleOpen}>הוספת ילד למערכת
//         </Fab>
//         <Modal
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//         >
//             <Box sx={{ ...Modalstyle, width: "auto" }}>
//                 <h2 id="parent-modal-title">
//                     To login please enter your details:
//                 </h2>
//                 <form onSubmit={handleSubmit}>
//                 <TextField
//                         helperText="Please enter id number"
//                         //id="demo-helper-text-misaligned"
//                         name="idNumber"
//                         label="idNumber"
//                         margin='normal'
//                         onChange={handleChange}
//                     />
//                     <TextField
//                         helperText="Please enter your private name"
//                         //id="demo-helper-text-misaligned"
//                         name="firstName"
//                         label="private name"
//                         margin='normal'
//                         onChange={handleChange}
//                     />
//                     <TextField
//                         helperText="Please enter your family name"
//                         // id="demo-helper-text-misaligned"
//                         name="lastName"
//                         label="family name"
//                         margin='normal'
//                         onChange={handleChange}
//                     />
//                     <TextField
//                         helperText="Please enter birth date"
//                         // id="demo-helper-text-misaligned"
//                         name="birthDate"
//                         label="birthdate"
//                         type='date'
//                         margin='normal'
//                         onChange={handleChange}
//                     />
//                     <TextField
//                         helperText="Please enter your Telephone number"
//                         // id="demo-helper-text-misaligned"
//                         name="phone"
//                         label="Telephone"
//                         margin='normal'
//                         onChange={handleChange}
//                     />
//                     <TextField
//                         helperText="Please enter your email"
//                         className="demo-helper-text-misaligned"
//                         name="email"
//                         label="email"
//                         type='email'
//                         margin='normal'
//                         onChange={handleChange}
//                     />
//                     <TextField
//                         helperText="Please enter your address"
//                         className="demo-helper-text-misaligned"
//                         name="address"
//                         label="address"
//                         margin='normal'
//                         onChange={handleChange}
//                     />
//                         <TextField
//                         helperText="Please enter your city"
//                         className="demo-helper-text-misaligned"
//                         name="city"
//                         label="city"
//                         margin='normal'
//                         onChange={handleChange}
//                     />
//                     <div></div>
//                     <Button type="submit" variant="contained"
//                         sx={butttonStyle} >
//                         Send
//                     </Button>
//                 </form>
//             </Box>
//         </Modal>
//         <Snackbar
//             open={alert}
//             autoHideDuration={3000}
//             anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//         >
//             <Alert
//                 severity="success"
//                 sx={{ width: '100%' }}
//             >
//                 You have successfully registered!
//             </Alert>
//         </Snackbar>
//     </>
// }
// export default Registration

// import React, { useState } from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';
// import axios from 'axios';

// interface FormData {
//   IdNumber: string;
//   FirstName: string;
//   LastName: string;
//   Address: string;
//   Phone: string;
//   City: string;
//   Email: string;
//   BirthDate: string;
//   files: File[]; // הגדר את סוג הקבצים
// }

// const RegisterComponent = () => {
//   const [formData, setFormData] = useState({
//     IdNumber: '',
//     FirstName: '',
//     LastName: '',
//     Address: '',
//     Phone: '',
//     City: '',
//     Email: '',
//     BirthDate: '',
//     files: []
//   });

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e: any, index: any) => {
//     const file = e.target.files[0];
//     const filesArray = [...formData.files];

//     if (file) {
//       filesArray[index] = file; // עדכן את הקובץ במיקום המתאים
//       setFormData({ ...formData, files: filesArray });
//     } else {
//       console.warn(`No file selected for index ${index}`);
//     }
//   };

//   const downloadFile = (fileName: any) => {
//     axios.get(`http://localhost:5095/files/${fileName}`, { responseType: 'blob' })
//       .then(response => {
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = fileName;
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//       })
//       .catch(error => {
//         console.error('Error downloading the file', error);
//       });
//   };

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.keys(formData).forEach(key => {
//       if (key !== 'files') {
//         data.append(key, formData[key]);
//       } else {
//         formData.files.forEach(file => {
//           if (file) data.append('files', file);
//         });
//       }
//     });

//     axios.post('http://localhost:5074/users', data)
//       .then(response => {
//         console.log('User created successfully:', response);
//       })
//       .catch(error => {
//         console.error('Error creating user:', error);
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="form-container">
//       <input type="text" name="IdNumber" placeholder="מספר זהות" onChange={handleChange} required />
//       <input type="text" name="FirstName" placeholder="שם פרטי" onChange={handleChange} required />
//       <input type="text" name="LastName" placeholder="שם משפחה" onChange={handleChange} required />
//       <input type="text" name="Address" placeholder="כתובת" onChange={handleChange} required />
//       <input type="text" name="City" placeholder="עיר" onChange={handleChange} required />
//       <input type="tel" name="Phone" placeholder="טלפון" onChange={handleChange} required />
//       <input type="email" name="Email" placeholder="Email" onChange={handleChange} required />
//       <input type="date" name="BirthDate" onChange={handleChange} required />

//       {[...Array(4)].map((_, index) => (
//         <input type="file" key={index} onChange={(e) => handleFileChange(e, index)} />
//       ))}

//       <div className="download-buttons">
//         <button type="button" onClick={() => downloadFile('Medications.pdf')}>הורד קובץ 1</button>
//         <button type="button" onClick={() => downloadFile('agreement.pdf')}>הורד קובץ 2</button>
//         <button type="button" onClick={() => downloadFile('personal.pdf')}>הורד קובץ 3</button>
//       </div>

//       <button type="submit">הוסף משתמש</button>
//     </form>
//   );
// };

// export default RegisterComponent;

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Box, Button, Modal, Snackbar, TextField, Grid, Fab, Alert } from '@mui/material';
import axios from 'axios';

// סטיילים
const FabStyle = {
    position: 'fixed',
    bottom: 20,
    right: 20,
    backgroundColor: '#1976d2',
    color: 'white',
};

const ModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    width: '80%',
    maxWidth: 600
};

const ButtonStyle = {
    backgroundColor: '#1976d2',
    color: 'white',
    marginTop: 2,
    padding: '10px 20px',
};

const DownloadButtonStyle = {
    backgroundColor: '#1976d2',
    color: 'white',
    margin: '5px',
    padding: '10px 15px',
};

interface FormData {
    IdNumber: string;
    FirstName: string;
    LastName: string;
    Address: string;
    Phone: string;
    City: string;
    Email: string;
    BirthDate: string;
    files: File[]; // הגדר את סוג הקבצים
}

const RegisterComponent = () => {
    const [formData, setFormData] = useState<FormData>({
        IdNumber: '',
        FirstName: '',
        LastName: '',
        Address: '',
        Phone: '',
        City: '',
        Email: '',
        BirthDate: '',
        files: []
    });
    const [alert, setAlert] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files ? e.target.files[0] : null;
        const filesArray = [...formData.files];
        if (file) {
            filesArray[index] = file; // עדכון הקובץ במיקום המתאים
            setFormData({ ...formData, files: filesArray });
        }
    };

    const downloadFile = (fileName: string) => {
        axios.get(`http://localhost:5095/files/${fileName}`, { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch(error => {
                console.error('Error downloading the file', error);
            });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key !== 'files') {
                data.append(key, formData[key as keyof FormData]);
            } else {
                formData.files.forEach(file => {
                    if (file) data.append('files', file);
                });
            }
        });

        axios.post('http://localhost:5095/users', data)
            .then(response => {
                setAlert(true); // הצגת הודעת הצלחה
                handleClose(); // סגירת המודל
                setTimeout(() => setAlert(false), 3000); // הסרת ההודעה לאחר 3 שניות
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    };

    return (
        <Box sx={{ padding: '20px', textAlign: 'center' }}>
            {/* כפתור לפתיחת המודל */}
            <Fab sx={FabStyle} variant="extended" size="large" onClick={handleOpen}>
                הוספת משתמש למערכת
            </Fab>

            {/* מודל עבור הטופס */}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={ModalStyle}>
                    <h2 id="parent-modal-title">הכנס את פרטיך:</h2>
                    <form onSubmit={handleSubmit}>
                        {/* השתמש ב-Grid כדי להציג את השדות במספר עמודות */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="IdNumber"
                                    label="מספר זהות"
                                    fullWidth
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="FirstName"
                                    label="שם פרטי"
                                    fullWidth
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="LastName"
                                    label="שם משפחה"
                                    fullWidth
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="Address"
                                    label="כתובת"
                                    fullWidth
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="Phone"
                                    label="טלפון"
                                    fullWidth
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="City"
                                    label="עיר"
                                    fullWidth
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="Email"
                                    label="דוא"
                                    type="email"
                                    fullWidth
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="BirthDate"
                                    label="תאריך לידה"
                                    type="date"
                                    fullWidth
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                    required
                                />
                            </Grid>
                            {[...Array(4)].map((_, index) => (
                                <Grid item xs={12} sm={4} key={index}>
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileChange(e, index)}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                        <div>
                            <Button sx={ButtonStyle} type="submit" fullWidth>
                                שלח
                            </Button>
                        </div>
                            {/* כפתורים להורדה */}
            <Box sx={{ marginTop: '20px' }}>
                <Button sx={DownloadButtonStyle} onClick={() => downloadFile('Medications.pdf')}>הורד קובץ 1</Button>
                <Button sx={DownloadButtonStyle} onClick={() => downloadFile('agreement.pdf')}>הורד קובץ 2</Button>
                <Button sx={DownloadButtonStyle} onClick={() => downloadFile('personal.pdf')}>הורד קובץ 3</Button>
            </Box>
                    </form>
                </Box>
            </Modal>

        

            {/* הודעת הצלחה */}
            <Snackbar open={alert} autoHideDuration={3000} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    נרשמת בהצלחה!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default RegisterComponent;
