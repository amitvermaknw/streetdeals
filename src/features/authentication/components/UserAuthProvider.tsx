import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { LayoutProps } from "../../../utils/Types";
import { auth, googleProvider } from '../../../services/googleAuthProvider';
import { signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useUsersAuth } from '../hooks/useUsersAuth';
import { DbContext } from "../../../providers/DBProvider";
import { userTokenSchema } from "../../../schema/userTokenSchema";
import { UserToken } from "../Interface/userTokenInterface";
import { RxDatabase } from 'rxdb';
import localForage from 'localforage';
import { AuthContextType } from "../../../Interface/UserTokenInterface";



const defaultValue = {
    userInfo: {
        uId: '',
        accessToken: '',
        displayName: '',
        email: '',
        emailVerified: false,
        phoneNumber: '',
        photoURL: '',
    },
    signIn: (): Promise<boolean> => Promise.resolve(false),
    logOut: () => { },
    setUserSchema: (): Promise<RxDatabase | null | undefined> => Promise.resolve(undefined)
};

export const UserAuthContext = createContext<AuthContextType>(defaultValue);

const UserAuthProvider = ({ children }: LayoutProps) => {
    // const [token, setToken] = useState<string>(localStorage.getItem('token') as string);
    const [userInfo, setUserInfo] = useState<UserToken>(() => {
        const storedUserToken = localStorage.getItem('loggedInUser')
        return storedUserToken ? JSON.parse(storedUserToken) as UserToken : {} as UserToken
    });
    const navigate = useNavigate();
    const [isUserValid, addLoggedInUser] = useUsersAuth();
    const localDb = useContext(DbContext)

    useEffect(() => {
        async function setSchema() {
            if (localDb?.db) {
                try {
                    if (!localDb?.db?.collections['userToken']) {
                        await localDb?.db.addCollections({
                            userToken: {
                                schema: userTokenSchema
                            }
                        })
                    }
                } catch (error) {
                    if (localDb?.db?.collections['userToken']) {
                        localDb?.db?.userToken.remove();
                    } else {
                        await localDb?.db?.remove();
                    }
                }
            }
        }

        setSchema();
    }, [localDb?.db])

    const signIn = async (): Promise<boolean> => {
        try {
            const userObject = await signInWithPopup(auth, googleProvider);
            const token = await userObject.user.getIdToken();
            const result = await isUserValid(token, userObject.user.email ? userObject.user.email : '');
            if (result) {
                const dbResponse = await addLoggedInUser(userObject.user);
                if (dbResponse === true) {
                    const userInfoObj: UserToken = {
                        accessToken: token,
                        displayName: userObject.user.displayName || '',
                        email: userObject.user.email || '',
                        emailVerified: userObject.user.emailVerified,
                        phoneNumber: userObject.user.phoneNumber || '',
                        photoURL: userObject.user.photoURL || '',
                        uId: userObject.user.uid
                    }

                    if (localDb?.db?.collections['userToken']) {
                        await localDb?.db?.userToken.insert({
                            ...userInfoObj
                        })
                        //localStorage.setItem("loggedInUserUid", userObject.user.uid);
                    }

                    setUserInfo(userInfoObj);
                    await localForage.setItem("loggedInUser", userInfoObj);

                    return true;
                } else {
                    localDb?.db?.userToken.remove();
                }
            } else {
                toast.error("Not able to varify user details");
                localStorage.removeItem("loggedInUser");
                localDb?.db?.userToken.remove();
            }
            return false;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message);
            return false;
        }
    };

    const logOut = async () => {
        setUserInfo({} as UserToken);
        // localStorage.removeItem("loggedInUser");
        localDb?.db?.userToken.remove();
        await localForage.removeItem("loggedInUser");
        navigate("/login");
        window.location.reload();
        toast("Logged out successfully");
    }

    const setUserSchema = async (): Promise<RxDatabase | null | undefined> => {
        if (localDb?.db) {
            try {
                if (!localDb?.db?.collections['userToken']) {
                    await localDb?.db.addCollections({
                        userToken: {
                            schema: userTokenSchema
                        }
                    })
                }
            } catch (error) {
                if (localDb?.db?.collections['userToken']) {
                    await localDb?.db?.userToken.remove();
                } else {
                    await localDb?.db?.remove();
                }
            }
        }
        return localDb?.db
    }

    return (
        <UserAuthContext.Provider value={{ userInfo, signIn, logOut, setUserSchema }}>
            {children}
        </UserAuthContext.Provider>
    )
}

export default UserAuthProvider;