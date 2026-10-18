import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";

export const revalidate = 0;

export default async function StallPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const { data: stall } = await supabase
    .from("stalls")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  if (!stall) notFound();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("stall_id", stall.id)
    .order("created_at", { ascending: false });

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/" className="text-muted text-sm">
        ← بازگشت به بازار
      </Link>
      <div className="font-mono text-xs text-muted mt-6 mb-2">
        {stall.city} · {stall.category}
      </div>
      <h1 className="font-display text-4xl text-cream mb-4">{stall.name}</h1>
      <p className="text-muted mb-10">{stall.description}</p>

      <div className="space-y-4">
        {(products || []).length === 0 && (
          <p className="text-muted text-sm">
            این دکه هنوز محصولی ثبت نکرده.
          </p>
        )}
        {(products || []).map((p) => (
          <div
            key={p.id}
            className="bg-card border border-white/10 rounded-2xl overflow-hidden"
          >
            {p.image_url && (
              <img
                src={p.image_url}
                alt={p.name}
                className="w-full h-56 object-cover"
              />
            )}
            <div className="p-6">
              <h3 className="text-cream font-bold">{p.name}</h3>
              {p.price && (
                <div className="font-mono text-goldBright text-sm mt-1">
                  {p.price}
                </div>
              )}
              {p.description && (
                <p className="text-muted text-sm mt-2">{p.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
