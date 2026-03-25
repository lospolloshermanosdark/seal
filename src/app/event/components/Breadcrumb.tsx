"use client";

export function Breadcrumb() {
  const html = `
<section data-c="breadcrumb" class="c-narrow container notPrinted">
  <ol class="u-flex u-flex-wrap list-item-unstyled" data-qa="breadcrumbs">
<li class="breadcrumb-item">
<a href="/" class="breadcrumbs-link link" data-qa="breadcrumb-home">Home</a>
</li>
<li class="breadcrumb-item">
<a href="/artists/" class="breadcrumbs-link link" data-qa="breadcrumb-artists">Artistas</a>
</li>
<li class="breadcrumb-item">
<a href="/artist/seal/" class="breadcrumbs-link link" data-qa="breadcrumb-artistpage">SEAL</a>
</li>
</ol>
</section>
  `;

  return (
    <>

      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
