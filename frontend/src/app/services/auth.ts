const baseUrl = "http://localhost:4000";

export const loginUser = async () => {
  try {
    window.location.href = `${baseUrl}/auth/google`

  } catch (error) {
    console.error("Login failed", error)
  }
}