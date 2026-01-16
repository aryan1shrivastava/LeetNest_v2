import axios from "axios";

// Get backend URL from environment variable or use default
const getBaseURL = () => {
  if (import.meta.env.MODE === "development") {
    return "http://localhost:8080/api/v1";
  }
  
  // In production, use VITE_API_URL if set, otherwise try to infer from current origin
  // If frontend and backend are on same domain, use relative path
  // If on different domains, use VITE_API_URL environment variable
  const apiUrl = import.meta.env.VITE_API_URL;
  if (apiUrl) {
    return apiUrl.endsWith('/api/v1') ? apiUrl : `${apiUrl}/api/v1`;
  }
  
  // Fallback: assume same domain (for monorepo deployments)
  return "/api/v1";
};

export const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  timeout: 10000, // 10 second timeout
});

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error for debugging
    if (error.response) {
      console.error("API Error Response:", {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });
    } else if (error.request) {
      console.error("API Request Error:", {
        message: "No response received",
        url: error.config?.url,
      });
    } else {
      console.error("API Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Add request interceptor to include JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from cookie
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
