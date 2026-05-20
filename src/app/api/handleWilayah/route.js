import { supabase } from "../../lib/supabase/supabase";

export async function findWilayah(namaWilayah) {
    return await supabase
        .from("wilayah")
        .select("*")
        .eq("nama_wilayah", namaWilayah)
        .single();
}

export async function createWilayah(data) {
    return await supabase
        .from("wilayah")
        .insert([data])
        .select()
        .single();
}