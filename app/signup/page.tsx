import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const user = await getCurrentUser();
  if (user) {
    redirect(user.isSuperAdmin ? "/dashboard" : "/user-dashboard");
  }

  const params = await searchParams;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4">
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign up to access member features and services
        </p>
        {params.error ? (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {params.error === "exists"
              ? "Email already registered. Try logging in instead."
              : params.error === "mismatch"
                ? "Password and confirm password do not match."
                : params.error === "weak"
                  ? "Password must be at least 8 characters."
                  : params.error === "missing"
                    ? "Please fill in all required fields."
                    : "Something went wrong. Please try again."}
          </p>
        ) : null}
        <form action="/api/auth/signup" method="post" className="mt-6 space-y-4">
          <label className="block text-sm font-semibold text-slate-700">
            Full Name
            <input
              name="name"
              type="text"
              required
              placeholder="John Doe"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            Email
            <input
              name="email"
              type="email"
              required
              placeholder="john@example.com"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            Password
            <input
              name="password"
              type="password"
              required
              placeholder="At least 8 characters"
              minLength={8}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            Confirm Password
            <input
              name="confirmPassword"
              type="password"
              required
              placeholder="Confirm your password"
              minLength={8}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-orange-500 hover:text-orange-600">
            Log in here
          </a>
        </p>
      </div>
    </main>
  );
}
