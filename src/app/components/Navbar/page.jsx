"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    FaTachometerAlt,
    FaDatabase,
    FaInfoCircle,
    FaRegUserCircle
} from "react-icons/fa";

export default function Sidebar() {

    const pathname = usePathname();

    // =========================
    // AMBIL USER
    // =========================

    let user = null;

    if (typeof window !== "undefined") {

        const storedUser =
            localStorage.getItem("user");

        if (storedUser) {
            user = JSON.parse(storedUser);
        }
    }

    // =========================
    // MENU BERDASARKAN ROLE
    // =========================

    let menuItems = [];

    // BELUM LOGIN
    if (!user) {

        menuItems = [
            {
                name: "Dashboard",
                icon: FaTachometerAlt,
                link: "/",
            },
            {
                name: "Account",
                icon: FaRegUserCircle,
                link: "/components/Register",
            },
        ];
    }

    // USER
    else if (user.role === "user") {

        menuItems = [
            {
                name: "Dashboard",
                icon: FaTachometerAlt,
                link: "/",
            },
            {
                name: "Laporan",
                icon: FaInfoCircle,
                link: "/pages/Laporan",
            },
            {
                name: "Account",
                icon: FaRegUserCircle,
                link: "/pages/Account",
            },
        ];
    }

    // ADMIN / PETUGAS
    else if (
        user.role === "admin" ||
        user.role === "petugas"
    ) {

        menuItems = [
            {
                name: "Dashboard",
                icon: FaTachometerAlt,
                link: "/",
            },
            {
                name: "History",
                icon: FaDatabase,
                link: "/pages/History",
            },
            {
                name: "Laporan",
                icon: FaInfoCircle,
                link: "/pages/Laporan",
            },
            {
                name: "Account",
                icon: FaRegUserCircle,
                link: "/pages/Account",
            },
        ];
    } else if (user.role === "operator") {
        menuItems = [
            {
                name: "Dashboard",
                icon: FaTachometerAlt,
                link: "/",
            },
            {
                name: "Wilayah",
                icon: FaDatabase,
                link: "/pages/Wilayah",
            },
            {
                name: "Sensor",
                icon: FaDatabase,
                link: "/pages/Sensor",
            },
            {
                name: "Account",
                icon: FaRegUserCircle,
                link: "/pages/Account",
            },
        ];
    }

    // =========================
    // HALAMAN TANPA SIDEBAR
    // =========================

    const hiddenPages = [
        "/components/Login",
        "/components/Register",
        "/components/FormLaporan",
    ];

    if (hiddenPages.includes(pathname)) {
        return null;
    }

    return (
        <div className="hidden md:flex h-screen w-64 bg-[#1e293b] text-white flex-col p-4">

            {/* TITLE */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold">
                    CAREBA
                </h1>
            </div>

            {/* MENU */}
            <div className="flex flex-col gap-2">

                {menuItems.map((item) => (

                    <Link
                        key={item.name}
                        href={item.link}
                        className={`
                            flex items-center gap-3
                            px-4 py-3 rounded-xl
                            transition-all
                            ${pathname === item.link
                                ? "bg-blue-500 text-white"
                                : "hover:bg-slate-700 text-gray-300"
                            }
                        `}
                    >
                        <span className="text-lg">
                            <item.icon />
                        </span>

                        <span className="text-sm font-medium">
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>

            {/* FOOTER */}
            <div className="mt-auto text-xs text-gray-400">
                © 2026 Arga Prime
            </div>
        </div>
    );
}