import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://rljgpjrntcyhaotxqyyx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsamdwanJudGN5aGFvdHhxeXl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxMDgxNTEsImV4cCI6MjA1MTY4NDE1MX0.KikfJ9_JwTeEXJbZQyPtbSMul8og4JsJkRkKk1zw_w8')


export const getImage = async (path: string) => {
    const { data } = supabase.storage
    .from('bucket')
    .getPublicUrl(path);

    return data;
}