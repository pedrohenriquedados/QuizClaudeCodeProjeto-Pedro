/* Cliente Supabase — usado apenas para o leaderboard (ver prd.md, seção 7.3).
   Preencha com as credenciais PÚBLICAS (URL + anon key) do seu projeto Supabase.
   Nunca coloque aqui a "service_role key". */

const SUPABASE_URL = "https://hvtomprqddubbdnyyden.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2dG9tcHJxZGR1YmJkbnl5ZGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0NDI2MjQsImV4cCI6MjEwNjAxODYyNH0.Vo8SW3cO6t0dGRXgEnunxVNmdapSV7X3PZBD3hH26qA";

const isSupabaseConfigured =
  typeof supabase !== "undefined" &&
  !SUPABASE_URL.includes("YOUR-PROJECT") &&
  !SUPABASE_ANON_KEY.includes("YOUR-ANON-KEY");

const supabaseClient = isSupabaseConfigured
  ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

/**
 * Salva o resultado de uma partida na tabela leaderboard_entries.
 * @param {{player_name: string, player_email: string|null, score: number, total_questions: number, level_played: string, total_time_seconds: number}} entry
 */
async function saveResultToLeaderboard(entry) {
  if (!supabaseClient) {
    return { error: new Error("Supabase não configurado (ver js/supabaseClient.js).") };
  }
  const { error } = await supabaseClient.from("leaderboard_entries").insert([entry]);
  return { error };
}

/**
 * Busca as melhores pontuações via a view pública (sem e-mail).
 * Ordenação: score DESC, total_time_seconds ASC.
 * @param {number} limit
 */
async function fetchLeaderboard(limit = 20) {
  if (!supabaseClient) {
    return { data: [], error: new Error("Supabase não configurado (ver js/supabaseClient.js).") };
  }
  const { data, error } = await supabaseClient
    .from("public_leaderboard")
    .select("*")
    .order("score", { ascending: false })
    .order("total_time_seconds", { ascending: true })
    .limit(limit);
  return { data: data || [], error };
}
