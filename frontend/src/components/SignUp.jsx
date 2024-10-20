import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/store.js";

function SignUpForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("candidate"); // default to "candidate"
    const { signup } = useStore();
    const navigate = useNavigate();
    const [isSigningUp, setIsSigningUp] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSigningUp(true);
        try {
            await signup({ name, email, password, role });
            navigate('/');
        } catch (error) {
            console.error('Signup failed:', error);
        } finally {
            setIsSigningUp(false);
        }
    };


  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <span>Use your email for registration</span>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
        <div className="role-selection flex flex-row p-2">
          <label>
            <input
              type="radio"
              value="candidate"
              checked={role === "candidate"}
              onChange={(e) => setRole(e.target.value)}
            />
            Candidate
          </label>
          <label>
            <input
              type="radio"
              value="interviewer"
              checked={role === "interviewer"}
              onChange={(e) => setRole(e.target.value)}
            />
            Interviewer
          </label>
        </div>
        <button disabled={isSigningUp} type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
