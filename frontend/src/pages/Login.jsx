import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuEyeClosed } from "react-icons/lu";
import { IoEyeSharp } from "react-icons/io5";
import "../App.css";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5001/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    identifier: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }

            setError("");

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Log in successful! Directing you to home");
            navigate("/home");

        } catch (error) {
            setError("Unable to connect to the server.");
        }
    };

    return (
    <div className="login-page">
        <div className="login-welcome">
            <p>Welcome to</p>
            <h1>mySkill</h1>
        </div>
        
        <div className="login-divider"></div>
        
        <div className="login-form">
            <h2>Sign In</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Email / Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="password-container">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <IoEyeSharp /> : <LuEyeClosed />}
                    </button>
                </div>
                
                {error && <p className="form-error">{error}</p>}

                <button type="submit">Submit</button>
            </form>

        <p className="register-text">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;