// Dados do projeto Supabase

const SUPABASE_URL = "https://fvtudjpggtjzohzzxyuq.supabase.co";

const SUPABASE_KEY = "sb_publishable_1GjSByVfeBgN84iwIJivJw_AHsEsLlB";

// Criando conexão com o banco

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Supabase conectado!");