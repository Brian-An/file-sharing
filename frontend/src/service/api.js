export const UploadFile = async (fileData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
      {
        method: "POST",
        body: fileData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Upload failed");
    }

    const data = await response.json();

    // If the path is relative, prepend the backend URL
    if (data.path && data.path.startsWith("/")) {
      data.path = `${import.meta.env.VITE_BACKEND_URL}${data.path}`;
    }

    return data;
  } catch (error) {
    console.error("Error while calling upload file api:", error.message);
    throw error; // Re-throw to handle in the component
  }
};
