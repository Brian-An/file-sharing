export const UploadFile = async (fileData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
      {
        method: "POST",
        body: fileData,
      }
    );
    return response.json();
  } catch (error) {
    console.log("Error while calling upload file api", error.message);
  }
};
