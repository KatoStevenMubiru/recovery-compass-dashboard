import { authService } from "./authService";

export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  const accessToken = authService.getAccessToken();
  const refreshToken = authService.getRefreshToken();

  // Attach access token if available
  const headers = new Headers(init.headers || {});
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let response = await fetch(input, { ...init, headers });

  // If unauthorized, try to refresh token and retry once
  if (response.status === 401 && refreshToken) {
    try {
      const { access } = await authService.refreshToken(refreshToken);
      authService.setAuthData({
        access,
        refresh: refreshToken,
        user: authService.getUser()!,
      });
      // Retry with new access token
      headers.set("Authorization", `Bearer ${access}`);
      response = await fetch(input, { ...init, headers });
    } catch (err) {
      // If refresh fails, logout user
      authService.logout();
      throw new Error("Session expired. Please log in again.");
    }
  }

  return response;
}
