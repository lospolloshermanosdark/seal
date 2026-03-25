export function PText(){

    const htmlp = `
    <p style="
    padding: 23px 26px;
" class="theme-text-color">Os preços dos ingressos incluem impostos. Taxas de entrega e taxas de
                      serviço, quando aplicáveis, são adicionadas ao carrinho de compras na próxima página.</p>
    `

    return(
        <div dangerouslySetInnerHTML={{ __html: htmlp }} />
    )
}