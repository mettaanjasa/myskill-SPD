import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuEyeClosed } from "react-icons/lu";
import { IoEyeSharp } from "react-icons/io5";
import "../App.css";

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const handleRegister = async (e) => {
        e.preventDefault();

        if (!email || !username || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5001/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    username,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }

            setError("");

            alert("Registration successful! Please log in.");
            navigate("/");

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
        
        <div className="register-divider"></div>
        
        <div className="login-form">
            <h2>Register</h2>

            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                
                <div className="password-container">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>setShowConfirmPassword(!showConfirmPassword)
                        }
                    >
                        {showConfirmPassword ? <IoEyeSharp /> : <LuEyeClosed />}
                    </button>
                </div>

                {error && <p className="form-error">{error}</p>}
                
                <button type="submit">Sign Up</button>
            </form>

        <p className="register-text">
          Have an account? <Link to="/">Log In</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;