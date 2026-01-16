import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:8080/api/v1"
      : "/api/v1",
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
