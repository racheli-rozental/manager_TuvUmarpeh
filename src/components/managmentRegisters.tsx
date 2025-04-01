import UserFiles from "./FilesForRegisters";
import ChildrenList from "./RegistersForActivity"
import { useParams } from 'react-router-dom';
const ManagementRegisters=()=>{
    const { id } = useParams(); 
return(
    <>
    <ChildrenList activityId={id || ''}/>
    <UserFiles activityId={id||''}/>
    </>
)
}
export default ManagementRegisters