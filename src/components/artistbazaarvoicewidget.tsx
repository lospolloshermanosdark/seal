export function ArtistBazaarvoiceWidget(){

const html = `
<div class="container" id="ratingListing">
<h2 class="default-headline with-line"><span>SEAL FanReport: Classificação e Avaliações</span><span class="line"></span></h2>
<h3 class="headline3">Parabéns! Você é o primeiro a postar um FanReport para SEAL</h3>
<p class="paragraph">A sua opinião é muito importante para outros clientes que querem ir a um evento. Compartilhe sua experiência para que futuros participantes deste evento possam ter uma ideia do que esperar. Por favor, lembre-se de prestar atenção nas palavras utilizadas. Os FanReports são revisados e liberados por nossos editores. Nós nos reservamos o direito de não publicar posts que violem nossas regras de conduta.</p>
<div class="fanreport-listing">
<div class="fanreport-listing-header bottom-separator row theme-box-shadow-bottom">
<div class="fanreport-listing-header-item float-list float-list-aligned col-xs-12 col-sm-6 col-md-8">
<div class="fanreport-listing-count">
<h3 class="no-margin font-size-m float-list-item theme-headline-color">
0 Avaliações</h3>
</div>
<div class="float-list-item fanreport-listing-average-rating">
</div>
<span class="fanreport-legal-text">Informações e regras do <a data-href="/?doc=modalLayer&amp;fun=content&amp;staticContent=FANREPORT_CONDITIONS" class="link-variant js-modal-layer" role="button" tabindex="0" aria-haspopup="dialog">FanReport</a>
</span>
</div>
</div>
</div>
</div>
`;


return (
<section data-c="artistbazaarvoicewidget" dangerouslySetInnerHTML={{__html: html}} className="c-narrow c-full c-inner">
</section>
    )
}