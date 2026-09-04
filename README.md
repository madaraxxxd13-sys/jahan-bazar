# جهان‌بازار

یه اپ کامل Next.js با ثبت‌نام، ورود، و پنل کاربری برای اینکه صاحب‌کسب‌وکارها «دکه»شون رو بسازن و توی بازار عمومی دیده بشن.

این راهنما رو دقیقاً قدم‌به‌قدم دنبال کن. هیچ‌کدوم از سرویس‌ها هزینه‌ای ندارن (در حد استفاده‌ی یه سایت کوچیک).

---

## قدم ۱ — ساخت پروژه‌ی Supabase (پایگاه‌داده + احراز هویت)

1. برو به [supabase.com](https://supabase.com) و با ایمیل یا گیت‌هاب ثبت‌نام کن.
2. یه پروژه‌ی جدید (New Project) بساز. یه رمز عبور برای دیتابیس انتخاب کن و ذخیره‌ش کن.
3. وقتی پروژه ساخته شد، از منوی سمت چپ برو به **SQL Editor**.
4. محتوای فایل `supabase/schema.sql` (همین پوشه) رو کامل کپی کن، توی SQL Editor بچسبون و روی **Run** بزن. این کار جدول‌های `stalls` و `products` رو با تنظیمات امنیتی درست می‌سازه.
5. از منوی سمت چپ برو به **Settings → API**. دو مقدار زیر رو کپی کن:
   - **Project URL**
   - **anon public key**

## قدم ۲ — اجرای محلی (اختیاری، برای تست قبل از انتشار)

1. مطمئن شو Node.js نصبه (نسخه ۱۸ به بالا).
2. توی پوشه‌ی پروژه:
   ```bash
   npm install
   cp .env.local.example .env.local
   ```
3. فایل `.env.local` رو باز کن و مقادیر `NEXT_PUBLIC_SUPABASE_URL` و `NEXT_PUBLIC_SUPABASE_ANON_KEY` رو با چیزی که از Supabase کپی کردی جایگزین کن.
4. اجرا کن:
   ```bash
   npm run dev
   ```
5. برو به `http://localhost:3000`

## قدم ۳ — آپلود کد روی گیت‌هاب

1. یه ریپازیتوری جدید (Private یا Public) توی [github.com](https://github.com) بساز.
2. توی پوشه‌ی پروژه:
   ```bash
   git init
   git add .
   git commit -m "جهان‌بازار - نسخه‌ی اول"
   git branch -M main
   git remote add origin <آدرس ریپازیتوری‌ات>
   git push -u origin main
   ```

## قدم ۴ — انتشار روی Vercel (رایگان)

1. برو به [vercel.com](https://vercel.com) و با گیت‌هاب وارد شو.
2. روی **Add New → Project** بزن و ریپازیتوری‌ای که ساختی رو انتخاب کن.
3. توی بخش **Environment Variables** همون دو مقدار Supabase رو اضافه کن:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. روی **Deploy** بزن. بعد از چند دقیقه یه آدرس عمومی مثل `jahan-bazar.vercel.app` بهت میده.

## قدم ۵ — تنظیم آدرس بازگشت در Supabase (برای تأیید ایمیل)

1. توی Supabase برو به **Authentication → URL Configuration**.
2. مقدار **Site URL** رو بذار روی آدرس Vercel‌ت (مثلاً `https://jahan-bazar.vercel.app`).
3. توی **Redirect URLs** این رو هم اضافه کن:
   `https://jahan-bazar.vercel.app/auth/callback`

بعد از این مرحله، ایمیل‌های تأیید ثبت‌نام کاربرها درست کار می‌کنن.

---

## ساختار پروژه

- `app/page.tsx` — صفحه‌ی اصلی و فهرست عمومی دکه‌ها
- `app/signup`, `app/login` — ثبت‌نام و ورود
- `app/dashboard` — پنل کاربری برای ساخت دکه و مدیریت محصولات
- `app/stall/[id]` — صفحه‌ی عمومی هر دکه
- `supabase/schema.sql` — ساختار دیتابیس

## قدم بعدی‌های پیشنهادی

- افزودن آپلود عکس برای دکه‌ها و محصولات (با Supabase Storage)
- اتصال درگاه پرداخت واقعی (مثل Stripe)
- افزودن دامنه‌ی اختصاصی خودت به‌جای آدرس vercel.app (از تنظیمات Vercel)
