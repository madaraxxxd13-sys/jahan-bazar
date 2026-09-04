"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <main className="max-w-md mx-auto px-6 py-28 text-center">
        <h1 className="font-display text-3xl text-cream mb-4">
          ایمیلت رو چک کن
        </h1>
        <p className="text-muted">
          یه لینک تأیید برات فرستادیم. بعد از تأیید می‌تونی وارد بشی و
          دکه‌ت رو بسازی.
        </p>
        <Link href="/login" className="text-goldBright block mt-6">
          رفتن به صفحه‌ی ورود
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-md mx-auto px-6 py-28">
      <h1 className="font-display text-3xl text-cream mb-2">ساخت حساب</h1>
      <p className="text-muted mb-8">
        برای باز کردن دکه‌ت، اول یه حساب بساز.
      </p>
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
            minLength={6}
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
          {loading ? "..." : "ساخت حساب"}
        </button>
      </form>
      <p className="text-muted text-sm mt-6">
        حساب داری؟{" "}
        <Link href="/login" className="text-goldBright">
          وارد شو
        </Link>
      </p>
    </main>
  );
}
