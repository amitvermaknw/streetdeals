import { tokenValidAuth } from "../services/tokenValidAuth";

const useUrlAuth = () => {
    const isTokenValid = async (token: string): Promise<boolean> => {
        return await tokenValidAuth(token);
    }
    return [isTokenValid]
}

export default useUrlAuth;