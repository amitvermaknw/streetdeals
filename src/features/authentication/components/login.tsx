import { useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

const LoginForm = () => {
    const [userName, setUserName] = useState('')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inputChanges = (e: any) => {
        setUserName(e.target.value)
    }
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                <h1 className="font-bold text-md- md-2">Login</h1>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <Input
                    name="username"
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e: any) => inputChanges(e)}
                    placeholder="Please enter username"
                    value={userName}
                    type="text"
                    label="User Name"
                />
                <Input
                    name="password"
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Please enter password"
                    value={userName}
                    type="password"
                    label="Password"
                />

                <Button
                    name="Login"
                    onClick={() => { }}
                />
            </div>
        </div>
    )
}

export default LoginForm