"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailLaporanPage() {

    const params = useParams();

    const [laporan, setLaporan] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        async function getDetail() {

            try {

                const res =
                    await fetch(
                        "/api/handleDetailLaporan",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                    "application/json",
                            },
                            body: JSON.stringify({
                                laporan_id:
                                    params.id,
                            }),
                        }
                    );

                const result =
                    await res.json();

                setLaporan(
                    result.data
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        }

        getDetail();

    }, [params.id]);

    if (loading) {

        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }

    if (!laporan) {

        return (
            <div className="p-10">
                Data tidak ditemukan
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen p-4 md:p-8 w-full">

            {/* HEADER */}

            <Link
                href="/pages/Laporan"
                className="
                    text-gray-600
                    text-sm
                    hover:text-blue-600
                    mb-6
                    inline-block
                "
            >
                ← Kembali ke Laporan
            </Link>

            <div className="mb-6">

                <h1 className="text-4xl font-bold text-gray-800">

                    {laporan.kategori}

                </h1>

                <p className="text-gray-500 mt-2">

                    Detail laporan masyarakat

                </p>
            </div>

            {/* HERO IMAGE */}

            <div className="bg-white rounded-3xl shadow-md overflow-hidden">

                {laporan.image_laporan && (

                    <img
                        src={
                            laporan.image_laporan
                        }
                        alt="laporan"
                        className="
                            w-full
                            h-[500px]
                            object-cover
                        "
                    />

                )}

            </div>

            {/* CONTENT */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

                {/* KIRI */}

                <div className="lg:col-span-2 space-y-8">

                    {/* NAMA */}

                    <div>

                        <h3
                            className="
                            uppercase
                            text-xs
                            tracking-widest
                            text-gray-500
                            mb-3
                        "
                        >
                            Nama Pelapor
                        </h3>

                        <p
                            className="
                            text-gray-800
                            text-lg
                        "
                        >
                            {
                                laporan.nama_pelapor
                            }
                        </p>

                    </div>

                    {/* LOKASI */}

                    <div>

                        <h3 className="uppercase text-xs tracking-widest text-gray-500 mb-3">
                            Lokasi
                        </h3>

                        <p className="text-gray-800 text-lg">

                            {
                                laporan.kecamatan
                                    ?.nama_Wilayah
                            }

                        </p>

                    </div>

                    {/* KATEGORI */}

                    <div>

                        <h3 className="uppercase text-xs tracking-widest text-gray-500 mb-3">
                            Kategori
                        </h3>

                        <p className="text-gray-800 text-lg">

                            {
                                laporan.kategori
                            }

                        </p>

                    </div>

                    {/* DESKRIPSI */}

                    <div>

                        <h3 className="uppercase text-xs tracking-widest text-gray-500 mb-3">
                            Deskripsi
                        </h3>

                        <p className="text-gray-700 leading-8">

                            {
                                laporan.description
                            }

                        </p>

                    </div>

                </div>

                {/* KANAN */}

                <div className="space-y-6">

                    {/* STATUS */}

                    <div
                        className="
                        bg-white
                        rounded-3xl
                        shadow-md
                        p-6
                    "
                    >

                        <h2 className="text-2xl font-bold">

                            Status

                        </h2>

                        <p className="mt-4">

                            {laporan.status}

                        </p>

                    </div>

                    {/* ALASAN */}

                    <div
                        className="
                        bg-white
                        rounded-3xl
                        shadow-md
                        p-6
                    "
                    >

                        <h2 className="text-xl font-bold">

                            Alasan Penolakan

                        </h2>

                        <p
                            className="
                            mt-4
                            text-gray-600
                        "
                        >
                            {
                                laporan.alasan_tunda ||
                                "Tidak ada"
                            }
                        </p>

                    </div>

                    {/* EDIT */}

                    {laporan.status ===
                        "Tolak" && (

                            <Link
                                href={`/pages/EditLaporan/${laporan.id_laporan}`}
                                className="
                                block
                                w-full
                                text-center
                                bg-yellow-500
                                hover:bg-yellow-600
                                text-white
                                py-4
                                rounded-2xl
                                font-semibold
                            "
                            >
                                Edit Laporan
                            </Link>

                        )}

                </div>

            </div>
        </div>
    );
}