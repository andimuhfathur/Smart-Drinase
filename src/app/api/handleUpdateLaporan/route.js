import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../lib/supabase/supabaseAdmin";
import { sendTelegramMessage } from "@/app/lib/sendTelegram/telegram";


export async function PUT(req) {

    try {

        const body = await req.json();

        const {
            laporan_id,
            status,
            alasan,
            role,
        } = body;

        // =========================
        // HANYA PETUGAS
        // =========================

        if (
            role !== "petugas" &&
            role !== "admin"
        ) {

            return NextResponse.json(
                {
                    error:
                        "Bukan petugas",
                },
                {
                    status: 403,
                }
            );
        }

        // =========================
        // VALIDASI TUNDA
        // =========================

        if (
            status === "Tunda" &&
            (!alasan || alasan.length < 5)
        ) {

            return NextResponse.json(
                {
                    error:
                        "Alasan tunda terlalu pendek",
                },
                {
                    status: 400,
                }
            );
        }

        const {
            data: laporan,
            error: laporanError
        } = await supabaseAdmin
            .from("laporan")
            .select(`
        *,
        kecamatan (
            nama_Wilayah
        )
    `)
            .eq(
                "id_laporan",
                laporan_id
            )
            .single();

        if (laporanError) {

            return NextResponse.json(
                {
                    error:
                        "Laporan tidak ditemukan",
                },
                {
                    status: 404,
                }
            );
        }

        // =========================
        // TENTUKAN THREAD TELEGRAM
        // =========================

        const THREAD_MAPPING = {

            7:
                process.env
                    .TELEGRAM_THREAD_BTP,

            8:
                process.env
                    .TELEGRAM_THREAD_PANAKKUKANG,
        };

        const messageThreadId =
            THREAD_MAPPING[
            laporan.kecamatan_id
            ];

        if (!messageThreadId) {

            return NextResponse.json(
                {
                    error:
                        "Thread telegram wilayah tidak ditemukan",
                },
                {
                    status: 400,
                }
            );
        }

        let error = null;

        if (status === "Disetujui") {

            const result =
                await supabaseAdmin
                    .from("laporan")
                    .delete()
                    .eq(
                        "id_laporan",
                        laporan_id
                    );

            error = result.error;

        } else {

            const result =
                await supabaseAdmin
                    .from("laporan")
                    .update({

                        status,

                        alasan_tunda:
                            status === "Tunda"
                                ? alasan
                                : null,

                    })
                    .eq(
                        "id_laporan",
                        laporan_id
                    );

            error = result.error;
        }
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

        try {


            await sendTelegramMessage(

                `
📢 UPDATE LAPORAN

👤 Pelapor:
${laporan.nama_pelapor}

📍 Wilayah:
${laporan.kecamatan?.nama_Wilayah}

${status === "Disetujui"
                    ? "✅ LAPORAN DISETUJUI"
                    : status === "Diproses"
                        ? "🔵 LAPORAN DIKONFIRMASI"
                        : "⏸ LAPORAN DITUNDA"}

📝 Deskripsi:
${laporan.description}

${status === "Tunda"
                    ? `⚠️ Alasan:\n${alasan}`
                    : ""}
`, messageThreadId );
        } catch (error) {
            console.log(`telegram error ${error}`);

        }

        return NextResponse.json({
            message:
                status === "Disetujui"
                    ? "Laporan berhasil diselesaikan"
                    : "Status berhasil diupdate",
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