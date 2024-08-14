import { useState } from 'react';
import Button from '../../../components/ui/Button';
import { useUserContext } from '../hooks/useUserContext';

const SignInWithGoogle = () => {
    const [isLoading, setIsLoading] = useState(false);
    const userAuth = useUserContext();

    const signIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const result = await userAuth.signIn();
        if (result) {
            window.location.reload();
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