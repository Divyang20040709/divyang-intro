export const API_URL = import.meta.env.VITE_API_URL || "https://divyang-intro.onrender.com";

/**
 * Generic request helper to handle API calls and errors
 */
const request = async (endpoint, options = {}) => {
  // Ensure endpoint starts with / for absolute pathing
  const baseUrl = API_URL.replace(/\/$/, "");
  const cleanEndpoint = endpoint.replace(/^\//, "");
  const url = `${baseUrl}/${cleanEndpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });

    // 1. Check if the response is JSON before parsing
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error(`[API Error] Received non-JSON response (${contentType || "text/html"}). Body:`, text.substring(0, 200));
      throw new Error(`Invalid response version: Expected JSON but received ${contentType || "HTML"}. Please check if the API URL is correct.`);
    }

    const data = await response.json();

    // 2. Handle HTTP errors
    if (!response.ok) {
      const errorMsg = data.errors
        ? data.errors.map((e) => e.msg).join(", ")
        : data.error || data.message || `Request failed with status ${response.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    console.error(`[API Error] ${options.method || "GET"} ${endpoint}:`, error.message);
    throw error;
  }
};

export const sendContact = (data) => {
  return request("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getProjects = async () => {
  const data = await request("/api/projects");
  return data.projects || [];
};

export const getSkills = async () => {
  const data = await request("/api/skills");
  return data.skills || [];
};

