import authService from "./authService";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const authFetch = async (url: string, options: RequestInit = {}) => {
  const accessToken = authService.getAccessToken();
  const refreshToken = authService.getRefreshToken();

  if (!accessToken) {
    throw new Error("No access token available");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await fetch(url, { ...options, headers });

    // If we get a 401 and have a refresh token, try to refresh
    if (response.status === 401 && refreshToken) {
      try {
        // Attempt to refresh the token
        const refreshResponse = await fetch(`${API_URL}/auth/token/refresh/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          // Store the new tokens
          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);

          // Retry the original request with the new access token
          const newHeaders = {
            ...options.headers,
            Authorization: `Bearer ${data.access}`,
          };
          return fetch(url, { ...options, headers: newHeaders });
        } else {
          // If refresh fails, clear tokens and throw error
          authService.logout();
          throw new Error("Session expired. Please log in again.");
        }
      } catch (refreshError) {
        // If refresh fails, clear tokens and throw error
        authService.logout();
        throw new Error("Session expired. Please log in again.");
      }
    }

    return response;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};
