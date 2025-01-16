import { useContext } from 'react';
import { UserAuthContext } from '../components/UserAuthProvider';

export const useUserContext = () => {
    return useContext(UserAuthContext);
}