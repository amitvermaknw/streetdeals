import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { LayoutProps } from "../../../utils/Types";
import { useAuthService } from "../hooks/useAuthService";

const defaultValues = {
    token: '',
    user: '',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginAction: (_data: { username: string, password: string }) => { },
    logOut: () => { }
};

type AuthenticatedUser = typeof defaultValues
export const AuthContext = createContext<AuthenticatedUser>(defaultValues);

const AuthProvider = ({ children }: LayoutProps) => {
    console.log("inside auth --")
    const [user, setUser] = useState<string>(null || '');
    const [token, setToken] = useState<string>(localStorage.getItem('token') as string);
    const navigate = useNavigate();

    const [authenticate, token2] = useAuthService();

    const loginAction = async (data: { username: string, password: string }) => {
        try {
            console.log("inside auth")
            authenticate(data);
            localStorage.setItem("token", token2)

            // if (res.data) {
            //     setUser(res.data.user);
            //     setToken(res.token)
            //     localStorage.setItem("token", token2)
            //     navigate("/dashboard")
            //     return;
            // }
            // throw new Error(res.message);
        } catch (err) {
            console.error(err)
        }
    }

    const logOut = () => {
        setUser('');
        setToken("");
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;