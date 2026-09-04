import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { createStall, addProduct, deleteProduct, signOutAction } from "./actions";

export const revalidate = 0;

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: stall } = await supabase
    .from("stalls")
    .select("*")
    .eq("owner_id", user.id)
    .maybeSingle();

  let products: any[] = [];
  if (stall) {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("stall_id", stall.id)
      .order("created_at", { ascending: false });
    products = data || [];
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-10">
        <h1 className="font-display text-3xl text-cream">پنل دکه‌دار</h1>
        <form action={signOutAction}>
          <button className="text-muted text-sm">خروج</button>
        </form>
      </div>

      {!stall ? (
        <div className="bg-card border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl text-cream font-bold mb-6">
            هنوز دکه‌ای نساختی
          </h2>
          <form action={createStall} className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-2">
                اسم دکه
              </label>
              <input
                name="name"
                required
                className="w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-cream focus:border-teal outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">شهر</label>
              <input
                name="city"
                required
                className="w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-cream focus:border-teal outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">
                دسته‌بندی
              </label>
              <input
                name="category"
                required
                className="w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-cream focus:border-teal outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-2">
                توضیح کوتاه
              </label>
              <textarea
                name="description"
                className="w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-cream focus:border-teal outline-none"
              />
            </div>
            <button className="px-6 py-3 rounded-full bg-goldBright text-bg font-bold">
              ساخت دکه
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="bg-card border border-white/10 rounded-2xl p-8 mb-8">
            <div className="font-mono text-xs text-muted mb-2">
              {stall.city} · {stall.category}
            </div>
            <h2 className="text-2xl text-cream font-bold mb-2">
              {stall.name}
            </h2>
            <p className="text-muted">{stall.description}</p>
            <a
              href={`/stall/${stall.id}`}
              target="_blank"
              className="text-goldBright text-sm inline-block mt-4"
            >
              دیدن صفحه‌ی عمومی دکه ←
            </a>
          </div>

          <div className="bg-card border border-white/10 rounded-2xl p-8 mb-8">
            <h3 className="text-lg text-cream font-bold mb-4">
              افزودن محصول
            </h3>
            <form action={addProduct} className="space-y-4">
              <input type="hidden" name="stall_id" value={stall.id} />
              <div>
                <label className="block text-sm text-muted mb-2">
                  اسم محصول
                </label>
                <input
                  name="name"
                  required
                  className="w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-cream focus:border-teal outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-muted mb-2">
                  قیمت
                </label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  className="w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-cream focus:border-teal outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-muted mb-2">
                  توضیح
                </label>
                <textarea
                  name="description"
                  className="w-full bg-bg border border-white/10 rounded-lg px-4 py-3 text-cream focus:border-teal outline-none"
                />
              </div>
              <button className="px-6 py-3 rounded-full bg-goldBright text-bg font-bold">
                افزودن محصول
              </button>
            </form>
          </div>

          <div className="space-y-4">
            {products.length === 0 && (
              <p className="text-muted text-sm">هنوز محصولی اضافه نکردی.</p>
            )}
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-card border border-white/10 rounded-2xl p-6 flex justify-between items-center"
              >
                <div>
                  <h4 className="text-cream font-bold">{p.name}</h4>
                  {p.price && (
                    <div className="font-mono text-goldBright text-sm mt-1">
                      {p.price}
                    </div>
                  )}
                </div>
                <form action={deleteProduct}>
                  <input type="hidden" name="id" value={p.id} />
                  <button className="text-muted text-sm hover:text-red-400">
                    حذف
                  </button>
                </form>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
