import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { LayoutProps } from "../../../utils/Types";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { toast } from "react-toastify";
//import useUrlAuth from "../../../hooks/useUrlAuth";

const defaultValues = {
    token: '',
    user: '',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginAction: (_data: { email: string, password: string }) => { },
    logOut: () => { },
    alertMsg: ''
};

function isErrorResponse(response: string | { error: string }): response is { error: string } {
    return (response as { error: string }).error !== undefined;
}

type AuthenticatedUser = typeof defaultValues
export const AdminAuthContext = createContext<AuthenticatedUser>(defaultValues);

const AdminAuthProvider = ({ children }: LayoutProps) => {
    const [user, setUser] = useState<string>('');
    const [token, setToken] = useState<string>(localStorage.getItem('token') as string);
    const [alertMsg, setAlert] = useState<string>('')
    const navigate = useNavigate();
    const [authenticate, removeToken] = useAdminAuth();

    const loginAction = async (data: { email: string, password: string }) => {
        try {
            const response: string | { error: string } = await authenticate(data);
            if (isErrorResponse(response)) {
                setAlert(response.error as string);
                return
            }

            setToken(response as string)
            localStorage.setItem("token", response as string)
            navigate("/dashboard")
        } catch (err) {
            if (err instanceof Error) {
                setAlert(err.message as string)
            }
        }
    }

    const logOut = () => {
        setUser('');
        setToken('');
        localStorage.removeItem("token");
        removeToken()
        navigate("/login");
        toast("Logged out successfully");
    }

    return (
        <AdminAuthContext.Provider value={{ token, user, loginAction, logOut, alertMsg }}>
            {children}
        </AdminAuthContext.Provider>
    )
}

export default AdminAuthProvider;