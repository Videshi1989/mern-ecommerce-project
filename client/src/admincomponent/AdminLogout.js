import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const AdminLogout=()=>{
   
    const { LogoutUser } = useAuth();
    useEffect(()=>{ LogoutUser(); },[]);
     /*                 OR
     useEffect(()=>{ LogoutUser(); },[LogoutUser]);
     */
    return <Navigate to="/signin" />
}

export default AdminLogout;