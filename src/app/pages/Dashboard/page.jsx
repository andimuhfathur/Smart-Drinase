"use client";

import dynamic from "next/dynamic";
import { FaWater, FaBell, FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState, useMemo } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const MapView = dynamic(
    () => import("../../components/MapsView/Maps"),
    { ssr: false }
);


export default function Dashboard() {

    const [mapData, setMapData] =
        useState([]);

    const [selectedWilayah,
        setSelectedWilayah] =
        useState(null);

    const [chartData, setChartData] =
        useState([]);

    const [sensorInfo, setSensorInfo] =
        useState(null);
    
    const [refreshInterval] =
        useState(() => {

            if (
                typeof window !==
                "undefined"
            ) {

                const savedInterval =
                    localStorage.getItem(
                        "interval"
                    );

                return savedInterval
                    ? Number(savedInterval)
                    : 5;
            }

            return 5;
        });

    const chartOptions = useMemo(() => ({
        chart: {
            type: "line",
            toolbar: { show: false },
        },
        stroke: {
            curve: "smooth",
            width: 3,
        },
        xaxis: {
            categories:
                chartData.map((item) =>
                    new Date(
                        item.tanggal_history
                    ).toLocaleTimeString(
                        "id-ID",
                        {
                            hour: "2-digit",
                            minute: "2-digit",
                        }
                    )
                ),
        },
        colors: ["#3b82f6"],
        grid: {
            borderColor: "#e5e7eb",
        },
    }), [chartData]);

    



    useEffect(() => {

        let mounted = true;

        async function fetchData() {

            try {

                const res = await fetch(
                    "/api/handleGetLaporanMap"
                );

                const result =
                    await res.json();

                if (mounted) {

                    setMapData(result.data || []);

                    if (result.data?.length > 0) {

                        setSelectedWilayah(
                            result.data[0]
                        );
                    }
                }
            } catch (error) {

                console.log(error);
            }
        }

        fetchData();

        return () => {

            mounted = false;
        };

    }, []);

    useEffect(() => {

        if (!selectedWilayah)
            return;

        async function getChart() {

            try {

                const res = await fetch(
                    "/api/handleGetChardSensor",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({
                            kecamatan_id:
                                selectedWilayah.id_kecamatan,
                        }),
                    }
                );

                const result =
                    await res.json();

                setChartData(
                    result.data || []
                );

                setSensorInfo(
                    result.latestHistory || null
                );

            } catch (error) {

                console.log(error);
            }
        }

        // fetch pertama
        getChart();

        // realtime interval
        const intervalId =
            setInterval(() => {

                getChart();

            }, refreshInterval * 60 * 1000);

        return () => {

            clearInterval(intervalId);
        };

    }, [
        selectedWilayah,
        refreshInterval
    ]);

    const chartSeries = useMemo(() => ([
        {
            name: "Tinggi Air",
            data: chartData.map(
                (item) => item.water_level
            ),
        },
    ]), [chartData]);

    function getStatusColor(status) {

        switch (status) {

            case "Bahaya":
                return "text-red-500";

            case "Waspada":
                return "text-yellow-500";

            default:
                return "text-green-500";
        }
    }


    return (
        <div className="md:min-h-screen min-h-[72rem] bg-gray-100 p-6 min-w-auto">
            {/* HEADER */}
            <div className="flex justify-between items-center text-2xl font-bold mb-6 text-gray-800">
                <div className="">Smart Drinase</div>
                <div>
                    {
                        new Date().toLocaleDateString(
                            "id-ID",
                            {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            }
                        )
                    }
                </div>
            </div>

            {/* CARDS */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
                {/* Tinggi Air */}
                <div className="bg-white p-5 rounded-2xl shadow-md flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl text-blue-600 text-xl">
                        <FaWater />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Tinggi Air Saat Ini</p>
                        <h2 className="text-2xl font-bold">

                            {sensorInfo
                                ? `${sensorInfo.water_level} cm`
                                : "--"}

                        </h2>
                        <span className={`font-semibold ${getStatusColor(sensorInfo?.status)}`}>
                            {sensorInfo?.status || "Tidak Ada"}
                        </span>
                    </div>
                </div>

                {/* Status */}
                <div className="bg-white p-5 rounded-2xl shadow-md flex items-center gap-4">
                    <div className="p-3 bg-red-100 rounded-xl text-red-600 text-xl">
                        <FaBell />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Status Kanal</p>
                        <h2 className={`font-semibold ${getStatusColor(sensorInfo?.status)}`}>
                            {sensorInfo?.status || "Tidak Ada"}
                        </h2>
                    </div>
                </div>

                {/* Lokasi */}
                <div className="bg-white p-5 rounded-2xl shadow-md flex items-center gap-4">

                    <div className="p-3 bg-green-100 rounded-xl text-green-600 text-xl">
                        <FaMapMarkerAlt />
                    </div>

                    <div>

                        <p className="text-gray-500 text-sm">
                            Lokasi Terpilih
                        </p>

                        <h2 className="font-semibold">

                            {selectedWilayah
                                ? selectedWilayah.nama_Wilayah
                                : "Belum dipilih"}

                        </h2>

                        {selectedWilayah && (
                            <p className="text-sm text-gray-500">

                                {selectedWilayah.total_laporan}
                                {" "}
                                laporan -
                                {" "}
                                {selectedWilayah.status}

                            </p>
                        )}


                    </div>
                </div>
            </div>

            {/* CHART */}
            <div className="flex md:flex-row flex-col items-center h-auto gap-5">
                <div className="bg-white p-6 rounded-2xl shadow-md md:w-[40rem] w-[24rem] h-[18rem]">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">
                        Grafik Tinggi Air (24 Jam Terakhir)
                    </h2>
                    {
                        sensorInfo ? (
                            <Chart
                                options={chartOptions}
                                series={chartSeries}
                                type="line"
                                height={180}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-[180px]">
                                <p className="text-gray-400 text-sm">
                                    Belum ada data sensor
                                </p>
                            </div>
                        )
                    }

                    
                </div>
                {/* MAP */}
                <div className="bg-white p-6 rounded-2xl shadow-md h-[18rem] w-[24rem]">
                    <h2 className="text-lg font-semibold text-gray-700">
                        Monitoring Kecamatan Kota Makassar
                    </h2>
                    <MapView
                        data={mapData}
                        onSelectWilayah={
                            setSelectedWilayah
                        }
                    />
                </div>
            </div>

        </div>
    );
}