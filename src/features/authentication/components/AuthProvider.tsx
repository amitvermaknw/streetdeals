import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { LayoutProps } from "../../../utils/Types";
import { useAuthHook } from "../hooks/useAuthHook";
import { toast } from "react-toastify";
//import useUrlAuth from "../../../hooks/useUrlAuth";

const defaultValues = {
    token: '',
    user: '',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginAction: (_data: { username: string, password: string }) => { },
    logOut: () => { },
    alertMsg: ''
};

type AuthenticatedUser = typeof defaultValues
export const AuthContext = createContext<AuthenticatedUser>(defaultValues);

const AuthProvider = ({ children }: LayoutProps) => {
    const [user, setUser] = useState<string>(null || '');
    const [token, setToken] = useState<string>(localStorage.getItem('token') as string);
    const [alertMsg, setAlert] = useState<string>('')
    const navigate = useNavigate();
    //const [isTokenValid] = useUrlAuth();


    const [authenticate, removeToken] = useAuthHook();

    const loginAction = async (data: { username: string, password: string }) => {
        try {
            const response = await authenticate(data);
            if (Object.prototype.hasOwnProperty.call(response, 'error')) {
                setAlert(response.error as string);
                return
            }

            setToken(response.user.uid as string)
            localStorage.setItem("token", response.user.uid as string)
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
        <AuthContext.Provider value={{ token, user, loginAction, logOut, alertMsg }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;