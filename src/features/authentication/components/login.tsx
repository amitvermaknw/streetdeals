import { useEffect, useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import Alert from "../../../components/ui/Alert";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState('');
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        if (input.email !== "" && input.password !== "") {
            await auth.loginAction(input);
            //setError('');
        } else {
            setError("Username and Password should not be empty");
            // return false
        }
        setIsLoading(false);
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token)
            navigate("/dashboard");
    }, [])

    return (
        <div className="flex flex-row min-h-96 justify-center items-center ">
            <div className="max-w-sm rounded overflow-hidden shadow-lg flex-auto">
                <div className="px-6 py-4">
                    <h1 className="font-bold text-md- md-2">Login</h1>
                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <form onSubmit={handleSubmit}>
                        <Input
                            name="email"
                            onChange={handleInput}
                            placeholder="Please enter email"
                            type="text"
                            label="User Name"
                        />
                        <Input
                            name="password"
                            onChange={handleInput}
                            placeholder="Please enter password"
                            type="password"
                            label="Password"
                        />
                        {error ? <Alert danger={error} /> : ''}
                        <Button
                            name="Login"
                            onClick={() => { }}
                            loading={isLoading}
                        />
                    </form>
                </div>
                <div className="px-6 py-4">
                    {auth.alertMsg ? toast(auth.alertMsg) : ''}
                </div>

            </div>

        </div>
    )
}

export default LoginForm