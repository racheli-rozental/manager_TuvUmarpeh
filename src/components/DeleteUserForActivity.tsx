import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteComponent = () => {
    const { id } = useParams(); // מקבל את ה-ID מהנתיב
    const [identityNumber, setIdentityNumber] = useState('');
    const [isDeleted, setIsDeleted] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5095/activity/${id}/children/${identityNumber}`, {
                data: { identityNumber } // שולח את מספר הזהות כנתון בבקשה
            });
            setIsDeleted(true);
        } catch (err) {
            setError(err.message);
        }
    };

    if (isDeleted) {
        return <div>Item deleted successfully!</div>;
    }

    return (
        <div>
            <input
                type="text"
                value={identityNumber}
                onChange={(e) => setIdentityNumber(e.target.value)}
                placeholder="Enter Identity Number"
            />
            <button onClick={handleDelete}>Delete Item</button>
            {error && <div>Error: {error}</div>}
        </div>
    );
};

export default DeleteComponent;

