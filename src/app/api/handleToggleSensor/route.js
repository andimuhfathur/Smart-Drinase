import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../lib/supabase/supabaseAdmin";

export async function POST(req) {

    try {

        const {
            id_sensor,
            is_active
        } = await req.json();

        const { error } =
            await supabaseAdmin
                .from("sensor")
                .update({
                    is_active,
                })
                .eq("id_sensor", id_sensor);

        if (error) {
            throw error;
        }

        return NextResponse.json({
            success: true,
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