import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const revalidate = 0;

export default async function HomePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: stalls } = await supabase
    .from("stalls")
    .select("id, name, city, category, description")
    .order("created_at", { ascending: false })
    .limit(12);

  return (
    <main>
      <nav className="border-b border-white/10 sticky top-0 bg-bg/85 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl text-cream">
            جهان‌بازار
          </Link>
          {user ? (
            <Link
              href="/dashboard"
              className="px-5 py-2 rounded-full border border-gold text-goldBright text-sm font-bold"
            >
              پنل من
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-muted text-sm">
                ورود
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2 rounded-full border border-gold text-goldBright text-sm font-bold"
              >
                دکه‌ت رو باز کن
              </Link>
            </div>
          )}
        </div>
      </nav>

      <header className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-5xl text-cream mb-5 leading-tight">
          بازار جهان از یک <span className="text-goldBright">دکه</span> شروع
          می‌شه
        </h1>
        <p className="text-muted mb-9">
          کسب‌وکارت رو در جهان‌بازار بساز، محصولاتت رو نشون بده، و بذار
          مشتری‌ها از هر گوشه‌ی دنیا پیدات کنن.
        </p>
        <Link
          href={user ? "/dashboard" : "/signup"}
          className="inline-block px-8 py-3.5 rounded-full bg-goldBright text-bg font-bold"
        >
          {user ? "رفتن به پنل من" : "شروع رایگان"}
        </Link>
      </header>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="font-display text-3xl text-cream mb-8">
          دکه‌های بازار
        </h2>

        {stalls && stalls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stalls.map((s) => (
              <Link
                key={s.id}
                href={`/stall/${s.id}`}
                className="block bg-card border border-white/10 rounded-2xl p-6 hover:border-teal hover:bg-cardHi transition"
              >
                <div className="font-mono text-xs text-muted mb-3">
                  {s.city}
                </div>
                <h3 className="text-xl text-cream font-extrabold mb-1">
                  {s.name}
                </h3>
                <div className="text-muted text-sm mb-3">{s.category}</div>
                {s.description && (
                  <p className="text-muted text-sm line-clamp-2">
                    {s.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-muted border border-dashed border-white/15 rounded-2xl p-12 text-center">
            هنوز دکه‌ای ثبت نشده. اولین نفر باش!
          </div>
        )}
      </section>
    </main>
  );
}
