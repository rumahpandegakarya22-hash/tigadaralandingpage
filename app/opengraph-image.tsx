import { ImageResponse } from "next/og";

export const alt = "Kost Tiga Dara — Kost Putri Dekat UGM Sleman Jogja";
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
          alignItems: "center",
          justifyContent: "center",
          background: "#f8f6f2",
          color: "#3a3635",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: -1,
          }}
        >
          Kost Tiga Dara<span style={{ color: "#c92d31" }}>.</span>
        </div>
        <div style={{ fontSize: 30, marginTop: 18, opacity: 0.85 }}>
          Kost Putri Dekat UGM
        </div>
        <div style={{ fontSize: 22, marginTop: 48, opacity: 0.6 }}>
          Caturtunggal, Sleman, Jogja
        </div>
      </div>
    ),
    { ...size }
  );
}