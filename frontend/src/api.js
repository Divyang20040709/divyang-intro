const API_URL = import.meta.env.VITE_API_URL || "";

/**
 * Generic request helper to handle API calls and errors
 */
const request = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    const data = await response.json();

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
