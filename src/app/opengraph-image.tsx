import { ImageResponse } from "next/og";

export const alt =
    "Valorant Vault — Explorez les agents Valorant";

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "64px",
                    background:
                        "radial-gradient(circle at 20% 20%, #4b2028 0%, #0f1923 48%, #081017 100%)",
                    color: "#f9f9f9",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "64px",
                        border: "2px solid rgba(255,255,255,0.18)",
                        borderRadius: "32px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            maxWidth: "760px",
                            flexDirection: "column",
                        }}
                    >
            <span
                style={{
                    marginBottom: "24px",
                    color: "#ff4655",
                    fontSize: "24px",
                    fontWeight: 800,
                    letterSpacing: "6px",
                    textTransform: "uppercase",
                }}
            >
              Projet pédagogique Next.js
            </span>

                        <span
                            style={{
                                fontSize: "92px",
                                fontWeight: 900,
                                lineHeight: 0.9,
                                letterSpacing: "-5px",
                                textTransform: "uppercase",
                            }}
                        >
              Valorant Vault
            </span>

                        <span
                            style={{
                                marginTop: "32px",
                                color: "#aeb8c2",
                                fontSize: "30px",
                            }}
                        >
              Explorez les agents, leurs rôles et leurs
              compétences.
            </span>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            width: "220px",
                            height: "320px",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "3px solid #ff4655",
                            borderRadius: "24px",
                            background:
                                "linear-gradient(145deg, #ff4655, #172430 65%)",
                            boxShadow:
                                "0 30px 70px rgba(0,0,0,0.45)",
                            fontSize: "120px",
                            fontWeight: 900,
                            transform: "rotate(5deg)",
                        }}
                    >
                        V
                    </div>
                </div>
            </div>
        ),
        size,
    );
}