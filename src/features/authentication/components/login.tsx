import { useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useAuth } from "../hooks/useAuth";

const LoginForm = () => {
    const [input, setInput] = useState({
        username: "",
        password: ""
    });

    const auth = useAuth();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (input.username !== "" && input.password !== "") {
            auth.loginAction(input);
            return;
        } else {
            return false
        }
    }

    return (
        <div className="flex flex-row min-h-96 justify-center items-center ">
            <div className="max-w-sm rounded overflow-hidden shadow-lg flex-auto">
                <div className="px-6 py-4">
                    <h1 className="font-bold text-md- md-2">Login</h1>
                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <form onSubmit={handleSubmit}>
                        <Input
                            name="username"
                            onChange={handleInput}
                            placeholder="Please enter username"
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
                        <Button
                            name="Login"
                            onClick={() => { }}
                        />
                    </form>
                </div>
            </div>

        </div>
    )
}

export default LoginForm