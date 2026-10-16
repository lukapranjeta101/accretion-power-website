import { ImageResponse } from "next/og";

export const alt = "Accretion Power — Powering progress. Part by part.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#040411",
          color: "#FFFFFF",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#91A9C9",
            }}
          />
          <div
            style={{
              fontSize: 28,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#B2B4AB",
            }}
          >
            Accretion Power
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
            Powering progress.
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, color: "#91A9C9" }}>
            Part by part.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 2,
            color: "#848C9B",
            textTransform: "uppercase",
          }}
        >
          Electrical components for North American utilities &amp; global OEMs
        </div>
      </div>
    ),
    { ...size }
  );
}
