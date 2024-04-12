import { app } from "../../../services/config"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { updateAdminToken, writeAdminToken } from "../services/authService";

export const useAuthService = () => {

    const auth = getAuth(app);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const authenticate: any = async (formData: { username: string, password: string }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.username, formData.password);
            await writeAdminToken({
                token: userCredential.user.uid,
                status: "true",
                timestamp: new Date().toISOString()
            })
            return userCredential;
        } catch (error) {
            if (error instanceof Error) {
                return { error: error.message };
            }

        }
    }

    const removeToken = async () => {
        const data = updateAdminToken();
        console.log(data)
    }

    return [authenticate, removeToken] as const
}
