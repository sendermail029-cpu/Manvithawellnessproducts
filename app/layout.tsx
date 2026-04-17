import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Manvitha Wellness | బరువు తగ్గింపు & జీర్ణక్రియ ఆరోగ్య ఉత్పత్తులు",
  description:
    "Manvitha Wellness బరువు తగ్గించడానికి మరియు జీర్ణక్రియను మెరుగుపరచడానికి సహజ ఆరోగ్య ఉత్పత్తులను అందిస్తుంది. మెటబాలిజం పెంచడం, బెల్లీ ఫ్యాట్ తగ్గించడం మరియు సంపూర్ణ ఆరోగ్యాన్ని మెరుగుపరచడంలో సహాయపడుతుంది.",
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
