import React from "react";
import { Navigate, useLocation } from 'react-router-dom';
import authService from "../services/auth-service";

function AuthGuard( {children} : {children: JSX.Element} ) {
    let auth = authService.getCurrentUser();
    let location = useLocation();
    
    if (!auth.user) {
        return <Navigate to='/login' state={{from: location}} replace/>
    }
    
    return children;
}

export default AuthGuard;