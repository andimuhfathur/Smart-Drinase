import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../lib/supabase/supabaseAdmin";


// =====================================
// CREATE LAPORAN
// =====================================
export async function POST(req) {

    try {

        const formData =
            await req.formData();

        // =====================================
        // AMBIL DATA FORM
        // =====================================

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

        const user_id =
            formData.get("user_id");

        // =====================================
        // VALIDASI
        // =====================================

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

        if (!kecamatan_id) {

            return NextResponse.json(
                {
                    error:
                        "Wilayah wajib diisi",
                },
                {
                    status: 400,
                }
            );
        }

       

        // =====================================
        // UPLOAD FOTO
        // =====================================

        let fotoUrl = null;

        if (foto && foto.size > 0) {

            const bytes =
                await foto.arrayBuffer();

            const buffer =
                Buffer.from(bytes);

            const fileName =
                `${Date.now()}-${foto.name}`;

            const {
                error: uploadError
            } = await supabaseAdmin
                .storage
                    .from("laporan_image_drinase")
                .upload(
                    fileName,
                    buffer,
                    {
                        contentType:
                            foto.type,
                    }
                );

            if (uploadError) {

                return NextResponse.json(
                    {
                        error:
                            uploadError.message,
                    },
                    {
                        status: 400,
                    }
                );
            }

            const {
                data: publicData
            } = supabaseAdmin
                .storage
                    .from("laporan_image_drinase")
                .getPublicUrl(
                    fileName
                );

            fotoUrl =
                publicData.publicUrl;
        }

        // =====================================
        // INSERT LAPORAN
        // =====================================

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
        
        const {
            error: laporanError
        } = await supabaseAdmin
            .from("laporan")
            .insert([
                {
                    user_id,

                    kecamatan_id:
                        kecamatan_id,

                    nama_pelapor,

                    kategori,

                    description,

                    image_laporan:
                        fotoUrl,

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