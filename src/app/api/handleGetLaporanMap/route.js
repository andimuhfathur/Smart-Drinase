import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../lib/supabase/supabaseAdmin";

export async function GET() {

    try {

        // =========================
        // AMBIL LAPORAN + KECAMATAN
        // =========================

        const {
            data,
            error,
        } = await supabaseAdmin
            .from("laporan")
            .select(`
                id_laporan,
                kecamatan (
                    id_kecamatan,
                    nama_Wilayah,
                    latitude,
                    longitude
                )
            `);

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

        // =========================
        // KELOMPOKKAN DATA
        // =========================

        const grouped = {};

        data.forEach((item) => {

            const wilayah = item.kecamatan;

            if (!wilayah) return;

            const id = wilayah.id_kecamatan;

            if (!grouped[id]) {

                grouped[id] = {
                    id_kecamatan: id,
                    nama_Wilayah:
                        wilayah.nama_Wilayah,

                    latitude:
                        wilayah.latitude,

                    longitude:
                        wilayah.longitude,

                    total_laporan: 0,
                };
            }

            grouped[id].total_laporan += 1;
        });

        // =========================
        // STATUS
        // =========================

        const result =
            Object.values(grouped).map((item) => {

                let status = "Aman";

                if (item.total_laporan >= 3) {

                    status = "Bahaya";

                } else if (
                    item.total_laporan >= 2
                ) {

                    status = "Waspada";
                }

                return {
                    ...item,
                    status,
                };
            });

        return NextResponse.json({
            data: result,
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