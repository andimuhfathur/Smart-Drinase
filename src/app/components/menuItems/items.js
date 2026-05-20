import {
    FaTachometerAlt,
    FaDatabase,
    FaInfoCircle,
    FaRegUserCircle
} from "react-icons/fa";

export function getMenuItems(user) {

    // BELUM LOGIN
    if (!user) {
        return [
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
    if (user.role === "user") {
        return [
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

    // ADMIN
    if (
        user.role === "admin" ||
        user.role === "petugas"
    ) {
        return [
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
    }

    return [];
}