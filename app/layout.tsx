import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lourdesveiculos.com.br"),

  title: {
    default: "Lourdes Veículos",
    template: "%s | Lourdes Veículos",
  },

  description:
    "Estoque de veículos seminovos com procedência, qualidade e atendimento especializado.",

  keywords: [
    "Lourdes Veículos",
    "Veículos",
    "Carros",
    "Seminovos",
    "Usados",
    "Rio de Janeiro",
    "Campo Grande",
    "Automóveis",
  ],

  authors: [
    {
      name: "Lourdes Veículos",
    },
  ],

  creator: "Lourdes Veículos",

  publisher: "Lourdes Veículos",

  openGraph: {
    title: "Lourdes Veículos",

    description:
      "Estoque de veículos seminovos com procedência, qualidade e atendimento especializado.",

    url: "https://www.lourdesveiculos.com.br",

    siteName: "Lourdes Veículos",

    locale: "pt_BR",

    type: "website",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lourdes Veículos",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Lourdes Veículos",

    description:
      "Estoque de veículos seminovos com procedência e atendimento especializado.",

    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}