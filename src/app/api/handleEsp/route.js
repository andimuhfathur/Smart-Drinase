import { NextResponse } from "next/server";

import { supabaseAdmin }
    from "@/app/lib/supabase/supabaseAdmin";

export async function POST(req) {

    try {

        const body =
            await req.json();

        const {
            device_id,
            waterLevel,
            kecamatan_id,
        } = body;

        console.log(body);
        

        const water = Number(waterLevel);
        const deviceId = parseInt(device_id);
        const kecamatanId = parseInt(kecamatan_id);
        // =========================
        // VALIDASI
        // =========================

        if (
            !deviceId ||
            waterLevel == null ||
            !kecamatan_id
        ) {

            return NextResponse.json(
                {
                    error:
                        "Data tidak lengkap",
                },
                {
                    status: 400,
                }
            );
        }

        if (isNaN(water)) {

            return NextResponse.json(
                {
                    error:
                        "Water level tidak valid",
                },
                {
                    status: 400,
                }
            );
        }

        // =========================
        // STATUS
        // =========================

        let status = "Aman";

        if (water >= 10) {

            status = "Bahaya";

        } else if (
            water >= 6
        ) {

            status = "Waspada";
        }

        // =========================
        // UPDATE SENSOR TERBARU
        // =========================

        const {
            data: sensorData,
            error: sensorError,
        } = await supabaseAdmin
            .from("sensor")
                .update([
                {
                    kecamatan_id,
                    water_level: water,
                    status,
                },
            ]).eq("id_sensor", deviceId);

        if (sensorError) {
console.log(sensorError.message);

            return NextResponse.json(
                {
                    error:
                        sensorError.message,
                },
                {
                    status: 400,
                }
            );
        }

        // =========================
        // INSERT HISTORY
        // =========================

        const {
            error: historyError,
        } = await supabaseAdmin
            .from("sensor_history")
            .insert([
                {
                    sensor_id:
                        deviceId,

                    water_level:
                        water,

                    status,
                },
            ]);
        

        if (historyError) {
console.log(historyError.message);

            return NextResponse.json(
                {
                    error:
                        historyError.message,
                },
                {
                    status: 400,
                }
            );
        }

        return NextResponse.json({
            message:
                "Data sensor berhasil masuk",
        });

    } catch (error) {
console.log(error);

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