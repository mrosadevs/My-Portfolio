import { ImageResponse } from "next/og";

export const alt = "Manuel Rosales | Software Engineer & Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0a0f 0%, #111118 50%, #0d0d14 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-50px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)",
          }}
        />

        {/* Code decoration */}
        <div
          style={{
            display: "flex",
            fontSize: "16px",
            color: "rgba(99,102,241,0.5)",
            marginBottom: "24px",
            letterSpacing: "2px",
          }}
        >
          {"<Portfolio />"}
        </div>

        {/* Name */}
        <div
          style={{
            display: "flex",
            fontSize: "72px",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
            letterSpacing: "-2px",
          }}
        >
          Manuel Rosales
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: "28px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.5)",
            marginTop: "16px",
            letterSpacing: "1px",
          }}
        >
          Software Engineer & Designer
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "40px",
              height: "3px",
              background: "linear-gradient(90deg, #6366f1, #10b981)",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: "14px",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            mrosadev.online
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
