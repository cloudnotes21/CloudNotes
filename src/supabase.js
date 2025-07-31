import { createClient } from '@supabase/supabase-js';

// यहाँ अपनी Supabase URL और Key डालें
const supabaseUrl = 'https://wglfetsytleolpjinuea.supabase.co'; // इसे अपने Supabase प्रोजेक्ट की URL से बदलें
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnbGZldHN5dGxlb2xwamludWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4ODQ3ODksImV4cCI6MjA2OTQ2MDc4OX0.alpn3OFFYvuDiZ84jqmLmjuRGNxl8qDICiKTg32QhJw'; // इसे अपने Supabase प्रोजेक्ट की anon key से बदलें

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


