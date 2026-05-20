import { NextResponse } from "next/server";
import { supabaseAdmin }
    from "../../lib/supabase/supabaseAdmin";

export async function GET() {

    try {

        const {
            data,
            error,
        } = await supabaseAdmin
            .from("sensor_history")
            .select(`
                id_history,
                water_level,
                tanggal_history,
                status,
                sensor (
                    kecamatan (
                        nama_Wilayah
                    )
                )
            `)
            .order(
                "tanggal_history",
                { ascending: false }
            );

        if (error) {

            return NextResponse.json(
                {
                    error: error.message,
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
                error: error.message,
            },
            {
                status: 500,
            }
        );
    }
}