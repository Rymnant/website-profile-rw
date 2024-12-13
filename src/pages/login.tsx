import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === process.env.DEV_SECRET_KEY) {
            document.cookie = `dev-token=${password}; path=/`;
            router.push('/dashboard');
        } else {
            alert('Incorrect password');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Password
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Login</button>
        </form>
    );
}