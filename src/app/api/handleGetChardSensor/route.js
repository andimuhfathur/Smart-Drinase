import { NextResponse } from "next/server";

import { supabaseAdmin }
    from "../../lib/supabase/supabaseAdmin";

export async function POST(req) {

    try {

        const body =
            await req.json();

        const {
            kecamatan_id,
        } = body;

        // =========================
        // AMBIL SENSOR
        // =========================

        const {
            data: sensor,
            error: sensorError,
        } = await supabaseAdmin
            .from("sensor")
            .select("*")
            .eq(
                "kecamatan_id",
                kecamatan_id
            )
            .single();

        if (
            sensorError ||
            !sensor
        ) {

            return NextResponse.json({
                data: [],
                message:
                    "Wilayah belum memiliki sensor",
            });
        }

        // =========================
        // HISTORY
        // =========================

        const {
            data,
            error,
        } = await supabaseAdmin
            .from("sensor_history")
            .select("*")
            .eq(
                "sensor_id",
                sensor.id_sensor
            )
            .order(
                "tanggal_history",
                {
                    ascending: true,
                }
            )
            .limit(10);

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

        const latestHistory =
            data.length > 0
                ? data[data.length - 1]
                : null;

        return NextResponse.json({
            data,
            latestHistory,
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