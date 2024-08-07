import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/authentication/hooks/useAuth"
import useUrlAuth from "../hooks/useUrlAuth";
import { toast } from "react-toastify";

const PrivateRouter = (): JSX.Element => {
    const user = useAuth();
    const [isTokenValid] = useUrlAuth();
    // const navigate = useNavigate();

    if (user.token === "" || user.token === null || user.token === undefined)
        return <Navigate to="/login" />

    const checkToken = async () => {
        const status = await isTokenValid(user.token);
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

export default PrivateRouter