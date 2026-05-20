import { NextResponse } from "next/server";

import { supabaseAdmin }
    from "../../lib/supabase/supabaseAdmin";

export async function GET() {

    const {
        data,
        error
    } = await supabaseAdmin
        .from("kecamatan")
        .select("*")
        .order(
            "nama_Wilayah",
            {
                ascending: true
            }
        );

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

    return NextResponse.json(data);
}