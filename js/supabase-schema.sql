-- =========================================================
-- Stay Carletonville — Supabase schema
-- Run this in Supabase Dashboard > SQL Editor (whole file at once)
-- =========================================================

-- ---------- 1. OWNER PROFILES ----------
-- Extra info about each B&B owner, linked 1:1 to auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  business_name text,
  contact_person text,
  phone text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Owners can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Owners can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Owners can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create a profile row whenever a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, business_name, contact_person, phone)
  values (
    new.id,
    new.raw_user_meta_data->>'business_name',
    new.raw_user_meta_data->>'contact_person',
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ---------- 2. LISTINGS ----------
create table if not exists public.listings (
  id bigint generated always as identity primary key,
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  location text not null,
  description text,
  price numeric not null,
  image text,                 -- main image URL (Supabase Storage public URL)
  amenities text[] default '{}',
  phone text,
  maps text,
  gallery text[] default '{}',
  status text default 'pending', -- pending | approved | rejected
  created_at timestamptz default now()
);

alter table public.listings enable row level security;

-- Public (anon) can read only approved listings -> powers listings.html
create policy "Anyone can view approved listings"
  on public.listings for select
  using (status = 'approved');

-- Owners can view their own listings regardless of status -> dashboard
create policy "Owners can view their own listings"
  on public.listings for select
  using (auth.uid() = owner_id);

create policy "Owners can insert their own listings"
  on public.listings for insert
  with check (auth.uid() = owner_id);

create policy "Owners can update their own listings"
  on public.listings for update
  using (auth.uid() = owner_id);

create policy "Owners can delete their own listings"
  on public.listings for delete
  using (auth.uid() = owner_id);


-- ---------- 3. ROOMS ----------
create table if not exists public.rooms (
  id bigint generated always as identity primary key,
  listing_id bigint not null references public.listings(id) on delete cascade,
  name text not null,
  beds int default 1,
  guests int default 1,
  price numeric not null,
  description text,
  images text[] default '{}',
  created_at timestamptz default now()
);

alter table public.rooms enable row level security;

create policy "Anyone can view rooms of approved listings"
  on public.rooms for select
  using (
    exists (
      select 1 from public.listings l
      where l.id = rooms.listing_id and l.status = 'approved'
    )
  );

create policy "Owners can view rooms of their own listings"
  on public.rooms for select
  using (
    exists (
      select 1 from public.listings l
      where l.id = rooms.listing_id and l.owner_id = auth.uid()
    )
  );

create policy "Owners can manage rooms of their own listings"
  on public.rooms for all
  using (
    exists (
      select 1 from public.listings l
      where l.id = rooms.listing_id and l.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.listings l
      where l.id = rooms.listing_id and l.owner_id = auth.uid()
    )
  );


-- ---------- 4. STORAGE (listing images) ----------
insert into storage.buckets (id, name, public)
values ('listing-images', 'listing-images', true)
on conflict (id) do nothing;

create policy "Public can view listing images"
  on storage.objects for select
  using (bucket_id = 'listing-images');

create policy "Authenticated users can upload listing images"
  on storage.objects for insert
  with check (bucket_id = 'listing-images' and auth.role() = 'authenticated');

create policy "Owners can update their own uploaded images"
  on storage.objects for update
  using (bucket_id = 'listing-images' and owner = auth.uid());

create policy "Owners can delete their own uploaded images"
  on storage.objects for delete
  using (bucket_id = 'listing-images' and owner = auth.uid());

-- =========================================================
-- Notes:
-- * New listings default to status = 'pending' so you can review
--   them before they appear publicly. Approve them by running:
--   update public.listings set status = 'approved' where id = <id>;
--   (or build that into the dashboard later if you want self-publish)
-- * Image URLs are the public Storage URLs returned after upload,
--   e.g. https://<project>.supabase.co/storage/v1/object/public/listing-images/<path>
-- =========================================================
