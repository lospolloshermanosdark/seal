export function EventSelectionBox() {
    const html = `
<div class="listing-item-wrapper-inside-card">

<!-- ================= RIO ================= -->
<div class="listing-container u-shadow clearfix standard-gray-shadow u-position-relative">
<article class="listing-item event-listing-item list-element theme-element-radius">
<div class="event-listing-link-wrapper">

<div class="col-xs-3 col-sm-3 col-md-2 text-center event-listing-date-box">
<div class="u-flex u-flex-column u-flex-v-center">

<time class="event-listing-date">26</time>
<time class="event-listing-month">nov. 2026</time>
<time class="event-listing-time">sex.</time>

<div class="availability-indicator-green availability-indicator-pill">
Ainda disponível
</div>

</div>
</div>

<div class="col-xs-9 col-sm-9 col-md-10 event-listing-info-wrapper">
<div class="row u-flex u-flex-v-center">

<div class="col-xs-9 col-sm-8 col-md-7 event-listing-info-inner">
<h2 class="event-listing-city">SHOW - RIO DE JANEIRO</h2>

<ul>
<li class="event-listing-venue">RIO DE JANEIRO</li>
<li class="event-listing-event">QUALISTAGE</li>
</ul>

<ul>
<li class="event-listing-price margin-top-xs event-price-available">
<span class="theme-interaction-color">
a partir de R$ 197,50
</span>
</li>
</ul>
</div>

<div class="col-sm-4 col-md-3 event-listing-buy">
<span class="event-listing-price">
<span class="theme-interaction-color">
a partir de R$ 197,50
</span>
</span>

<a href="/event?cidade=rio-de-janeiro" class="btn btn-primary btn-sm btn-block">
Comprar
</a>
</div>

</div>
</div>

</div>
</article>
</div>


<!-- ================= SÃO PAULO ================= -->
<div class="listing-container u-shadow clearfix standard-gray-shadow u-position-relative margin-top-m">
<article class="listing-item event-listing-item list-element theme-element-radius">
<div class="event-listing-link-wrapper">

<div class="col-xs-3 col-sm-3 col-md-2 text-center event-listing-date-box">
<div class="u-flex u-flex-column u-flex-v-center">

<time class="event-listing-date">28</time>
<time class="event-listing-month">nov. 2026</time>
<time class="event-listing-time">dom.</time>

<div class="availability-indicator-green availability-indicator-pill">
Ainda disponível
</div>

</div>
</div>

<div class="col-xs-9 col-sm-9 col-md-10 event-listing-info-wrapper">
<div class="row u-flex u-flex-v-center">

<div class="col-xs-9 col-sm-8 col-md-7 event-listing-info-inner">
<h2 class="event-listing-city">SHOW - SÃO PAULO</h2>

<ul>
<li class="event-listing-venue">SÃO PAULO</li>
<li class="event-listing-event">ALLIANZ PARQUE</li>
</ul>

<ul>
<li class="event-listing-price margin-top-xs event-price-available">
<span class="theme-interaction-color">
a partir de R$ 172,50
</span>
</li>
</ul>
</div>

<div class="col-sm-4 col-md-3 event-listing-buy">
<span class="event-listing-price">
<span class="theme-interaction-color">
a partir de R$ 172,50
</span>
</span>

<a href="/event?cidade=sao-paulo" class="btn btn-primary btn-sm btn-block">
Comprar
</a>
</div>

</div>
</div>

</div>
</article>
</div>

</div>

`;

    return (
        <section data-c="eventselectionbox" dangerouslySetInnerHTML={{__html: html}} id="eventSelectionBox"
            className="container margin-top-xxl js-component-loader-partial js-component-loader js-track-teaser-general js-data-teaser-row"
            data-component-loader-partials="js-load-event-selection-box"
            data-partial="true" data-click-trigger=".js-component-loader-partial-click"
            data-teaser-row="2"></section>
    )
}