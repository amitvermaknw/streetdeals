import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom";

const defaultValues = {
    token: '',
    user: '',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loginAction: (_data: { username: string, password: string }) => { },
    logOut: () => { }
};

type AuthenticatedUser = typeof defaultValues
export const AuthContext = createContext<AuthenticatedUser>(defaultValues);

type LayoutProps = {
    children: React.ReactNode
}

const AuthProvider = ({ children }: LayoutProps) => {
    const [user, setUser] = useState<string>(null || '');
    const [token, setToken] = useState<string>(localStorage.getItem('token') as string);
    const navigate = useNavigate();

    const loginAction = async (data: { username: string, password: string }) => {
        try {
            const response = await fetch("apicall", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const res = await response.json();

            if (res.data) {
                setUser(res.data.user);
                setToken(res.token)
                localStorage.setItem("token", res.token)
                navigate("/dashboard")
                return;
            }
            throw new Error(res.message);
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