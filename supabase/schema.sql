-- Schema do leaderboard do Quiz Claude Code para Analytics Engineers.
-- Rode este script uma vez no SQL Editor do seu projeto Supabase.

create extension if not exists pgcrypto;

create table if not exists leaderboard_entries (
  id uuid primary key default gen_random_uuid(),
  player_name text not null check (char_length(player_name) between 1 and 40),
  player_email text,
  score int not null check (score >= 0),
  total_questions int not null check (total_questions > 0),
  level_played text not null, -- 'iniciante' | 'intermediario' | 'avancado' | 'todos'
  total_time_seconds int not null check (total_time_seconds >= 0),
  created_at timestamptz not null default now()
);

alter table leaderboard_entries enable row level security;

-- Qualquer pessoa (chave anon) pode inserir seu próprio resultado.
drop policy if exists "public can insert results" on leaderboard_entries;
create policy "public can insert results"
  on leaderboard_entries for insert
  to anon
  with check (true);

-- Propositalmente NÃO existe policy de SELECT para "anon" na tabela base:
-- isso impede que o e-mail seja lido publicamente pela API do Supabase.

-- View pública sem a coluna de e-mail, usada pelo frontend para exibir o ranking.
drop view if exists public_leaderboard;
create view public_leaderboard as
  select
    id,
    player_name,
    score,
    total_questions,
    level_played,
    total_time_seconds,
    created_at
  from leaderboard_entries
  order by score desc, total_time_seconds asc;

grant select on public_leaderboard to anon;
