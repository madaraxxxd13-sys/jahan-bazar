"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createStall(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase.from("stalls").insert({
    owner_id: user.id,
    name: formData.get("name"),
    city: formData.get("city"),
    category: formData.get("category"),
    description: formData.get("description"),
  });

  revalidatePath("/dashboard");
}

export async function addProduct(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const price = formData.get("price");

  let imageUrl: string | null = null;
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage
      .from("images")
      .upload(path, file, { contentType: file.type });
    if (!error) {
      imageUrl = supabase.storage.from("images").getPublicUrl(path).data
        .publicUrl;
    }
  }

  await supabase.from("products").insert({
    stall_id: formData.get("stall_id"),
    name: formData.get("name"),
    price: price ? Number(price) : null,
    description: formData.get("description"),
    image_url: imageUrl,
  });

  revalidatePath("/dashboard");
}

export async function deleteProduct(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase.from("products").delete().eq("id", formData.get("id"));

  revalidatePath("/dashboard");
}

export async function signOutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
