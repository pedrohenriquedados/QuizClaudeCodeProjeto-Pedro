-- Endurecimento do banco do leaderboard. Rode UMA vez no SQL Editor do Supabase.
-- A policy de INSERT é aberta a qualquer visitante (chave anon); estas regras impedem
-- que dados absurdos ou maliciosos entrem no ranking, mesmo enviados direto pela API.

alter table leaderboard_entries
  drop constraint if exists level_played_valid,
  drop constraint if exists score_within_total,
  drop constraint if exists total_questions_valid,
  drop constraint if exists player_name_not_blank,
  drop constraint if exists player_email_len,
  drop constraint if exists total_time_valid;

alter table leaderboard_entries
  add constraint level_played_valid
    check (level_played in ('iniciante', 'intermediario', 'avancado', 'todos')),
  add constraint score_within_total
    check (score <= total_questions),
  add constraint total_questions_valid
    check (total_questions between 1 and 100),
  add constraint player_name_not_blank
    check (btrim(player_name) <> ''),
  add constraint player_email_len
    check (player_email is null or char_length(player_email) <= 120),
  -- o app dá no máximo 20s por pergunta
  add constraint total_time_valid
    check (total_time_seconds <= total_questions * 20);

-- Índice para a ordenação do ranking (score desc, tempo asc) e para a contagem de posição.
create index if not exists leaderboard_rank_idx
  on leaderboard_entries (score desc, total_time_seconds asc);
