import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "💖 Para Sio ~ Feliz San Valentín 💖",
  description: "Una postal de San Valentín especial para Sio ♥",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
