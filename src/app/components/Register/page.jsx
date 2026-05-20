"use client";

import { useState } from "react";
import Link from "next/link";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function RegisterPage() {
    const [form, setForm] = useState({
        nama: "",
        email: "",
        password: "",
        nohp: "",
        role: "user",
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        try {

            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            console.log(data);

            if (!res.ok) {
                toast.error("Register gagal")
                return;
            }

            setTimeout(() => {
                toast.success("Register Berhasil")
            }, 3000);
            router.push("/components/Login")
            
        } catch (error) {

            console.log(error);
            toast.error("terjadi kesalahan")
        } finally {

            setLoading(false);

        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-6 w-full">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Daftar Akun
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nama */}
                    <Input
                        icon={<FaUser />}
                        name="nama"
                        placeholder="Nama Lengkap"
                        value={form.nama}
                        onChange={handleChange}
                    />

                    {/* Email */}
                    <Input
                        icon={<FaEnvelope />}
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    {/* Password */}
                    <Input
                        icon={<FaLock />}
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    {/* No HP */}
                    <Input
                        icon={<FaPhone />}
                        name="nohp"
                        placeholder="Nomor HP"
                        value={form.nohp}
                        onChange={handleChange}
                    />

                  
                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition disabled:bg-gray-400"
                    >
                        {loading ? "Loading..." : "Register"}
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    Sudah punya akun?{" "}
                    <Link href="/components/Login" className="text-blue-600 font-semibold">
                        Login
                    </Link>
                    <br />
                    <Link href="/" className="text-blue-600 font-semibold">
                        Keluar
                    </Link>
                </p>
            </div>
        </div>
    );
}

// COMPONENT INPUT
function Input({ icon, ...props }) {
    return (
        <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
            <span className="text-gray-400 mr-2">{icon}</span>
            <input
                {...props}
                required
                className="w-full outline-none"
            />
        </div>
    );
}