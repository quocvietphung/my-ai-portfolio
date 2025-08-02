'use client';

import { useState } from "react";
import ParticlesBackground from "@/components/ParticlesBackground";
import AvatarHeader from "@/components/AvatarHeader";

// Nếu chưa cần, tạm bỏ các import section khác nhé
// import ControlSegment from "@/components/ControlSegment";
// import SectionMe from "@/sections/SectionMe";
// ...

export default function Home() {
  // Nếu chưa dùng section, chỉ cần 1 state trống
  // const [section, setSection] = useState("");

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
            </div>
          </div>
          {/* Nếu sau này cần thanh ControlSegment, thêm vào dưới đây */}
        </div>
      </>
  );
}
