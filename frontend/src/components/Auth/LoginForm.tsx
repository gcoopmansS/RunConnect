import { SignIn } from "@clerk/clerk-react";

const LoginForm = () => (
  <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center min-h-screen px-4">
    <div className="text-center mb-6">
      <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
        <span className="text-white font-bold text-3xl">RC</span>
      </div>
    </div>
    <div className="w-full bg-white/90 rounded-2xl shadow-lg p-0 md:p-0 flex flex-col items-center">
      <div className="w-full max-w-sm">
        <SignIn
          appearance={{
            elements: {
              card: "shadow-none bg-transparent p-200 border-0",
              rootBox: "border-0 shadow-none",
              formButtonPrimary:
                "bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:from-emerald-600 hover:via-blue-600 hover:to-purple-700 transition-all duration-200",
              headerTitle:
                "text-2xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent",
              headerSubtitle: "text-gray-600 text-base mb-4",
              formFieldInput:
                "block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md",
              formFieldLabel: "text-sm font-semibold text-gray-700 mb-2",
              footerAction: "text-center text-sm text-gray-600 mt-6",
              socialButtonsBlockButton:
                "bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold py-3 rounded-xl mb-2",
            },
          }}
          routing="path"
          path="/login"
        />
      </div>
    </div>
  </div>
);

export default LoginForm;
