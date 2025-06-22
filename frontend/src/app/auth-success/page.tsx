"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthSuccess() {
  const router = useRouter();

  const handleParseCookie = async () => {
    try {
      const token = new URLSearchParams(window.location.search).get("token");

      console.log(token);

      if (token) {
        sessionStorage.setItem("token", token);
        document.cookie = `token=${token}; path=/; max-age=3600; secure; samesite=strict`;
      } else {
        console.log("Failure to save token");
      }
    } catch (error) {
      console.error("Error in useState");
    }

    router.push("/dashboard")
  };

  useEffect(() => {
    setTimeout(handleParseCookie, 3000);
  }, []);

  return (
    <div>
      <h2 className="text-green-400">Redirecting to Dashboard...</h2>
    </div>
  );
}
