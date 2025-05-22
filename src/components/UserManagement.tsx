import { UserProvider } from "./context";
import DeleteUser from "./DeleteUser";
import GetUsers from "./GetUsers";
import Registration from "./Registration";
import UpdateUser from "./UpdeteUser";

interface UserManagementProps {
    showUpdateUser: boolean;
}

const UserManagement = ({ showUpdateUser }: UserManagementProps) => {

      return (
        <>
            <div>
                <h1>User Management</h1>
            </div>
            <Registration />
            <GetUsers />
            <UserProvider>
                {showUpdateUser && <UpdateUser />}
            </UserProvider>
            <DeleteUser />
        </>
    );
};
    

export default UserManagement;