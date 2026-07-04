-- =========================================================
-- Stay Carletonville — Schema v2
-- Run in Supabase SQL Editor
-- =========================================================

-- ---------- ADMIN FLAG ----------
alter table public.profiles
    add column if not exists is_admin boolean default false;

-- Set yourself as admin (replace with your actual auth user id):
-- update public.profiles set is_admin = true where id = 'YOUR-USER-UUID';
-- Find your UUID: Authentication > Users in Supabase dashboard.

-- ---------- EVENTS ----------
create table if not exists public.events (
    id          bigint generated always as identity primary key,
    title       text not null,
    description text,
    date        date,
    end_date    date,
    location    text,
    image       text,
    link        text,
    featured    boolean default false,
    status      text default 'active',  -- active | inactive
    created_at  timestamptz default now()
);

alter table public.events enable row level security;

create policy "Anyone can view active events"
    on public.events for select
    using (status = 'active');

create policy "Admins can manage events"
    on public.events for all
    using (
        exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
    )
    with check (
        exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
    );

grant select on public.events to anon;
grant all    on public.events to authenticated;
grant usage  on sequence public.events_id_seq to authenticated;

-- ---------- RESTAURANTS ----------
create table if not exists public.restaurants (
    id          bigint generated always as identity primary key,
    name        text not null,
    description text,
    location    text,
    phone       text,
    maps        text,
    image       text,
    cuisine     text,
    price_range text,  -- e.g. "R50–R150 per person"
    status      text default 'active',
    created_at  timestamptz default now()
);

alter table public.restaurants enable row level security;

create policy "Anyone can view active restaurants"
    on public.restaurants for select
    using (status = 'active');

create policy "Admins can manage restaurants"
    on public.restaurants for all
    using (
        exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
    )
    with check (
        exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
    );

grant select on public.restaurants to anon;
grant all    on public.restaurants to authenticated;
grant usage  on sequence public.restaurants_id_seq to authenticated;

-- ---------- NIGHTLIFE ----------
create table if not exists public.nightlife (
    id          bigint generated always as identity primary key,
    name        text not null,
    description text,
    location    text,
    phone       text,
    maps        text,
    image       text,
    type        text,   -- e.g. "Bar", "Club", "Live Music"
    status      text default 'active',
    created_at  timestamptz default now()
);

alter table public.nightlife enable row level security;

create policy "Anyone can view active nightlife"
    on public.nightlife for select
    using (status = 'active');

create policy "Admins can manage nightlife"
    on public.nightlife for all
    using (
        exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
    )
    with check (
        exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
    );

grant select on public.nightlife to anon;
grant all    on public.nightlife to authenticated;
grant usage  on sequence public.nightlife_id_seq to authenticated;

-- ---------- ATTRACTIONS ----------
create table if not exists public.attractions (
    id          bigint generated always as identity primary key,
    name        text not null,
    description text,
    location    text,
    phone       text,
    maps        text,
    image       text,
    entry_fee   text,   -- e.g. "Free" or "R50 adults"
    status      text default 'active',
    created_at  timestamptz default now()
);

alter table public.attractions enable row level security;

create policy "Anyone can view active attractions"
    on public.attractions for select
    using (status = 'active');

create policy "Admins can manage attractions"
    on public.attractions for all
    using (
        exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
    )
    with check (
        exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
    );

grant select on public.attractions to anon;
grant all    on public.attractions to authenticated;
grant usage  on sequence public.attractions_id_seq to authenticated;

-- =========================================================
-- After running this file:
-- 1. Go to Authentication > Users, copy your UUID
-- 2. Run: update public.profiles set is_admin = true where id = 'YOUR-UUID';
-- =========================================================
