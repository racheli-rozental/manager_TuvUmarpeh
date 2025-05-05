import { Fab } from "@mui/material";
import { FabStyle } from "./styleType";
import axios from "axios";
import  { useState } from 'react';

const GetUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('https://server-react-tovumarpeh.onrender.com/users');
            setUsers(res.data); // שמירת הנתונים ב-State
        } catch (error) {
            setError('Error fetching users'); // עדכון ה-State עם הודעת שגיאה
            console.log(error);
        }
    };

    return (
       <>
       <Fab
            sx={{ ...FabStyle, bgcolor: 'transparent', marginTop: 19 }}
            variant="extended"
            size="large"
            onClick={fetchUsers}>הצגת ילדים רשומים במערכת
        </Fab>
        <div>
           
            {error && <p>{error}</p>} {/* הצגת הודעת שגיאה אם יש */}
            <ul style={{ listStyleType: 'decimal' }}>
            
                {users.map((user: any) => (
                    <li key={user.idNumber}>{user.firstName} {user.lastName}</li> // הצגת פרטי המשתמש
                ))}
            </ul>
        </div>
       </>
    );
};

export default GetUsers;
