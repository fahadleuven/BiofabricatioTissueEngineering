// supabase.js
const SUPABASE_URL = "https://vevxhbqkmxfekrapecbw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZldnhoYnFrbXhmZWtyYXBlY2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2Nzk1NjMsImV4cCI6MjA5MjI1NTU2M30.Ll1AhsQXcgXag15nDzGZVuQMrIxzF5XpCcaQo819lE4";

// attach to window so all pages can use it
window.supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
