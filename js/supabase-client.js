
const SUPABASE_URL = "https://uadexruohhddnidigcqo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhZGV4cnVvaGhkZG5pZGlnY3FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODM4MjQsImV4cCI6MjA5ODA1OTgyNH0.vZEK7yenO9erPVDDL2lIl-um6hRUgpvZEs6hWEclYPU";

if (window.supabase && typeof window.supabase.createClient === "function") {
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    window.supabase = window.supabaseClient;
} else {
    console.error("Supabase SDK failed to load. Please ensure the CDN script is included before this file.");
}
