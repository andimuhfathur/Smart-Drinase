"use client";

import Link from "next/link";

import {
    useEffect,
    useState,
} from "react";


export default function LaporanPage() {

    const [data, setData] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [alasanInput, setAlasanInput] =
        useState({});

    const user =
        typeof window !== "undefined"
            ? JSON.parse(
                localStorage.getItem("user")
            )
            : null;

    // =====================================
    // GET LAPORAN
    // =====================================



    async function getLaporan() {

        try {

            const res = await fetch(
                "/api/handleGetLaporan",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        user_id:
                            user.id,

                        role:
                            user.role,
                    }),
                }
            );

            const result =
                await res.json();

            if (!res.ok) {
                alert(result.error);
                return;
            }

            setData(result.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    }

    useEffect(() => {

        const fetchData = async () => {

            await getLaporan();

        };

        fetchData();

    }, []);

    // =====================================
    // UPDATE STATUS
    // =====================================

    async function updateStatus(
        laporanId,
        status,
        nama_pelapor
    ) {

        try {

            const alasan =
                alasanInput[laporanId] || "";

            // =========================
            // VALIDASI TUNDA
            // =========================

            if (
                status === "Tunda" &&
                alasan.length < 5
            ) {

                alert(
                    "Alasan tunda minimal 5 karakter"
                );

                return;
            }

            const res = await fetch(
                "/api/handleUpdateLaporan",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        laporan_id:
                            laporanId,
                        nama_pelapor,

                        status,

                        alasan,

                        role:
                            user.role,
                    }),
                }
            );

            const result =
                await res.json();

            if (!res.ok) {

                alert(result.error);

                return;
            }

            alert(
                "Status berhasil diupdate"
            );

            getLaporan();

        } catch (error) {

            console.log(error);

            alert(
                "Terjadi kesalahan"
            );
        }
    }

    // =====================================
    // DEADLINE
    // =====================================

    function getDeadline(tanggal) {

        const date =
            new Date(tanggal);

        date.setDate(
            date.getDate() + 7
        );

        return date
            .toISOString()
            .split("T")[0];
    }

    // =====================================
    // OVERDUE
    // =====================================

    function isOverdue(deadline) {

        return (
            new Date(deadline) <
            new Date()
        );
    }

    if (loading) {

        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 bg-gray-100 min-h-screen w-full">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                <div className="text-2xl font-bold text-gray-800">
                    Laporan Masyarakat
                </div>

                {/* USER SAJA */}
                {user.role === "user" && (
                    <Link
                        href="../../components/FormLaporan"
                        className="flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-md transition w-full md:w-auto"
                    >
                        Tambah Laporan
                    </Link>
                )}
            </div>

            {/* ========================= */}
            {/* DESKTOP */}
            {/* ========================= */}

            <div className="hidden md:block bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="max-h-[400px] overflow-y-auto">
                    <table className="w-full text-sm">

                        <thead className="bg-gray-50 text-gray-600 text-sm sticky top-0 z-10">

                            <tr>

                                <th className="p-4 text-left">
                                    Laporan
                                </th>

                                <th className="p-4 text-left">
                                    Gambar
                                </th>

                                <th className="p-4 text-left">
                                    Lokasi
                                </th>

                                <th className="p-4 text-left">
                                    Tanggal
                                </th>

                                <th className="p-4 text-left">
                                    Deadline
                                </th>

                                <th className="p-4 text-left">
                                    Status
                                </th>

                                {/* PETUGAS */}
                                {user.role === "petugas" && (
                                    <th className="p-4 text-left">
                                        Aksi
                                    </th>
                                )}
                            </tr>
                        </thead>

                        <tbody>

                            {data.map((item) => {

                                const deadline =
                                    getDeadline(
                                        item.tanggal_laporan
                                    );

                                return (
                                    <tr
                                        key={
                                            item.id_laporan
                                        }
                                        className="border-t align-top"
                                    >

                                        {/* LAPORAN */}
                                        <td className="p-4">

                                            <div className="font-semibold">
                                                {
                                                    item.kategori
                                                }
                                            </div>

                                            <div className="text-gray-500 text-xs mt-1">
                                                {
                                                    item.description
                                                }
                                            </div>
                                        </td>

                                        {/* IMAGE */}
                                        <td className="p-4">

                                            {item.image_laporan && (
                                                <img
                                                    src={item.image_laporan}
                                                    alt="laporan"
                                                    className="w-16 h-16 object-cover rounded-lg"

                                                />
                                            )}
                                        </td>

                                        {/* LOKASI */}
                                        <td className="p-4">

                                            {
                                                item.kecamatan
                                                    ?.nama_Wilayah
                                            }
                                        </td>

                                        {/* TANGGAL */}
                                        <td className="p-4">

                                            {
                                                new Date(item.tanggal_laporan)
                                                    .toLocaleString("id-ID", {
                                                        timeZone: "Asia/Jakarta",
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })
                                            }
                                        </td>

                                        {/* DEADLINE */}
                                        <td className="p-4">

                                            {deadline}
                                        </td>

                                        {/* STATUS */}
                                        <td className="p-4 font-semibold">

                                            {item.status}

                                            {/* ALASAN */}
                                            {item.status === "Tunda" &&
                                                item.alasan_tunda && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Alasan:
                                                        {" "}
                                                        {
                                                            item.alasan_tunda
                                                        }
                                                    </p>
                                                )}

                                            {/* OVERDUE */}
                                            {isOverdue(deadline) &&
                                                item.status !== "Selesai" && (
                                                    <p className="text-red-600 text-xs mt-1">
                                                        ⚠
                                                        Melewati deadline
                                                    </p>
                                                )}
                                        </td>

                                        {/* AKSI PETUGAS */}
                                        {user.role === "petugas" && (

                                            <td className="p-4 space-y-2 min-w-[200px]">

                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            item.id_laporan,
                                                            "Disetujui",
                                                            item.nama_pelapor
                                                        )
                                                    }
                                                    className="bg-green-500 text-white px-3 py-2 rounded-lg w-full"
                                                >
                                                    Setujui
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            item.id_laporan,
                                                            "Diproses",
                                                            item.nama_pelapor
                                                        )
                                                    }
                                                    className="bg-blue-500 text-white px-3 py-2 rounded-lg w-full"
                                                >
                                                    Konfirmasi
                                                </button>

                                                {/* ALASAN */}
                                                <input
                                                    type="text"
                                                    placeholder="Alasan tunda..."
                                                    value={
                                                        alasanInput[
                                                        item.id_laporan
                                                        ] || ""
                                                    }
                                                    onChange={(e) =>
                                                        setAlasanInput({
                                                            ...alasanInput,
                                                            [item.id_laporan]:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full border px-2 py-2 rounded-lg text-xs"
                                                />

                                                <button
                                                    onClick={() =>
                                                        updateStatus(
                                                            item.id_laporan,
                                                            "Tunda",
                                                            item.nama_pelapor
                                                        )
                                                    }
                                                    className="bg-yellow-500 text-white px-3 py-2 rounded-lg w-full"
                                                >
                                                    Tunda
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
</div>
                
            </div>

            {/* ========================= */}
            {/* MOBILE */}
            {/* ========================= */}

            <div className="md:hidden space-y-2 overflow-hidden">
                <div className="max-h-[500px] overflow-y-auto">
                    {data.map((item) => {

                        const deadline =
                            getDeadline(
                                item.tanggal_laporan
                            );

                        return (
                            <div
                                key={item.id_laporan}
                                className="bg-white rounded-2xl shadow-md p-4"
                            >

                                {/* IMAGE */}
                                {item.image_laporan && (
                                    <img
                                        src={item.image_laporan}
                                        alt="laporan"

                                        className="w-full h-48 object-cover rounded-xl"
                                    />
                                )}

                                <div className="mt-4 space-y-2">

                                    <h2 className="font-bold text-lg">
                                        {item.kategori}
                                    </h2>

                                    <p className="text-sm text-gray-600">
                                        {
                                            item.description
                                        }
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        📍
                                        {" "}
                                        {
                                            item.kecamatan
                                                ?.nama_Wilayah
                                        }
                                    </p>

                                    <p className="text-sm">
                                        📅
                                        {" "}
                                        {
                                            new Date(item.tanggal_laporan)
                                                .toLocaleString("id-ID", {
                                                    timeZone: "Asia/Jakarta",
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })
                                        }
                                    </p>

                                    <p className="text-sm">
                                        ⏳
                                        {" "}
                                        Deadline:
                                        {" "}
                                        {deadline}
                                    </p>

                                    <div className="pt-2">

                                        <span className="font-semibold">
                                            {item.status}
                                        </span>

                                        {item.status === "Tunda" &&
                                            item.alasan_tunda && (
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Alasan:
                                                    {" "}
                                                    {
                                                        item.alasan_tunda
                                                    }
                                                </p>
                                            )}

                                        {isOverdue(deadline) &&
                                            item.status !== "Selesai" && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    ⚠
                                                    Melewati deadline
                                                </p>
                                            )}
                                    </div>
                                </div>

                                {/* PETUGAS */}
                                {user.role === "petugas" && (

                                    <div className="mt-4 space-y-2">

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    item.id_laporan,
                                                    "Disetujui",
                                                    item.nama_pelapor
                                                )
                                            }
                                            className="bg-green-500 text-white py-3 rounded-xl w-full"
                                        >
                                            Setujui
                                        </button>

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    item.id_laporan,
                                                    "Diproses",
                                                    item.nama_pelapor
                                                )
                                            }
                                            className="bg-blue-500 text-white py-3 rounded-xl w-full"
                                        >
                                            Konfirmasi
                                        </button>

                                        <input
                                            type="text"
                                            placeholder="Alasan tunda..."
                                            value={
                                                alasanInput[
                                                item.id_laporan
                                                ] || ""
                                            }
                                            onChange={(e) =>
                                                setAlasanInput({
                                                    ...alasanInput,
                                                    [item.id_laporan]:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full border px-3 py-3 rounded-xl text-sm"
                                        />

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    item.id_laporan,
                                                    "Tunda",
                                                    item.nama_pelapor
                                                )
                                            }
                                            className="bg-yellow-500 text-white py-3 rounded-xl w-full"
                                        >
                                            Tunda
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
</div>
               
            </div>
        </div>
    );
}