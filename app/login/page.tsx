"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="max-w-md mx-auto px-6 py-28">
      <h1 className="font-display text-3xl text-cream mb-2">ورود</h1>
      <p className="text-muted mb-8">به دکه‌ت خوش برگشتی.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-muted mb-2">ایمیل</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-card border border-white/10 rounded-lg px-4 py-3 text-cream focus:border-teal outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-muted mb-2">رمز عبور</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-card border border-white/10 rounded-lg px-4 py-3 text-cream focus:border-teal outline-none"
          />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          disabled={loading}
          className="w-full py-3 rounded-full bg-goldBright text-bg font-bold disabled:opacity-50"
        >
          {loading ? "..." : "ورود"}
        </button>
      </form>
      <p className="text-muted text-sm mt-6">
        حساب نداری؟{" "}
        <Link href="/signup" className="text-goldBright">
          بساز
        </Link>
      </p>
    </main>
  );
}
