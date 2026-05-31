"use client";

import {
    MapContainer,
    TileLayer,
    CircleMarker,
    Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function getColor(status) {

    switch (status) {

        case "Aman":
            return "green";

        case "Waspada":
            return "yellow";

        case "Bahaya":
            return "red";

        case "Offline":
            return "gray";

        case "Data Tidak Ada":
            return "blue";

        default:
            return "gray";
    }
}

export default function MapView({
    data,
    onSelectWilayah,
}) {

    return (
        <MapContainer
            center={[-5.1477, 119.4327]}
            zoom={11}
            scrollWheelZoom={true}
            className="h-[13rem] w-[20rem] rounded-2xl z-0"
        >

            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {data.map((item) => (

                <CircleMarker
                    key={item.id_kecamatan}
                    center={[
                        item.latitude,
                        item.longitude,
                    ]}
                    radius={12}
                    eventHandlers={{
                        click: () => {
                            onSelectWilayah(item);
                        },
                    }}
                    pathOptions={{
                        color:
                            getColor(item.status),

                        fillColor:
                            getColor(item.status),

                        fillOpacity: 0.8,
                    }}
                >

                    <Popup>

                        <div className="space-y-1">

                            <h2 className="font-bold">
                                {item.nama_Wilayah}
                            </h2>

                            <p>
                                Status:
                                {item.status}
                            </p>

                        </div>
                    </Popup>

                </CircleMarker>
            ))}
        </MapContainer>
    );
}