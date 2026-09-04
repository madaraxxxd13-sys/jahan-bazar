-- اجرای این فایل در Supabase: بخش SQL Editor پروژه‌ت
-- جدول دکه‌ها (کسب‌وکارها)
create table if not exists stalls (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  city text not null,
  category text not null,
  description text,
  created_at timestamptz default now()
);

-- جدول محصولات هر دکه
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  stall_id uuid references stalls(id) on delete cascade not null,
  name text not null,
  price numeric,
  description text,
  created_at timestamptz default now()
);

alter table stalls enable row level security;
alter table products enable row level security;

-- همه می‌تونن دکه‌ها و محصولات رو ببینن (صفحه‌ی عمومی بازار)
create policy "Public read stalls" on stalls
  for select using (true);

create policy "Public read products" on products
  for select using (true);

-- فقط صاحب دکه می‌تونه دکه‌ی خودش رو بسازه/ویرایش/حذف کنه
create policy "Owners insert stall" on stalls
  for insert with check (auth.uid() = owner_id);

create policy "Owners update stall" on stalls
  for update using (auth.uid() = owner_id);

create policy "Owners delete stall" on stalls
  for delete using (auth.uid() = owner_id);

-- فقط صاحب دکه می‌تونه محصولات دکه‌ی خودش رو مدیریت کنه
create policy "Owners insert products" on products
  for insert with check (
    auth.uid() = (select owner_id from stalls where id = stall_id)
  );

create policy "Owners update products" on products
  for update using (
    auth.uid() = (select owner_id from stalls where id = stall_id)
  );

create policy "Owners delete products" on products
  for delete using (
    auth.uid() = (select owner_id from stalls where id = stall_id)
  );
