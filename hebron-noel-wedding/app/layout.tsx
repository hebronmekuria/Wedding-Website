import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hebron & Noel | Save the Date",
  description: "Join Hebron and Noel as they begin their next chapter. May 29, 2027 · Addis Ababa, Ethiopia.",
  metadataBase: new URL("https://example.com")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}