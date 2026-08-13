import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please log in before accessing this page.");
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;