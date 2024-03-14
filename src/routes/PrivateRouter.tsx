import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/authentication/hooks/useAuth"

const PrivateRouter = () => {
    const user = useAuth();

    if (user.token) return <Navigate to="/login" />
    return <Outlet />
}

export default PrivateRouter