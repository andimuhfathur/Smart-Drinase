"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    FaTachometerAlt,
    FaDatabase,
    FaInfoCircle,
    FaRegUserCircle,
} from "react-icons/fa";

export default function BottomNavbar() {

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
                icon: <FaTachometerAlt />,
                li: "/",
            },
            {
                name: "Account",
                icon: <FaRegUserCircle />,
                li: "/components/Register",
            },
        ];
    }

    // USER
    else if (user.role === "user") {

        menuItems = [
            {
                name: "Dashboard",
                icon: <FaTachometerAlt />,
                li: "/",
            },
            {
                name: "Laporan",
                icon: <FaInfoCircle />,
                li: "/pages/Laporan",
            },
            {
                name: "Account",
                icon: <FaRegUserCircle />,
                li: "/pages/Account",
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
                icon: <FaTachometerAlt />,
                li: "/",
            },
            {
                name: "History",
                icon: <FaDatabase />,
                li: "/pages/History",
            },
            {
                name: "Laporan",
                icon: <FaInfoCircle />,
                li: "/pages/Laporan",
            },
            {
                name: "Account",
                icon: <FaRegUserCircle />,
                li: "/pages/Account",
            },
        ];
    }

    // =========================
    // HIDDEN PAGE
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
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#1e293b] border-t border-slate-700 z-50">

            <div className="flex justify-around items-center py-3">

                {menuItems.map((item) => {

                    const active =
                        pathname === item.li;

                    return (
                        <Link
                            key={item.name}
                            href={item.li}
                            className={`
                                flex flex-col items-center text-xs transition
                                ${active
                                    ? "text-blue-400"
                                    : "text-gray-400"
                                }
                            `}
                        >
                            <div className="text-xl mb-1">
                                {item.icon}
                            </div>

                            <span>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}