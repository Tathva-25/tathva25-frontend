import axios from "axios";
import { toast } from "react-hot-toast";

const isTokenExpired = (token) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp < currentTime;
    } catch (error) {
        console.error("Error decoding token:", error);
        return true; // Assume expired if there's an error
    }
};


const jwtRequired = axios.create({
    baseURL: "https://api.tathva.org",
});

jwtRequired.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwt");

        if (!token || isTokenExpired(token)) {
            localStorage.removeItem("jwt");
            toast.error("Session expired. Please login again.");

            if (typeof window !== "undefined") {
                setTimeout(() => {
                    window.location.href =  "https://accounts.google.com/o/oauth2/auth?client_id=783776933631-jdor6jdgf8qvmmbbj4hrtt9con1no8ue.apps.googleusercontent.com&redirect_uri=https://api.tathva.org/api/auth/callback&response_type=code&scope=openid%20email%20profile&prompt=consent";
                }, 1000);
            }

            return Promise.reject(new Error("Session expired"));
        }

        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default jwtRequired;