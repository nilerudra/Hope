import axios from "axios";

async function networkRequest(
  url,
  handleResponse,
  requestType = "get",
  data = null
) {
  const token = localStorage.getItem("access_token");
  const headers = {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type":
      requestType.toLowerCase() === "post" ? "application/json" : undefined,
  };

  try {
    let response;

    if (requestType.toLowerCase() === "post") {
      response = await axios.post(url, data, { headers });
    } else if (requestType.toLowerCase() === "get") {
      const params =
        data && typeof data === "object"
          ? new URLSearchParams(data).toString()
          : "";
      const fullUrl = params ? `${url}?${params}` : url;
      response = await axios.get(fullUrl, { headers });
    } else {
      throw new Error(
        "Unsupported request type. Only GET and POST are allowed."
      );
    }

    // Handle the response
    if (response.data) {
      handleResponse(response.data);
    } else {
      console.error("Unexpected response format:", response);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { response, request } = error;

      if (response) {
        const { status, data } = response;

        // Check for specific status codes
        if (status === 401) {
          // Unauthorized: Clear token and redirect to login
          localStorage.clear();
          window.location.href = "/login";
          return;
        }

        let errorMessage = data?.["message"] || "An unknown error occurred";
        if (typeof errorMessage === "object") {
          errorMessage = JSON.stringify(errorMessage);
        }

        console.error(`Axios error (Status: ${status}):`, errorMessage);
      } else if (request) {
        // Network error: no response received
        console.error("Network error: No response received from the server.");
      } else {
        // Any other errors
        console.error("Error setting up the request:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

export { networkRequest };
