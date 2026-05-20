import { supabase } from "@/app/lib/supabase/supabase";
import { NextResponse } from "next/server";

export async function POST(req) {

    try {
        

        const body = await req.json();

        const {
            email,
            password
        } = body;

        // LOGIN AUTH
        const { data, error } =
            await supabase.auth.signInWithPassword({
                email,
                password,
            });

        // CEK LOGIN
        if (error) {
            return NextResponse.json(
                {
                    error:
                        "Email atau password salah",
                },
                {
                    status: 400,
                }
            );
        }

        // AMBIL PROFILE
        const { data: profile } =
            await supabase
                .from("profiles")
                .select("*")
                .eq("id", data.user.id)
                .single();

        return NextResponse.json({
            message: "Login berhasil",
            user: profile,
            session: data.session,
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