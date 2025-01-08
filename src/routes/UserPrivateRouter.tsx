import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../features/authentication/hooks/useUserContext"
import useUrlAuth from "../hooks/useUrlAuth";
import { toast } from "react-toastify";
import { AuthContextType } from '../Interface/UserTokenInterface';

const UserPrivateRouter = (): React.JSX.Element => {
    const user = useUserContext() as unknown as AuthContextType;
    const [isTokenValid] = useUrlAuth('user');
    // const navigate = useNavigate();

    if (user.userInfo.accessToken === "" || user.userInfo.accessToken === null || user.userInfo.accessToken === undefined)
        return <Navigate to="/login" />

    const checkToken = async () => {
        const status = await isTokenValid(user.userInfo.accessToken);
        if (status === true) {
            return <Outlet />
        } else {
            localStorage.removeItem("token");
            toast.error("You are not autherized user");
            window.location.pathname = "/login";
            return;
            //navigate('/login');
            // return <Navigate to="/login" />
        }
    }

    checkToken()
    return <Outlet />
}

export default UserPrivateRouter