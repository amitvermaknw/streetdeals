import { tokenValidAuth } from "../services/tokenValidAuth";

const useUrlAuth = (userType: string) => {
    const isTokenValid = async (token: string): Promise<boolean> => {
        return await tokenValidAuth(token, userType);
    }
    return [isTokenValid]
}

export default useUrlAuth;