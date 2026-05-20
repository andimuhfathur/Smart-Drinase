"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle, FaShieldAlt, FaCircle } from "react-icons/fa";


export default function AccountPage() {
    const [interval, setIntervalValue] = useState(5);
    const router = useRouter()

    const [user] = useState(() => {
        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        }

        return null;
    });
    function getStatusColor(status) {
        switch (status) {
            case "Aktif":
                return "text-green-500";
            case "Pending":
                return "text-yellow-500";
            case "Nonaktif":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    }

    function handleSave() {

        const value =
            Number(interval);

        if (
            isNaN(value) ||
            value < 1
        ) {

            return alert(
                "Interval tidak valid"
            );
        }

        localStorage.setItem(
            "interval",
            value
        );

        alert(
            "Interval berhasil disimpan"
        );
    }

    function handleLogout() {

        // hapus session user
        localStorage.removeItem("user");

        // redirect
        router.push("/");
    }

    useEffect(() => {

        if (!user) {

            router.push("/");
        }

    }, [user, router]);

    if (!user) return null;
   
    return (
        <div className="p-6 bg-gray-100 min-h-screen min-w-full">
            <h1 className="text-2xl font-bold mb-6">Account</h1>

            <div className="bg-white rounded-2xl shadow-md p-6 max-w-lg">
                <div className="flex items-center gap-4 mb-6">
                    <FaUserCircle className="text-5xl text-gray-400" />
                    <div>
                        <h2 className="text-xl font-semibold">{user.username}</h2>
                        <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Role */}
                    <div className="flex justify-between">
                        <span className="text-gray-500">Peran</span>
                        <div className="flex items-center gap-2 font-semibold">
                            <FaShieldAlt className="text-blue-500" />
                            {user.role}
                        </div>
                    </div>

                    
                </div>
            </div>

            {/* SETTING ADMIN */}
            {user.role === "admin" && (
                <div className="bg-white mt-6 p-6 rounded-2xl shadow-md max-w-lg">
                    <h2 className="font-semibold mb-4">Pengaturan Interval Monitoring</h2>

                    <input
                        type="number"
                        min={1}
                        value={interval}
                        onChange={(e) =>
                            setIntervalValue(e.target.value)
                        }
                        className="w-full p-2 border rounded-xl"
                        placeholder="Masukkan interval menit"
                    />

                    <button
                        onClick={handleSave}
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl"
                    >
                        Simpan
                    </button>
                </div>
            )}

            <button
                onClick={handleLogout}
                className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
            >
                Logout
            </button>
        </div>
    );
}