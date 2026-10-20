import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { saveCity, signOutAction } from "./actions";

export const revalidate = 0;

const CITIES = [
  "لاهیجان",
  "رشت",
  "لنگرود",
  "رودسر",
  "تهران",
  "اصفهان",
  "شیراز",
  "مشهد",
  "تبریز",
  "کرج",
  "قم",
  "اهواز",
];

export default async function MePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("city")
    .eq("id", user.id)
    .maybeSingle();

  const { data: stall } = await supabase
    .from("stalls")
    .select("id, name")
    .eq("owner_id", user.id)
    .maybeSingle();

  return (
    <main className="max-w-xl mx-auto px-6 py-12">
      <Link href="/" className="text-muted text-sm">
        ← بازگشت به بازار
      </Link>

      <h1 className="font-display text-3xl text-cream mt-6 mb-2">حساب من</h1>
      <p className="text-muted text-sm mb-8" dir="ltr" style={{ textAlign: "right" }}>
        {user.email}
      </p>

      <div className="bg-card border border-white/10 rounded-2xl p-6 mb-6">
        <h2 className="text-cream font-bold mb-4">شهر من</h2>
        <form action={saveCity} className="space-y-4">
          <input
            name="city"
            list="cities"
            defaultValue={profile?.city || ""}
            placeholder="مثلاً لاهیجان"
            className="w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-cream focus:border-teal outline-none"
          />
          <datalist id="cities">
            {CITIES.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
          <button className="px-6 py-3 rounded-full bg-goldBright text-bg font-bold">
            ذخیره‌ی شهر
          </button>
        </form>
      </div>

      <div className="bg-card border border-white/10 rounded-2xl divide-y divide-white/10 mb-6">
        <Link
          href="/dashboard"
          className="block px-6 py-4 text-cream hover:bg-cardHi"
        >
          {stall ? `پنل دکه‌ی ${stall.name}` : "ساخت دکه"}
        </Link>
        {stall && (
          <Link
            href={`/stall/${stall.id}`}
            className="block px-6 py-4 text-cream hover:bg-cardHi"
          >
            دیدن صفحه‌ی عمومی دکه
          </Link>
        )}
      </div>

      <form action={signOutAction}>
        <button className="w-full px-6 py-3 rounded-full border border-white/15 text-muted">
          خروج از حساب
        </button>
      </form>
    </main>
  );
}
