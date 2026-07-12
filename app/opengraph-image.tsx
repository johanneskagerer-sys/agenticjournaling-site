import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "agenticjournaling — Journal · Relate · Integrate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const wordStyle = {
    fontSize: "96px",
    fontWeight: 400,
    letterSpacing: "-0.4px",
    color: "#2F2F2F",
    opacity: 0.88,
    display: "flex",
  } as const;

  const dotStyle = {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#6B6560",
    marginBottom: "56px",
  } as const;

  const columnStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  } as const;

  const separatorStyle = {
    fontSize: "96px",
    fontWeight: 300,
    color: "#6B6560",
    opacity: 0.88,
    padding: "0 24px",
    display: "flex",
  } as const;

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
            alignItems: "flex-end",
            marginBottom: "48px",
          }}
        >
          <div style={columnStyle}>
            <div style={dotStyle} />
            <div style={wordStyle}>Journal</div>
          </div>
          <div style={separatorStyle}>·</div>
          <div style={columnStyle}>
            <div style={dotStyle} />
            <div style={wordStyle}>Relate</div>
          </div>
          <div style={separatorStyle}>·</div>
          <div style={columnStyle}>
            <div style={dotStyle} />
            <div style={wordStyle}>Integrate</div>
          </div>
        </div>
        <div
          style={{
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
