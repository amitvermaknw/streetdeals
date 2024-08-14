import { useContext } from 'react';
import { AdminAuthContext, } from '../components/AdminAuthProvider';

export const useAdminContext = () => {
    return useContext(AdminAuthContext);
}