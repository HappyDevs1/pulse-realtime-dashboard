// import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const baseUrl = "http://localhost:4000";

// const api = axios.create(
//   {
//     baseURL: baseUrl,
//     headers: {
//       'Content-Type': 'application/json',

//     }
//   }
// )

export const loginUser = async () => {
  try {
    window.location.href = `${baseUrl}/auth/google`

  } catch (error) {
    console.error("Login failed", error)
  }
}