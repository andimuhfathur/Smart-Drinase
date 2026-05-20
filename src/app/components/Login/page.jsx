"use client";

import { useState } from "react";
import Link from "next/link";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const router = useRouter()
        const [loading, setLoading] = useState(false);
    

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (loading) return;

        setLoading(true);

        try {

            const res = await fetch("/api/handleLogin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error);
                return;
            }

            alert("Login berhasil");

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            // redirect
            router.push("/pages/Account");

        } catch (error) {
            console.log(error);
            alert("Terjadi kesalahan");

        } finally {

            setLoading(false);

        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-600 p-6 w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Login
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        icon={<FaEnvelope />}
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <Input
                        icon={<FaLock />}
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition disabled:bg-gray-400"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    Belum punya akun?{" "}
                    <Link href="/components/Register" className="text-indigo-600 font-semibold">
                        Daftar
                    </Link>
                </p>
            </div>
        </div>
    );
}

function Input({ icon, ...props }) {
    return (
        <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
            <span className="text-gray-400 mr-2">{icon}</span>
            <input
                {...props}
                required
                className="w-full outline-none"
            />
        </div>
    );
}