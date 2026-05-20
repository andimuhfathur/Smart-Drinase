import { NextResponse } from "next/server";

import { supabaseAdmin }
    from "../../lib/supabase/supabaseAdmin";

// =====================================
// GET
// =====================================

export async function GET() {

    try {

        const {
            data,
            error
        } = await supabaseAdmin
            .from("kecamatan")
            .select("*")
            .order(
                "id_kecamatan",
                {
                    ascending: true,
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

// =====================================
// POST
// =====================================

export async function POST(req) {

    try {

        const body =
            await req.json();

        const {
            nama_Wilayah
        } = body;

        if (!nama_Wilayah) {

            return NextResponse.json(
                {
                    error:
                        "Nama wilayah wajib diisi",
                },
                {
                    status: 400,
                }
            );
        }

        // OPENSTREETMAP
        const geoResponse =
            await fetch(
                `https://nominatim.openstreetmap.org/search?q=${nama_Wilayah} Makassar&format=json`,
                {
                    headers: {
                        "User-Agent":
                            "smart-drainase-app",
                    },
                }
            );

        const geoData =
            await geoResponse.json();

        if (!geoData.length) {

            return NextResponse.json(
                {
                    error:
                        "Wilayah tidak ditemukan",
                },
                {
                    status: 400,
                }
            );
        }

        const lokasi =
            geoData[0];

        const latitude =
            lokasi.lat;

        const longitude =
            lokasi.lon;

        const {
            error
        } = await supabaseAdmin
            .from("kecamatan")
            .insert([
                {
                    nama_Wilayah,
                    latitude,
                    longitude,
                },
            ]);

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

        return NextResponse.json({
            message:
                "Wilayah berhasil ditambahkan",
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

// =====================================
// PUT
// =====================================

export async function PUT(req) {

    try {

        const body =
            await req.json();

        const {
            id_kecamatan,
            nama_Wilayah
        } = body;

        const geoResponse =
            await fetch(
                `https://nominatim.openstreetmap.org/search?q=${nama_Wilayah} Makassar&format=json`,
                {
                    headers: {
                        "User-Agent":
                            "smart-drainase-app",
                    },
                }
            );

        const geoData =
            await geoResponse.json();

        if (!geoData.length) {

            return NextResponse.json(
                {
                    error:
                        "Wilayah tidak ditemukan",
                },
                {
                    status: 400,
                }
            );
        }

        const lokasi =
            geoData[0];

        const latitude =
            lokasi.lat;

        const longitude =
            lokasi.lon;

        const {
            error
        } = await supabaseAdmin
            .from("kecamatan")
            .update({
                nama_Wilayah,
                latitude,
                longitude,
            })
            .eq(
                "id_kecamatan",
                id_kecamatan
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

        return NextResponse.json({
            message:
                "Wilayah berhasil diupdate",
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

// =====================================
// DELETE
// =====================================

export async function DELETE(req) {

    try {

        const body =
            await req.json();

        const {
            id_kecamatan
        } = body;

        const {
            error
        } = await supabaseAdmin
            .from("kecamatan")
            .delete()
            .eq(
                "id_kecamatan",
                id_kecamatan
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

        return NextResponse.json({
            message:
                "Wilayah berhasil dihapus",
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