import { supabaseAdmin } from "../../lib/supabase/supabaseAdmin";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {

        const body = await req.json();

        const {
            nama,
            email,
            password,
            nohp
        } = body;

        // VALIDASI
        if (!nama || !email || !password) {
            return NextResponse.json(
                { error: "Data tidak lengkap" },
                { status: 400 }
            );
        }

        // ROLE DETECTION
        let role = "user";
        let cleanUsername = nama;

        // ADMIN
        if (nama.includes("@@admin")) {
            role = "admin";
            cleanUsername = nama.replace("@@admin", "");
        }

        // PETUGAS
        else if (nama.includes("##petugas")) {
            role = "petugas";
            cleanUsername = nama.replace("##petugas", "");
        }

        else if (nama.includes("%%operator")) {

            role = "operator";

            cleanUsername =
                nama.replace(
                    "%%operator",
                    ""
                );
        }

        // REGISTER AUTH
        const { data, error } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
        });

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        // INSERT PROFILE
        const { error: profileError } = await supabaseAdmin
            .from("profiles")
            .insert([
                {
                    id: data.user.id,
                    username: cleanUsername.trim(),
                    email: email,
                    password: password,
                    noHp: nohp,
                    role,
                },
            ]);

        if (profileError) {
            return NextResponse.json(
                { error: profileError.message },
                { status: 400 }
            );
        }

        return NextResponse.json({
            message: "Register berhasil",
            user: data.user,
        });

    } catch (error) {

        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );

    }
}