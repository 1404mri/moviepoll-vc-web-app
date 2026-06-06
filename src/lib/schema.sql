create table if not exists poll_settings (
  id integer primary key default 1,
  is_closed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint single_poll_settings_row check (id = 1)
);

create table if not exists ballots (
  id bigserial primary key,
  voter_id text not null unique,
  display_name text not null,
  ranking text[] not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists ballots_display_name_unique_idx
  on ballots (lower(display_name));

insert into poll_settings (id, is_closed)
values (1, false)
on conflict (id) do nothing;
