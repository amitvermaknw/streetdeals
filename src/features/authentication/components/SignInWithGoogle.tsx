import { useState } from 'react';
import Button from '../../../components/ui/Button';
import { auth, googleProvider } from '../../../services/googleAuthProvider';
import { signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useUsersAuth } from '../hooks/useUsersAuth';

const SignInWithGoogle = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [usersAuth, removeToken] = useUsersAuth();

    const signIn = async () => {
        try {
            setIsLoading(true);
            const userObject = await signInWithPopup(auth, googleProvider);
            const token = await userObject.user.getIdToken();

            const result = await usersAuth(token);

            if (result) {
                localStorage.setItem("user_token", token);
            } else {
                toast.error("Not able to varify user details");
            }

            // Send token to server for verification
            // const response = await fetch('/api/login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ token }),
            // });

            // const data = await response.json();


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
            onClick={() => signIn()}
            loading={isLoading}
        />
    );
};

export default SignInWithGoogle;