import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://qlfninkswqvdvfvwftbz.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsZm5pbmtzd3F2ZHZmdndmdGJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3Njg5MDQsImV4cCI6MjAyOTM0NDkwNH0.urBJURC_IModfBchnbNlSDAHbZWEUvdxcffaWzF4uRY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
