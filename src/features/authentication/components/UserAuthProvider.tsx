import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { LayoutProps } from "../../../utils/Types";
import { auth, googleProvider } from '../../../services/googleAuthProvider';
import { signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useUsersAuth } from '../hooks/useUsersAuth';

interface AuthContextType {
    userInfo: string;
    signIn: () => Promise<boolean>;
    logOut: () => void;
}

const defaultValue = {
    userInfo: '',
    signIn: (): Promise<boolean> => Promise.resolve(false),
    logOut: () => { }
};

export const UserAuthContext = createContext<AuthContextType>(defaultValue);

const UserAuthProvider = ({ children }: LayoutProps) => {
    // const [token, setToken] = useState<string>(localStorage.getItem('token') as string);
    const [userInfo, setUserInfo] = useState(localStorage.getItem('loggedInUser') || '');
    const navigate = useNavigate();
    const [isUserValid, addLoggedInUser] = useUsersAuth();



    const signIn = async (): Promise<boolean> => {
        try {
            const userObject = await signInWithPopup(auth, googleProvider);
            const token = await userObject.user.getIdToken();
            const result = await isUserValid(token);
            if (result) {
                const dbResponse = await addLoggedInUser(userObject.user);
                if (dbResponse === true) {
                    const userInfoObj = {
                        accessToken: token,
                        displayName: userObject.user.displayName,
                        email: userObject.user.email,
                        emailVerified: userObject.user.emailVerified,
                        phoneNumber: userObject.user.phoneNumber,
                        photoURL: userObject.user.photoURL,
                    }
                    localStorage.setItem("loggedInUser", JSON.stringify(userInfoObj));
                    setUserInfo(JSON.stringify(userInfoObj))
                    return true;
                } else {
                    localStorage.removeItem("loggedInUser");
                }
            } else {
                toast.error("Not able to varify user details");
                localStorage.removeItem("loggedInUser");
            }
            return false;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message);
            return false;
        }
    };

    const logOut = () => {
        setUserInfo('');
        localStorage.removeItem("loggedInUser");
        // removeToken()
        navigate("/login");
        window.location.reload();
        toast("Logged out successfully");
    }

    return (
        <UserAuthContext.Provider value={{ userInfo, signIn, logOut }}>
            {children}
        </UserAuthContext.Provider>
    )
}

export default UserAuthProvider;