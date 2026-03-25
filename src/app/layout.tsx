import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";

const formula1 = localFont({
  src: [
    {
      path: "./fonts/Formula1-Regular_web_0.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Formula1-Bold_web_0.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Formula1-Wide_web_0.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-formula1",
});

export const metadata: Metadata = {
  title: "FORMULA 1 MSC CRUISES GP São Paulo 2026",
  description:
    "Compre seu ingresso para o FORMULA 1 MSC CRUISES GRANDE PRÊMIO DE SÃO PAULO 2026.",
  icons: {
    icon: "https://www.eventim.com.br/campaign/_assets/e20b97eb2f49e269a0238d41d5a90e2e/gfx/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="stylesheet"
          href="https://www.eventim.com.br/campaign/_assets/e20b97eb2f49e269a0238d41d5a90e2e/fontawesome/css/v4-shims.min.css?1761734868"
        />
        <link
          rel="stylesheet"
          href="https://www.eventim.com.br/campaign/_assets/e20b97eb2f49e269a0238d41d5a90e2e/fontawesome/css/v5-font-face.min.css?1761734868"
        />
    
        <link
          rel="stylesheet"
          href="https://www.eventim.com.br/campaign/_assets/e20b97eb2f49e269a0238d41d5a90e2e/fontawesome/css/all.css?1761734868"
        />
        <link rel="preload" href="https://www.eventim.com.br/obj/assets/toolkit/fonts/icons.woff2" as="font" type="font/woff2" crossOrigin=""></link>
        {/* Scripts globais usados pelo site inteiro */}
        <link rel="stylesheet" href="/eventim/css/patterns.css" />

        <Script src="https://www.eventim.com.br/campaign/_assets/e20b97eb2f49e269a0238d41d5a90e2e/JavaScript/Inline/optimizely.js?1761734868"></Script>
        {/* Google Tag Manager */}
        <Script id="gtm-script">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),
              dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K3R9PNXK');
          `}
        </Script>


      </head>

      <body
        className={`outer-bg u-text-color ${formula1.variable}`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K3R9PNXK"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {children}

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        <Script src="/js/menu.js" strategy="afterInteractive" />
        <Script src="/js/mobile-menu.js" strategy="afterInteractive" />
        <Script src="/js/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
