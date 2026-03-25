"use client";

import AccessibilityScript from "./components/AccessibilityScript";
import { Accessibility } from "./components/accessibility";
import Header from "./components/Header/Header";
import StageArtwork from "./components/StageArtwork/StageArtwork";
import TicketSelectionBox from "./components/TicketSelectionBox";
import TicketSelectionFull from "./components/TicketSelection/TicketSelectionFull";
import { MoreInfo } from "./components/MoreInfo";
import { AdditionalBanner } from "./components/AdditionalBanner";
import { BackToTop } from "./components/BackToTop";
import { Breadcrumb } from "./components/Breadcrumb";
import { Footer } from "./components/Footer";
import { Artiststage } from "@/components/Artiststage";
import { EventSelectionBox } from "@/components/EventSelectionBox";
import { Main } from "@/components/Main";

export default function EventPage() {
  return (
    <>
      <link
        id="ev-style-sheet"
        rel="stylesheet"
        href="/eventim/css/patterns.css"
      />

      {/* CSS contraste local */}
      <link
        id="contrast-style"
        rel="stylesheet"
        href="/eventim/css/patterns-contrast.css"
        // @ts-ignore
        disabled
      />

      {/* Acessibilidade */}
      <Accessibility />

      {/* Script original em React -> controla zoom/contraste */}
      <AccessibilityScript />
      <Header />

      {/* Conteúdo */}
      <div className="outer-bg u-text-color">

        <Main>
          <Artiststage />
          <TicketSelectionBox />
          <TicketSelectionFull />
          <AdditionalBanner />

        </Main>
      </div>
      <BackToTop />
      <Breadcrumb />
      <Footer />
    </>
  );
}
