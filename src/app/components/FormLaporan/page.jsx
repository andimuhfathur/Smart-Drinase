"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import {
    FaUser,
    FaMapMarkerAlt,
    FaImage,
    FaExclamationTriangle,
} from "react-icons/fa";

export default function FormLaporanPage() {

    const [user] = useState(() => {
        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        }

        return null;
    });
    const [kecamatanList, setKecamatanList] = useState([]);
    const [preview, setPreview] = useState(null);

    const [loading, setLoading] = useState(false);

    const [kkPreview, setKkPreview] = useState(null);

    const [formData, setFormData] = useState({
        nama_pelapor: "",
        kecamatan_id: "",
        kategori: "Banjir",
        description: "",
        foto: null,
        foto_kk: null,
        rt: "",
        rw: "",
    });

    

    // =========================
    // HANDLE INPUT
    // =========================
    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    // =========================
    // HANDLE IMAGE
    // =========================
    function handleImage(e) {

        const file = e.target.files[0];

        if (file) {

            setPreview(
                URL.createObjectURL(file)
            );

            setFormData({
                ...formData,
                foto: file,
            });
        }
    }

    function handleKK(e) {

        const file =
            e.target.files[0];

        if (file) {

            setKkPreview(
                URL.createObjectURL(file)
            );

            setFormData({
                ...formData,
                foto_kk: file,
            });
        }
    }

    // =========================
    // SUBMIT
    // =========================


    
    async function handleSubmit(e) {

        e.preventDefault();

        try {

            if (
                !formData.nama_pelapor ||
                !formData.kecamatan_id ||
                !formData.description ||
                !formData.foto ||
                !formData.foto_kk ||
                !formData.rt ||
                !formData.rw
            ) {

                alert("Laporan belum lengkap");

                return;
            }


            setLoading(true);

           
            const body = new FormData();

            body.append(
                "nama_pelapor",
                formData.nama_pelapor
            );

            body.append(
                "kecamatan_id",
                formData.kecamatan_id
            );

            body.append(
                "kategori",
                formData.kategori
            );

            body.append(
                "description",
                formData.description
            );

            if (!user) {
                alert("Silahkan login terlebih dahulu");
                return;
            }

            body.append("user_id", user.id);

            body.append("rt", formData.rt);

            body.append("rw", formData.rw);

            if (formData.foto) {
                body.append("foto", formData.foto);
            }

            if (formData.foto_kk) {
                body.append("foto_kk", formData.foto_kk);
            }
            

            const res = await fetch(
                "/api/handleLaporan",
                {
                    method: "POST",
                    body,
                }
            );

            const data = await res.json();

            if (!res.ok) {
                alert(data.error);
                return;
            }

            alert("Laporan berhasil dikirim");

            setFormData({
                nama_pelapor: "",
                kecamatan_id: "",
                kategori: "Banjir",
                description: "",
                foto: null,
                foto_kk: null,
                rt: "",
                rw: "",
            });

            setPreview(null);
            setKkPreview(null);
        } catch (error) {

            console.log(error);

            alert("Terjadi kesalahan");

        } finally {

            setLoading(false);
        }
    }

    useEffect(() => {

        async function fetchKecamatan() {

            try {

                const res =
                    await fetch(
                        "/api/handleKecamatan"
                    );

                const data =
                    await res.json();

                setKecamatanList(data);

            } catch (error) {

                console.log(error);
            }
        }

        fetchKecamatan();

    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6 w-full">

            <div className="flex flex-col gap-4 mb-6">

                <h1 className="text-3xl font-bold text-gray-800">
                    Form Laporan Warga
                </h1>

                <Link
                    href="../../pages/Laporan"
                    className="flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition w-[8rem]"
                >
                    Kembali
                </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6 max-w-4xl">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* NAMA */}
                    <div>

                        <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <FaUser className="text-blue-500" />
                            Nama Pelapor
                        </label>

                        <input
                            type="text"
                            name="nama_pelapor"
                            value={formData.nama_pelapor}
                            onChange={handleChange}
                            placeholder="Masukkan nama lengkap"
                            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none"
                        />
                    </div>

                    {/* WILAYAH */}
                    <div>

                        <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">

                            <FaMapMarkerAlt className="text-green-500" />

                            Wilayah / Lokasi

                        </label>

                        <select
                            name="kecamatan_id"
                            value={formData.kecamatan_id}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none"
                        >

                            <option value="">
                                Pilih Wilayah
                            </option>

                            {kecamatanList.map((item) => (

                                <option
                                    key={item.id_kecamatan}
                                    value={item.id_kecamatan}
                                >
                                    {item.nama_Wilayah}
                                </option>

                            ))}

                        </select>
                    </div>

                    <div>

                        <label className="text-sm font-semibold text-gray-700 mb-2">
                            RT
                        </label>

                        <input
                            type="text"
                            name="rt"
                            value={formData.rt}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none"
                        />

                    </div>

                    <div>

                        <label className="text-sm font-semibold text-gray-700 mb-2">
                            RW
                        </label>

                        <input
                            type="text"
                            name="rw"
                            value={formData.rw}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none"
                        />

                    </div>



                    {/* KATEGORI */}
                    <div>

                        <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <FaExclamationTriangle className="text-yellow-500" />
                            Kategori Laporan
                        </label>

                        <select
                            name="kategori"
                            value={formData.kategori}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none"
                        >
                            <option>Banjir</option>
                            <option>Drainase Tersumbat</option>
                            <option>Air Meluap</option>
                            <option>Sampah Menumpuk</option>
                            <option>Lainnya</option>
                        </select>
                    </div>

                    {/* DESKRIPSI */}
                    <div>

                        <label className="text-sm font-semibold text-gray-700 mb-2">
                            Deskripsi Laporan
                        </label>

                        <textarea
                            rows={5}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Jelaskan kondisi..."
                            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none"
                        />
                    </div>

                    <div>

                        <label className="text-sm font-semibold text-gray-700 mb-2">
                            Upload Foto KK
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleKK}
                            className="w-full border border-dashed border-gray-300 rounded-2xl p-3"
                        />

                        {kkPreview && (

                            <div className="mt-4">

                                <Image
                                    src={kkPreview}
                                    alt="Preview KK"
                                    width={300}
                                    height={300}
                                    className="rounded-2xl"
                                />

                            </div>

                        )}

                    </div>

                    {/* FOTO */}
                    <div>

                        <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <FaImage className="text-pink-500" />
                            Upload Foto
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className="w-full border border-dashed border-gray-300 rounded-2xl p-3"
                        />

                        {preview && (
                            <div className="mt-4">

                                <Image
                                    src={preview}
                                    alt="Preview"
                                    width={300}
                                    height={300}
                                    className="rounded-2xl"
                                />
                            </div>
                        )}
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl"
                    >
                        {loading
                            ? "Mengirim..."
                            : "Kirim Laporan"}
                    </button>
                </form>
            </div>
        </div>
    );
}