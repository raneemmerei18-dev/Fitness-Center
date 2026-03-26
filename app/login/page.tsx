import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function LoginPage({
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
        <h1 className="text-2xl font-bold text-slate-900">Login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Admin: admin@fitmotion.local / Admin@123 | Editor: editor@fitmotion.local / Editor@123
        </p>
        {params.error ? (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            Invalid email or password.
          </p>
        ) : null}
        <form action="/api/auth/login" method="post" className="mt-6 space-y-4">
          <label className="block text-sm font-semibold text-slate-700">
            Email
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            Password
            <input
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <a href="/signup" className="font-semibold text-orange-500 hover:text-orange-600">
            Sign up here
          </a>
        </p>
      </div>
    </main>
  );
}
