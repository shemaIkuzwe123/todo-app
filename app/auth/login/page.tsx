import LoginButton from "@/components/LoginButton"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-900">Welcome</h1>
        <p className="text-center text-gray-600">Sign in to your account</p>
        <LoginButton />
      </div>
    </main>
  )
}

