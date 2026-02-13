import { createClient } from '@supabase/supabase-js';

// ------------------------------------------------------------------
// CONFIGURAÇÃO DO SUPABASE
// ------------------------------------------------------------------
// ⚠️ ATENÇÃO: Use apenas a 'Publishable Key' aqui. 
// Nunca coloque a 'Secret Key' (service_role) no front-end.

const supabaseUrl = 'https://yakmsnadietjagzrctyp.supabase.co'; 
const supabaseKey = 'sb_publishable_JnzduU-F6qpkX82P8G1o5A_WHj_dh5v'; 

export const supabase = createClient(supabaseUrl, supabaseKey);