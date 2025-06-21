export default function Login() {
  return (
    <div className="flex items-center justify-center bg-black px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 w-full max-w-sm text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Welcome Back
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Sign in to access your dashboard
        </p>

        <button
          className="flex items-center justify-center w-full py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition text-sm sm:text-base"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google icon"
            className="w-5 h-5 mr-3"
          />
          <span className="text-gray-700 font-medium">Sign in with Google</span>
        </button>

        <p className="text-xs text-gray-400 px-2">
          By signing in, you agree to our{" "}
          <a href="#" className="underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}