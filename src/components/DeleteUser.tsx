import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Fab, Modal, TextField } from '@mui/material';
import { butttonStyle, FabStyle, Modalstyle } from './styleType';

const DeleteUser = () => {
    const [identityNumber, setIdentityNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isInputVisible, setIsInputVisible] = useState(false); // מצב לניהול הראות של שדה הקלט

    const handleChange = (event: any) => {
        setIdentityNumber(event.target.value);
    };

    const handleDelete = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await axios.delete(`http://localhost:5095/users/${Number(identityNumber)}`);
            alert('Child deleted successfully');
        } catch (err) {
            setError('Failed to delete the child');
            console.error(err);
            alert('Failed to delete the child');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleInputVisibility = () => {
        setIsInputVisible(!isInputVisible); // הפעלת/כיבוי הראות של שדה הקלט
    };

    return (
        <>
            <Fab
                sx={{ ...FabStyle, bgcolor: 'transparent', marginTop: 38 }}
                variant="extended"
                size="large"

                onClick={toggleInputVisibility}> {isInputVisible ? 'ביטול' : 'מחיקת ילד מהמערכת'}
            </Fab>
            <div>

                {isInputVisible && (
                    <div>
                        <Modal open={isInputVisible} onClose={toggleInputVisibility}>
                        <Box sx={{ ...Modalstyle, top: '50vh', width: 300 }}>
                        <TextField
                            helperText="נא הכנס מספר זהות"
                            className="demo-helper-text-misaligned"
                            name="identityNumber"
                            label="מספר זהות"
                            margin='normal'
                            onChange={handleChange}
                        />
                            <Button type="submit" variant="contained" sx={{...butttonStyle ,marginLeft:10}} onClick={handleDelete}>
                                {isLoading ? 'Deleting...' : ' מחק'}
                            </Button>
                        </Box>
                        </Modal>
                        {error && <p>{error}</p>}
                    </div>
                )}
            </div>
        </>
    );
};

export default DeleteUser;
