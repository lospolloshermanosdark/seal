"use client";

import { ArtistBazaarvoiceWidget } from "@/components/artistbazaarvoicewidget";
import { ArtistPortfolio } from "@/components/ArtistPortfolio";
import { ArtistPortfolioGaleria } from "@/components/ArtistPortfolioGaleria";
import { Artiststage } from "@/components/Artiststage";
import { EditorialComponent } from "@/components/EditorialComponent";
import { EventSelectionBox } from "@/components/EventSelectionBox";
import { Footer } from "@/components/Footer";
import { Main } from "@/components/Main";
import { ContrasteHeader } from "@/components/ui/contraste";
import HeaderPrincipal from "@/components/ui/header";

export default function Page() {
  return (
    <>
      <div className="wrapper wrapper-container  ">
        <ContrasteHeader />
        <HeaderPrincipal />
        <Main>
          <Artiststage />
          <EventSelectionBox/>
          <EditorialComponent />
          <ArtistPortfolio />
          <ArtistPortfolioGaleria />
          <ArtistBazaarvoiceWidget />
        </Main>
        <Footer />
      </div>

    </>
  );
}
