import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../lib/supabase/supabaseAdmin";

export async function POST(req) {

    try {

        const { laporan_id } =
            await req.json();

        const { data, error } =
            await supabaseAdmin
                .from("laporan")
                .select(`
                    *,
                    kecamatan(
                        nama_Wilayah
                    )
                `)
                .eq(
                    "id_laporan",
                    laporan_id
                )
                .single();

        if (error) {
            throw error;
        }

        return NextResponse.json({
            data,
        });

    } catch (error) {

        return NextResponse.json(
            {
                error:
                    error.message,
            },
            {
                status: 500,
            }
        );
    }
}