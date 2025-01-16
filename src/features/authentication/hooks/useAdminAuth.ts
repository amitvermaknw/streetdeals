import { updateAdminToken, addAdminToken, login } from "../services/adminAuthService";

export const useAdminAuth = () => {

    const authenticate = async (formData: { email: string, password: string }): Promise<string | { error: string }> => {
        try {
            const token = await login(formData);
            await addAdminToken({
                token: token,
                status: true,
                timestamp: new Date().toISOString()
            })
            return token;

        } catch (error) {
            if (error instanceof Error) {
                return { error: error.message };
            }

            return "error";
        }
    }

    const removeToken = async () => {
        await updateAdminToken();
    }

    return [authenticate, removeToken] as const
}
