import axios from "axios";

export const uploadFile = async (file: File, organisationId: string) => {
  const apiUrl = `http://localhost:4000/api/upload/data/${organisationId}`;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(apiUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};