import React, { useContext } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../features/authentication/hooks/useUserContext"
import useUrlAuth from "../hooks/useUrlAuth";
import { toast } from "react-toastify";
import { AuthContextType } from '../Interface/UserTokenInterface';
import { DbContext } from '../providers/DBProvider';

const UserPrivateRouter = (): React.JSX.Element => {
    const user = useUserContext() as unknown as AuthContextType;
    const [isTokenValid] = useUrlAuth('user');
    const localDb = useContext(DbContext)
    // const navigate = useNavigate();

    if (user.userInfo.accessToken === "" || user.userInfo.accessToken === null || user.userInfo.accessToken === undefined) {
        localStorage.removeItem("loggedInUser");
        toast.error("You are not autherized user");
        localDb?.db?.userToken?.remove();
        return <Navigate to="/login" />
    }

    const checkToken = async () => {
        const status = await isTokenValid(user.userInfo.accessToken);
        if (status === true) {
            return <Outlet />
        } else {
            //localStorage.removeItem("loggedInUser");
            toast.error("You are not autherized user");
            localDb?.db?.userToken?.remove();
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