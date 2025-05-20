import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteComponent = () => {
    const { id } = useParams();
    const [identityNumber, setIdentityNumber] = useState('');
    const [isDeleted, setIsDeleted] = useState(false);
    const [error, setError] = useState(null);
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
        return <div>Item deleted successfully!</div>;
    }

    return (
        <div>
            {!showDelete ? (
                <button onClick={() => setShowDelete(true)}>הצג מחיקת ילד</button>
            ) : (
                <>
                    <input
                        type="text"
                        value={identityNumber}
                        onChange={(e) => setIdentityNumber(e.target.value)}
                        placeholder="Enter Identity Number"
                    />
                    <button onClick={handleDelete}>Delete Item</button>
                    {error && <div>Error: {error}</div>}
                </>
            )}
        </div>
    );
};

export default DeleteComponent;