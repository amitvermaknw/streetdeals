import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/authentication/hooks/useAuth"
import useUrlAuth from "../hooks/useUrlAuth";
import { toast } from "react-toastify";
import React from "react";

const PrivateRouter = (): JSX.Element => {
    const user = useAuth();
    const [isTokenValid] = useUrlAuth();

    if (user.token === "" || user.token === null || user.token === undefined)
        return <Navigate to="/login" />

    const checkToken = async () => {
        const status = await isTokenValid(user.token);
        if (status === true) {
            return <Outlet />
        } else {
            window.location.pathname = "/login"
            toast.error("You are not autherized user");
            return <Navigate to="/login" />
        }
    }

    checkToken()
    return <Outlet />
}

export default PrivateRouter