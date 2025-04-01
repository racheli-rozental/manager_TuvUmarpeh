import { UserProvider } from "./context";
import DeleteUser from "./DeleteUser";
import GetUsers from "./GetUsers";
import Registration from "./Registration";
import UpdateUser from "./UpdeteUser";

const UserManagement = () => {
    
    return (<>
        <div>
            <h1>User Management</h1>
        </div>
         <Registration/>
         <GetUsers />
         <UserProvider>
         <UpdateUser />
            </UserProvider>
         <DeleteUser/>

         </>
    )
};
export default UserManagement;