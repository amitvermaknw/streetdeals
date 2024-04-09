import { app } from "../../../services/config"
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export const useAuthService = () => {

    const auth = getAuth(app);
    let token = '';
    //let uid = ''
    const authenticate = async (formData: { username: string, password: string }) => {
        const userCredential = await signInWithEmailAndPassword(auth, formData.username, formData.password);
        console.log(userCredential);

    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            token = user.uid
        } else {
            console.log("singed out");
        }
    })

    return [authenticate, token] as const
}
