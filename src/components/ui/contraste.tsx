export function ContrasteHeader() {
    const html = `

<div class="container u-text-color">
<div class="u-flex u-flex-justify-between margin-bottom-m">
<div>
<button class="btn-disguise margin-left-xl js-zooming-minus no-padding-bottom js-tracking" type="button" title="Diminuir" aria-label="Diminuir" data-tracking-category="accessibility" data-tracking-action="font_size" data-tracking-label="minus" disabled="">
A-</button>
<button class="btn-disguise margin-left-xl no-padding-bottom js-zooming-plus js-tracking" type="button" title="Aumentar" aria-label="Aumentar" data-tracking-category="accessibility" data-tracking-action="font_size" data-tracking-label="plus">
A+</button>
<button class="btn-disguise margin-left-xl no-padding-bottom js-tracking js-contrast js-contrast-on" type="button" data-tracking-category="accessibility" data-tracking-action="contrast" data-tracking-label="on">Contraste</button>
<button class="btn-disguise margin-left-xl no-padding-bottom js-tracking js-contrast js-contrast-off hidden" type="button" data-tracking-category="accessibility" data-tracking-action="contrast" data-tracking-label="off">Contraste</button>
</div>
<div>
<a class="btn-disguise u-no-link-style no-padding-bottom margin-right-xl hidden-xs hidden-sm" href="#searchterm" accesskey="1">
Busca [1]
</a>
<a class="btn-disguise u-no-link-style margin-right-xl no-padding-bottom hidden-xs hidden-sm" href="#main" accesskey="2">
Conteúdo [2]
</a>
<a class="btn-disguise u-no-link-style margin-right-xl no-padding-bottom hidden-xs hidden-sm" href="#footer" accesskey="3">
Rodapé [3]
</a>
<a class="btn-disguise u-no-link-style margin-right-xl no-padding-bottom" href="/help/accessibility/">
Acessibilidade</a>
</div>
</div>
</div>

`;
    return (
        <div dangerouslySetInnerHTML={{ __html: html }} className="c-full no-theme notPrinted" id="a11yBar">

        </div>
    )
}