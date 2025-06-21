"use client";

import { useRouter } from "next/navigation";

export const useProtectPage = () => {
  const router = useRouter()
  const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      router.push("/login");
    }
}