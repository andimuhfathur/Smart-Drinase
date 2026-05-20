"use client";

import { useEffect, useState } from "react";

export default function WilayahPage() {

    const [wilayah, setWilayah] =
        useState([]);

    const [namaWilayah, setNamaWilayah] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [editId, setEditId] =
        useState(null);

    // =========================
    // GET DATA
    // =========================

    

    useEffect(() => {

        async function fetchWilayah() {

            try {

                const res =
                    await fetch(
                        "/api/handleApiWilayah"
                    );

                const data =
                    await res.json();

                setWilayah(data);

            } catch (error) {

                console.log(error);
            }
        }

        fetchWilayah()

    }, []);

    // =========================
    // TAMBAH / EDIT
    // =========================

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setLoading(true);

            const method =
                editId
                    ? "PUT"
                    : "POST";

            const body =
                editId
                    ? {
                        id_kecamatan:
                            editId,

                        nama_Wilayah:
                            namaWilayah,
                    }
                    : {
                        nama_Wilayah:
                            namaWilayah,
                    };

            const res =
                await fetch(
                    "/api/handleApiWilayah",
                    {
                        method,

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body:
                            JSON.stringify(
                                body
                            ),
                    }
                );

            const data =
                await res.json();

            if (!res.ok) {

                alert(data.error);

                return;
            }

            alert(data.message);

            setNamaWilayah("");

            setEditId(null);

            fetchWilayah();

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    }

    // =========================
    // DELETE
    // =========================

    async function handleDelete(id) {

        const confirmDelete =
            confirm(
                "Hapus wilayah?"
            );

        if (!confirmDelete)
            return;

        try {

            const res =
                await fetch(
                    "/api/handleApiWilayah",
                    {
                        method: "DELETE",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body:
                            JSON.stringify({
                                id_kecamatan:
                                    id,
                            }),
                    }
                );

            const data =
                await res.json();

            alert(data.message);

            fetchWilayah();

        } catch (error) {

            console.log(error);
        }
    }

    // =========================
    // EDIT
    // =========================

    function handleEdit(item) {

        setNamaWilayah(
            item.nama_Wilayah
        );

        setEditId(
            item.id_kecamatan
        );
    }

    return (

        <div className="p-6 min-h-screen bg-gray-100">

            <h1 className="text-3xl font-bold mb-6">
                Operator Wilayah
            </h1>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-md mb-6"
            >

                <input
                    type="text"
                    value={namaWilayah}
                    onChange={(e) =>
                        setNamaWilayah(
                            e.target.value
                        )
                    }
                    placeholder="Masukkan nama wilayah"
                    className="w-full border rounded-xl p-3 mb-4"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl"
                >

                    {loading
                        ? "Loading..."
                        : editId
                            ? "Update Wilayah"
                            : "Tambah Wilayah"}

                </button>

            </form>

            {/* TABLE */}
            <div className="bg-white p-6 rounded-2xl shadow-md overflow-auto">

                <table className="w-full border-collapse">

                    <thead>

                        <tr className="bg-gray-200">

                            <th className="p-3 text-left">
                                ID
                            </th>

                            <th className="p-3 text-left">
                                Wilayah
                            </th>

                            <th className="p-3 text-left">
                                Latitude
                            </th>

                            <th className="p-3 text-left">
                                Longitude
                            </th>

                            <th className="p-3 text-left">
                                Aksi
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {wilayah.map((item) => (

                            <tr
                                key={
                                    item.id_kecamatan
                                }
                                className="border-b"
                            >

                                <td className="p-3">
                                    {item.id_kecamatan}
                                </td>

                                <td className="p-3">
                                    {item.nama_Wilayah}
                                </td>

                                <td className="p-3">
                                    {item.latitude}
                                </td>

                                <td className="p-3">
                                    {item.longitude}
                                </td>

                                <td className="p-3 flex gap-2">

                                    <button
                                        onClick={() =>
                                            handleEdit(item)
                                        }
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                item.id_kecamatan
                                            )
                                        }
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Hapus
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}