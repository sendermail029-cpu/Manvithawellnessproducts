import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "GLUCOAMRUTH | మధుమేహం సహాయక ఆరోగ్య ఉత్పత్తి",
  description:
    "GLUCOAMRUTH మధుమేహ నియంత్రణకు సహాయకంగా రూపొందించిన సహజ ఆరోగ్య ఫార్ములా.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="te">
      <body>{children}</body>
    </html>
  );
}
