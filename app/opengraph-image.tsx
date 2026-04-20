import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "agenticjournaling — Journal · Listen · Integrate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FAFAF8",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          color: "#2F2F2F",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "40px",
            marginBottom: "60px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#6B6560",
            }}
          />
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#6B6560",
            }}
          />
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#6B6560",
            }}
          />
        </div>
        <div
          style={{
            fontSize: "96px",
            fontWeight: 400,
            letterSpacing: "-0.4px",
            opacity: 0.88,
            display: "flex",
          }}
        >
          Journal
          <span style={{ color: "#6B6560", padding: "0 20px", fontWeight: 300 }}>
            ·
          </span>
          Listen
          <span style={{ color: "#6B6560", padding: "0 20px", fontWeight: 300 }}>
            ·
          </span>
          Integrate
        </div>
        <div
          style={{
            marginTop: "48px",
            fontSize: "28px",
            fontStyle: "italic",
            color: "#6B6560",
            opacity: 0.9,
          }}
        >
          agenticjournaling.com
        </div>
      </div>
    ),
    { ...size }
  );
}
