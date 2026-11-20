-- Run once in Supabase → SQL Editor. Then run seed.sql to load the
-- existing gallery and lyrics. Columns are quoted camelCase so rows come
-- back in the same shape the app used with the old JSON files.
--
-- RLS is on with no policies: only the server (service role key) can
-- read or write. The browser never talks to Supabase directly.

create table if not exists reverb_attendees (
  "id"         text primary key,
  "ticketCode" text not null unique,
  "fullName"   text not null,
  "gender"     text,
  "email"      text not null,
  "phone"      text,
  "city"       text,
  "checkedIn"  boolean not null default false,
  "createdAt"  timestamptz not null default now()
);

create table if not exists subscribers (
  "id"           text primary key,
  "email"        text not null unique,
  "subscribedAt" timestamptz not null default now()
);

create table if not exists gallery (
  "id"        text primary key,
  "title"     text not null,
  "category"  text,
  "imageUrl"  text not null,
  "caption"   text,
  "date"      text,
  "featured"  boolean not null default false,
  "span"      text,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz
);

create table if not exists lyrics (
  "id"          text primary key,
  "title"       text not null,
  "category"    text,
  "album"       text,
  "releaseYear" text,
  "youtubeUrl"  text,
  "lyrics"      text,
  "featured"    boolean not null default false,
  -- Live highlight timings, set from the admin Sync tool. See src/lib/lyricsSync.js
  "lyricTimings" jsonb,
  "createdAt"   timestamptz not null default now(),
  "updatedAt"   timestamptz
);

-- For databases created before lyric sync existed
alter table lyrics add column if not exists "lyricTimings" jsonb;

alter table reverb_attendees enable row level security;
alter table subscribers      enable row level security;
alter table gallery          enable row level security;
alter table lyrics           enable row level security;

-- ===================================================================
-- ADMIN ACCESS: email one-time codes instead of a shared password
-- ===================================================================
-- Only emails listed in admin_users can request a login code. Manage the
-- list from the dashboard's Admins tab, or here. Emails are stored lower-case.
create table if not exists admin_users (
  "email"     text primary key,
  "addedBy"   text,
  "createdAt" timestamptz not null default now()
);

-- One row per code sent. Only a keyed hash of the code is stored, never
-- the code itself. A code is single-use, expires, and locks after 5 misses.
create table if not exists admin_login_codes (
  "id"        bigint generated always as identity primary key,
  "email"     text not null,
  "codeHash"  text not null,
  "attempts"  integer not null default 0,
  "expiresAt" timestamptz not null,
  "usedAt"    timestamptz,
  "createdAt" timestamptz not null default now()
);

create index if not exists admin_login_codes_email_created
  on admin_login_codes ("email", "createdAt" desc);

alter table admin_users       enable row level security;
alter table admin_login_codes enable row level security;

-- The first admins. Re-running this file will not duplicate them.
insert into admin_users ("email", "addedBy") values
  ('isaacchukwuka67@gmail.com', 'initial setup'),
  ('cyberzikk1@gmail.com',      'initial setup')
on conflict ("email") do nothing;
