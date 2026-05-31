"use client";

import { useEffect, useState } from "react";

export default function SensorPage() {

    const [sensor, setSensor] =
        useState([]);

    const [wilayah, setWilayah] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [editId, setEditId] =
        useState(null);

    const [formData, setFormData] =
        useState({
            nama_sensor: "",
            device_id: "",
            kecamatan_id: "",
        });

   

   
    useEffect(() => {

        // =========================
        // GET SENSOR
        // =========================

        async function fetchSensor() {

            try {

                const res =
                    await fetch(
                        "/api/handleApiSensor"
                    );

                const data =
                    await res.json();

                setSensor(data);

            } catch (error) {

                console.log(error);
            }
        }

        fetchSensor();


    }, []);

    useEffect(() => {

        // =========================
        // GET WILAYAH
        // =========================

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

        fetchWilayah();

    }, []);

    // =========================
    // HANDLE CHANGE
    // =========================

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    }

    // =========================
    // SUBMIT
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
                        id_sensor:
                            editId,

                        ...formData,
                    }
                    : formData;

            const res =
                await fetch(
                    "/api/handleApiSensor",
                    {
                        method,

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body:
                            JSON.stringify(body),
                    }
                );

            const data =
                await res.json();

            if (!res.ok) {

                alert(data.error);

                return;
            }

            alert(data.message);

            setFormData({
                nama_sensor: "",
                kecamatan_id: "",
            });

            setEditId(null);

           

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
                "Hapus sensor?"
            );

        if (!confirmDelete)
            return;

        try {

            const res =
                await fetch(
                    "/api/handleApiSensor",
                    {
                        method: "DELETE",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body:
                            JSON.stringify({
                                id_sensor: id,
                            }),
                    }
                );

            const data =
                await res.json();

            alert(data.message);

            

        } catch (error) {

            console.log(error);
        }
    }

    // =========================
    // EDIT
    // =========================

    function handleEdit(item) {

        setEditId(item.id_sensor);

        setFormData({
            nama_sensor:
                item.nama_sensor,

            kecamatan_id:
                item.kecamatan_id,
        });
    }

    async function handleToggleSensor(
        id_sensor,
        currentStatus
    ) {

        try {

            const res = await fetch(
                "/api/handleToggleSensor",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        id_sensor,
                        is_active:
                            !currentStatus,
                    }),
                }
            );

            const data =
                await res.json();

            if (!res.ok) {

                alert(data.error);

                return;
            }
            alert("Toggle Berhasil")

        } catch (error) {

            console.log(error);
        }
    }

    return (

        <div className="p-6 min-h-screen bg-gray-100">

            <h1 className="text-3xl font-bold mb-6">
                Operator Sensor
            </h1>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-md mb-6"
            >

                <div className="grid md:grid-cols-3 gap-4">

                    <input
                        type="text"
                        name="nama_sensor"
                        onChange={handleChange}
                        placeholder="Nama Sensor"
                        className="border rounded-xl p-3"
                    />


                    <select
                        name="kecamatan_id"
                        value={
                            formData.kecamatan_id
                        }
                        onChange={handleChange}
                        className="border rounded-xl p-3"
                    >

                        <option value="">
                            Pilih Wilayah
                        </option>

                        {wilayah.map((item) => (

                            <option
                                key={
                                    item.id_kecamatan
                                }
                                value={
                                    item.id_kecamatan
                                }
                            >
                                {item.nama_Wilayah}
                            </option>

                        ))}

                    </select>

                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl"
                >

                    {loading
                        ? "Loading..."
                        : editId
                            ? "Update Sensor"
                            : "Tambah Sensor"}

                </button>

            </form>

            {/* TABLE */}
            <div className="bg-white p-6 rounded-2xl shadow-md overflow-auto">

                <table className="w-full border-collapse">

                    <thead>

                        <tr className="bg-gray-200">

                            <th className="p-3">
                                ID
                            </th>

                            <th className="p-3">
                                Nama Sensor
                            </th>


                            <th className="p-3">
                                Wilayah
                            </th>

                            <th className="p-3">
                                Status
                            </th>

                            <th className="p-3">
                                Aksi
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {sensor.map((item) => (

                            <tr
                                key={
                                    item.id_sensor
                                }
                                className="border-b"
                            >

                                <td className="p-3">
                                    {item.id_sensor}
                                </td>

                                <td className="p-3">
                                    {item.nama_Sensor}
                                </td>


                                <td className="p-3">
                                    {
                                        item.kecamatan
                                            ?.nama_Wilayah
                                    }
                                </td>

                                <td className="p-3">
                                    {item.status}
                                </td>

                                <td className="p-2 flex gap-1">

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
                                                item.id_sensor
                                            )
                                        }
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Hapus
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleToggleSensor(
                                                item.id_sensor,
                                                item.is_active
                                            )
                                        }
                                        className={`px-4 py-2 rounded-lg text-white ${item.is_active
                                            ? "bg-gray-500"
                                            : "bg-green-600"
                                            }`}
                                    >
                                        {item.is_active
                                            ? "Matikan"
                                            : "Nyalakan"}
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