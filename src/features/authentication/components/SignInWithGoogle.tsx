import { useState } from 'react';
import Button from '../../../components/ui/Button';
import { auth, googleProvider } from '../../../services/googleAuthProvider';
import { signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useUsersAuth } from '../hooks/useUsersAuth';

const SignInWithGoogle = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [isUserValid, removeToken, addLoggedInUser] = useUsersAuth();

    const signIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
        try {
            event.preventDefault();
            setIsLoading(true);
            const userObject = await signInWithPopup(auth, googleProvider);
            const token = await userObject.user.getIdToken();
            const result = await isUserValid(token);
            if (result) {
                const dbResponse = await addLoggedInUser(userObject.user);
                if (dbResponse === true) {
                    const userInfo = {
                        accessToken: token,
                        displayName: userObject.user.displayName,
                        email: userObject.user.email,
                        emailVerified: userObject.user.emailVerified,
                        phoneNumber: userObject.user.phoneNumber,
                        photoURL: userObject.user.photoURL,
                    }
                    localStorage.setItem("loggedInUser", JSON.stringify(userInfo));
                    window.location.reload();

                } else {
                    localStorage.removeItem("loggedInUser");
                }

            } else {
                toast.error("Not able to varify user details");
                localStorage.removeItem("loggedInUser");
            }

            setIsLoading(false);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message);
            console.log("error", error);
            setIsLoading(false);

        }
    };

    return (
        <Button
            name="Login with Google"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => signIn(event)}
            loading={isLoading}
        />
    );
};

export default SignInWithGoogle;