import { useState, useEffect } from "react";
import { useStore } from "../store/store.js";
import { useNavigate } from "react-router-dom";

function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useStore();
    const navigate = useNavigate();
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true);
        try {
            await login({ email, password });
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoggingIn(false);
        }  
    };


    return (

    <div className="form-container sign-in-container">
        <form onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <span>Use your account</span>
            <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input
            type="password"
            name="password"
            placeholder="••••••••"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={isLoggingIn} type="submit">Sign In</button>
        </form>
    </div>
  );
}

export default SignInForm;
