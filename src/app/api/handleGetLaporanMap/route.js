import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../lib/supabase/supabaseAdmin";

export async function GET() {

    try {

        const { data: sensors, error } =
            await supabaseAdmin
                .from("sensor")
                .select(`
                    id_sensor,
                    nama_Sensor,
                    is_active,
                    kecamatan (
                        id_kecamatan,
                        nama_Wilayah,
                        latitude,
                        longitude
                    )
                `);

        if (error) {
            throw error;
        }

        const result = [];

        for (const sensor of sensors) {

            const wilayah = sensor.kecamatan;

            const { data: latestHistory } =
                await supabaseAdmin
                    .from("sensor_history")
                    .select("*")
                    .eq("sensor_id", sensor.id_sensor)
                    .order("tanggal_history", {
                        ascending: false,
                    })
                    .limit(1)
                    .maybeSingle();

            let status = "Data Tidak Ada";

            if (!sensor.is_active) {

                status = "Offline";

            } else if (latestHistory) {

                status =
                    latestHistory.status;
            }

            result.push({

                id_sensor:
                    sensor.id_sensor,

                nama_sensor:
                    sensor.nama_Sensor,

                is_active:
                    sensor.is_active,

                id_kecamatan:
                    wilayah.id_kecamatan,

                nama_Wilayah:
                    wilayah.nama_Wilayah,

                latitude:
                    wilayah.latitude,

                longitude:
                    wilayah.longitude,

                status,

                latestHistory:
                    latestHistory || null,
            });
        }

        return NextResponse.json({
            data: result,
        });

    } catch (error) {

        console.log(error);
        
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