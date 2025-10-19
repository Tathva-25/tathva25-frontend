// Authentication debugging utility
export const debugAuth = () => {
  console.log("=== Authentication Debug ===");

  // Check localStorage
  const jwt = localStorage.getItem("jwt");
  const token = localStorage.getItem("token");

  console.log("JWT in localStorage:", jwt ? "EXISTS" : "NOT_FOUND");
  console.log("Token in localStorage:", token ? "EXISTS" : "NOT_FOUND");

  if (jwt) {
    console.log("JWT value:", jwt.substring(0, 50) + "...");

    try {
      const parts = jwt.split(".");
      console.log("JWT parts count:", parts.length);

      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        console.log("JWT payload:", payload);

        if (payload.exp) {
          const currentTime = Math.floor(Date.now() / 1000);
          console.log("Current time:", currentTime);
          console.log("Token exp:", payload.exp);
          console.log("Token expired:", payload.exp < currentTime);
        }
      }
    } catch (error) {
      console.error("Error parsing JWT:", error);
    }
  }

  console.log("=== End Debug ===");
};

// Call this from browser console to debug: window.debugAuth()
if (typeof window !== "undefined") {
  window.debugAuth = debugAuth;
}
