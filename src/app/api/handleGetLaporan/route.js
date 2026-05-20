import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../lib/supabase/supabaseAdmin";

export async function POST(req) {

    try {

        const body = await req.json();

        const { user_id, role } = body;

        let query = supabaseAdmin
            .from("laporan")
            .select(`
                *,
                kecamatan (
                    nama_Wilayah,
                    latitude,
                    longitude
                )
            `)
            .order(
                "tanggal_laporan",
                {
                    ascending: false,
                }
        );
        
        

        // =========================
        // USER HANYA LIHAT PUNYA DIA
        // =========================

        if (role === "user") {

            query = query.eq(
                "user_id",
                user_id
            );
        }

        // admin & petugas
        // lihat semua

        const {
            data,
            error
        } = await query;

        if (error) {

            return NextResponse.json(
                {
                    error:
                        error.message,
                },
                {
                    status: 400,
                }
            );
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