import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../lib/supabase/supabaseAdmin";

export async function POST(req) {

    try {

        const formData = await req.formData();

        const nama_pelapor =
            formData.get("nama_pelapor");

        const kecamatan_id =
            formData.get("kecamatan_id");

        const kategori =
            formData.get("kategori");

        const description =
            formData.get("description");

        const foto =
            formData.get("foto");

        const foto_kk =
            formData.get("foto_kk");

        const rt =
            formData.get("rt");

        const rw =
            formData.get("rw");

        const user_id =
            formData.get("user_id");

        // ==========================
        // VALIDASI
        // ==========================

        if (
            !nama_pelapor ||
            !kecamatan_id ||
            !kategori ||
            !description ||
            !foto ||
            !foto_kk ||
            !rt ||
            !rw
        ) {

            return NextResponse.json(
                {
                    error:
                        "Laporan belum lengkap",
                },
                {
                    status: 400,
                }
            );
        }

        if (!user_id) {

            return NextResponse.json(
                {
                    error:
                        "User tidak ditemukan",
                },
                {
                    status: 401,
                }
            );
        }

        // ==========================
        // UPLOAD FOTO LAPORAN
        // ==========================

        let fotoUrl = null;

        const fotoBytes =
            await foto.arrayBuffer();

        const fotoBuffer =
            Buffer.from(fotoBytes);

        const fotoName =
            `laporan-${Date.now()}-${foto.name}`;

        const {
            error: fotoError
        } = await supabaseAdmin
            .storage
            .from("laporan_image_drinase")
            .upload(
                fotoName,
                fotoBuffer,
                {
                    contentType:
                        foto.type,
                }
            );

        if (fotoError) {

            return NextResponse.json(
                {
                    error:
                        fotoError.message,
                },
                {
                    status: 400,
                }
            );
        }

        const {
            data: fotoPublic
        } = supabaseAdmin
            .storage
            .from("laporan_image_drinase")
            .getPublicUrl(
                fotoName
            );

        fotoUrl =
            fotoPublic.publicUrl;

        // ==========================
        // UPLOAD FOTO KK
        // ==========================

        let kkUrl = null;

        const kkBytes =
            await foto_kk.arrayBuffer();

        const kkBuffer =
            Buffer.from(kkBytes);

        const kkName =
            `kk-${Date.now()}-${foto_kk.name}`;

        const {
            error: kkError
        } = await supabaseAdmin
            .storage
            .from("laporan_image_drinase")
            .upload(
                kkName,
                kkBuffer,
                {
                    contentType:
                        foto_kk.type,
                }
            );

        if (kkError) {

            return NextResponse.json(
                {
                    error:
                        kkError.message,
                },
                {
                    status: 400,
                }
            );
        }

        const {
            data: kkPublic
        } = supabaseAdmin
            .storage
            .from("laporan_image_drinase")
            .getPublicUrl(
                kkName
            );

        kkUrl =
            kkPublic.publicUrl;

        // ==========================
        // VALIDASI KECAMATAN
        // ==========================

        const {
            data: kecamatanExist
        } = await supabaseAdmin
            .from("kecamatan")
            .select("id_kecamatan")
            .eq(
                "id_kecamatan",
                kecamatan_id
            )
            .single();

        if (!kecamatanExist) {

            return NextResponse.json(
                {
                    error:
                        "Kecamatan tidak valid",
                },
                {
                    status: 400,
                }
            );
        }

        // ==========================
        // INSERT LAPORAN
        // ==========================

        const {
            error: laporanError
        } = await supabaseAdmin
            .from("laporan")
            .insert([
                {
                    user_id,
                    kecamatan_id,
                    nama_pelapor,
                    kategori,
                    description,
                    image_laporan:
                        fotoUrl,
                    image_kk:
                        kkUrl,
                    rt,
                    rw,
                    status:
                        "pending",
                },
            ]);

        if (laporanError) {

            return NextResponse.json(
                {
                    error:
                        laporanError.message,
                },
                {
                    status: 400,
                }
            );
        }

        return NextResponse.json({
            message:
                "Laporan berhasil dibuat",
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