"use client";
import { useState } from "react";
import ParticlesBackground from "@/components/ParticlesBackground";
import AvatarHeader from "@/components/AvatarHeader";
import ControlSegment from "@/components/ControlSegment";

export default function Home() {
    const [section, setSection] = useState("me"); // default section

    // (Tuỳ ý) Chưa cần import SectionMe... Nếu cần, cứ import thêm!

    return (
        <>
            <ParticlesBackground />
            <div
                style={{
                    height: "100vh",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#f9fafb",
                }}
            >
                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        paddingBottom: "200px",
                        paddingTop: "4em",
                    }}
                >
                    <div style={{ textAlign: "center" }}>
                        <AvatarHeader />
                        {/* Hiện tại chỉ có avatar, sau này chèn thêm section content ở đây */}
                    </div>
                </div>
                <div
                    style={{
                        position: "fixed",
                        bottom: "40px",
                        width: "100%",
                        zIndex: 1000,
                        backdropFilter: "blur(12px)",
                        backgroundColor: "transparent",
                    }}
                >
                    <ControlSegment onSelect={setSection} />
                </div>
            </div>
        </>
    );
}
