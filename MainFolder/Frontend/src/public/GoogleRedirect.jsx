import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        console.log("Current URL:", window.location.href);
        console.log("Token from URL:", token);

        if (token) {
            localStorage.setItem("token", token);
            console.log("Token saved to localStorage:", localStorage.getItem("token"));

            // Use setTimeout to ensure token is saved before navigating
            setTimeout(() => {
                navigate("/role-selection");
            }, 0); // Delay navigation to ensure storage is complete
        } else {
            alert("Google login failed or no token provided.");
            navigate("/login");
        }
    }, [navigate]);

    return <p>Redirecting...</p>;
};

export default GoogleRedirect;
