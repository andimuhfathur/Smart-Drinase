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
            .from("sensor")
            .select(`
                *,
                kecamatan (
                    nama_Wilayah
                )
            `)
            .order(
                "id_sensor",
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
            nama_sensor,
            kecamatan_id
        } = body;

        if (
            !nama_sensor ||
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

        const {
            error
        } = await supabaseAdmin
            .from("sensor")
            .insert([
                {
                    nama_Sensor : nama_sensor,
                    kecamatan_id,
                    water_level: 0,
                    status: "Aman",
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
                "Sensor berhasil ditambahkan",
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
            id_sensor,
            nama_sensor,
            kecamatan_id
        } = body;

        const {
            error
        } = await supabaseAdmin
            .from("sensor")
            .update({
                nama_Sensor: nama_sensor,
                kecamatan_id,
            })
            .eq(
                "id_sensor",
                id_sensor
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
                "Sensor berhasil diupdate",
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
            id_sensor
        } = body;

        const {
            error
        } = await supabaseAdmin
            .from("sensor")
            .delete()
            .eq(
                "id_sensor",
                id_sensor
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
                "Sensor berhasil dihapus",
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