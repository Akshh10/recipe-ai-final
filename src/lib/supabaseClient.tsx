import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ktaxlcmfhoihgvopxjee.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0YXhsY21maG9paGd2b3B4amVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3ODc1NTksImV4cCI6MjA2MDM2MzU1OX0.9VXHXxFuKVqfl_FLjtEIDcH_vUCqfgL5UqGlVJLOXkI';

export const supabase = createClient(supabaseUrl, supabaseKey);
