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
  "createdAt"   timestamptz not null default now(),
  "updatedAt"   timestamptz
);

alter table reverb_attendees enable row level security;
alter table subscribers      enable row level security;
alter table gallery          enable row level security;
alter table lyrics           enable row level security;
