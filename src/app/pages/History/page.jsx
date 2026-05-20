"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function getStatusColor(status) {

    switch (status) {

        case "Bahaya":
            return "text-red-500 bg-red-100";

        case "Waspada":
            return "text-yellow-600 bg-yellow-100";

        case "Aman":
            return "text-green-600 bg-green-100";

        default:
            return "text-gray-500 bg-gray-100";
    }
}

export default function HistoryPage() {
    const [search, setSearch] = useState("");
    const [historyData, setHistoryData] =
        useState([]);
    const [loading, setLoading] =
        useState(true);
   

    const filteredData =
        historyData.filter((item) => {

            const wilayah =
                item.sensor?.kecamatan
                    ?.nama_Wilayah || "-";

            return wilayah
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                );
        });
    
    useEffect(() => {

        async function getHistory() {

            try {

                const res = await fetch(
                    "/api/handleGetHistory"
                );

                const result =
                    await res.json();

                setHistoryData(
                    result.data || []
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        }

        getHistory();

    }, []);

    if (loading) {

        return (
            <div className="p-6 text-gray-500">
                Loading...
            </div>
        );
    }

    return (
        <div className="p-3 bg-gray-100 md:min-h-screen min-h-[52rem] w-full">
            
            <h1 className="text-2xl font-bold text-gray-800 mb-6 flex md:justify-end">
                Histori Data Air
            </h1>

            {/* SEARCH */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Cari Wilayah..."
                    className="w-full md:w-1/3 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="max-h-[320px] overflow-y-auto">
                <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 text-sm sticky top-0 z-10">
                        <tr>
                            <th className="p-4">Waktu</th>
                            <th className="p-4">Tinggi Air (cm)</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Wilayah</th>
                        </tr>
                    </thead>

                        <tbody>
                            {
                                filteredData.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="text-center p-6 text-gray-400"
                                        >
                                            Data tidak ditemukan
                                        </td>
                                    </tr>
                                )
                            }

                        {filteredData.map((item) => {
                            const status = item.status;
                            return (
                                <tr
                                    key={item.id_history}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="p-4">

                                        {
                                            new Date(
                                                item.tanggal_history
                                            ).toLocaleString(
                                                "id-ID",
                                                {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                }
                                            )
                                        }

                                    </td>
                                    <td className="p-4 font-semibold">
                                        {item.water_level} cm
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                                                status
                                            )}`}
                                        >
                                            {status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        {
                                            item.sensor?.kecamatan
                                                ?.nama_Wilayah
                                        }
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                </div>
            </div>

            {/* EXPORT BUTTON */}
            <div className="mt-6">
                <button
                    onClick={() =>
                        exportPDF(filteredData)
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition"
                >
                    Cetak PDF
                </button>
            </div>
        </div>
    );
}

function exportPDF(data) {

    if (data.length === 0) {
        alert("Tidak ada data untuk dicetak");
        return;
    }

    const doc = new jsPDF();

    // JUDUL
    doc.setFontSize(18);

    doc.text(
        "Laporan Histori Sensor Air",
        14,
        20
    );

    // TANGGAL CETAK
    doc.setFontSize(10);

    doc.text(
        `Dicetak: ${new Date().toLocaleString("id-ID")}`,
        14,
        28
    );

    doc.text(
        `Total Data: ${data.length}`,
        14,
        34
    );

    // TABLE
    autoTable(doc, {

        startY: 40,

        head: [[
            "Waktu",
            "Wilayah",
            "Tinggi Air",
            "Status",
        ]],

        body: data.map((item) => [

            new Date(
                item.tanggal_history
            ).toLocaleString(
                "id-ID",
                {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }
            ),

            item.sensor?.kecamatan
                ?.nama_Wilayah || "-",

            `${item.water_level} cm`,

            item.status || "-",
        ]),

        styles: {
            fontSize: 10,
            cellPadding: 4,
        },

        headStyles: {
            fillColor: [37, 99, 235],
        },
    });

    // DOWNLOAD
    doc.save(
        `history_sensor_${Date.now()}.pdf`
    );
}