"use client";

import dynamic from "next/dynamic";

const Sidebar = dynamic(
    () => import("@/app/components/Navbar/page"),
    {
        ssr: false,
    }
);

const BottomNavbar = dynamic(
    () => import("@/app/components/BottomBar/page"),
    {
        ssr: false,
    }
);

export default function ClientLayout() {

    return (
        <>
            <Sidebar />
            <BottomNavbar />
        </>
    );
}