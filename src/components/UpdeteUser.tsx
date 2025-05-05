import { Alert, Box, Button, Fab, Modal, Snackbar, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { User } from './user';
import { UserContext } from './context';
import axios from 'axios';
import { butttonStyle, FabStyle, Modalstyle } from './styleType';
const UpdateUser = () => {
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState(false);
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("UserContext must be used within a UserProvider");
    }
    const user = context.state;
    const [formData, setFormData] = useState<User>({
        idNumber: user.idNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        phone: user.phone,
        city: user.city,
        birthDate: user.birthDate
    });
    const { dispatch } = context;
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const dataToSend = { ...formData };
    console.log(dataToSend);
            const res = await axios.put(`https://server-angular-tovumarpeh.onrender.com/users/${formData.idNumber}`, dataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.status == 200) {
                setAlert(true);
                setTimeout(() => setAlert(false), 3000);
            }
        } catch (error) {
            console.log(error);
        }
        dispatch({
            type: 'UPDATE_USER',
            data: formData,
        });
        setOpen(false);
    }
        const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    return (
        <>
            <Fab
                sx={{ ...FabStyle, bgcolor: 'transparent', marginTop: 29 }}
                variant="extended"
                onClick={() => setOpen(true)}>
                עדכון פרטי ילד
            </Fab>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...Modalstyle, top: '55vh', width: 600 }}>
                    <h2 id="parent-modal-title">
                        Update details:
                    </h2>
                    <form onSubmit={handleSubmit}>
                    <TextField
                            helperText="Please enter your number id"
                            className="demo-helper-text-misaligned"
                            name="idNumber"
                            label="number id"
                            margin='normal'
                            color='secondary'
                            onChange={handleInputChange}
                        />
                        <TextField
                            helperText="Please enter your first name"
                            className="demo-helper-text-misaligned"
                            name="firstName"
                            label="first name"
                            margin='normal'
                            color='secondary'
                            onChange={handleInputChange}
                        />
                        <TextField
                            helperText="Please enter your family name"
                            className="demo-helper-text-misaligned"
                            name="lastName"
                            label="last name"
                            margin='normal'
                            onChange={handleInputChange}
                        />
                           <TextField
                            helperText="Please enter your email"
                            className="demo-helper-text-misaligned"
                            name="email"
                            label="email"
                            margin='normal'
                            onChange={handleInputChange}
                        />
                        <TextField
                            helperText="Please enter your Telephone number"
                            className="demo-helper-text-misaligned"
                            name="phone"
                            label="Telephone"
                            margin='normal'
                            onChange={handleInputChange}
                        />
                        <TextField
                            helperText="Please enter your address"
                            className="demo-helper-text-misaligned"
                            name="address"
                            label="address"
                            margin='normal'
                            onChange={handleInputChange}
                        />
                        <TextField
                            helperText="Please enter your address"
                            className="demo-helper-text-misaligned"
                            name="city"
                            label="city"
                            margin='normal'
                            onChange={handleInputChange}
                        />   
                        <TextField
                        helperText="Please enter your birthDate"
                        className="demo-helper-text-misaligned"
                        name="birthDate"
                        label="birthDate"
                        margin='normal'
                        onChange={handleInputChange}
                    />
                        <Button type="submit" variant="contained" sx={butttonStyle}>
                            Update
                        </Button>
                    </form>
                </Box>
            </Modal>
            <Snackbar
                open={alert}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    You have successfully registered!
                </Alert>
            </Snackbar>
        </>
    );
}
export default UpdateUser;

