"use client";

import { useProtectPage } from "../hooks/useProtectPage";

export default function Dashboard () {
  useProtectPage()

  return (
    <div>
      Dashboard
    </div>
  )
}