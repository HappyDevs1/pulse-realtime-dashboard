import Login from "@/app/pages/auth/login"

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-5 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl">Pulse Realtime Dashboard</h1>
      <div className="flex flex-col items-center justify-center py-5">
        <Login />
      </div>
    </div>
  );
}
