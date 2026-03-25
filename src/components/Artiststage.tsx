export function Artiststage(){

    const artistHTML = `
<style>
.artwork {
color: #000000
}
@media (min-width: 660px) {
.artwork {
background-color: #ffffff
}
.gradient-left {
background: linear-gradient(
to right,
#ffffff,
transparent
)
}
.gradient-right {
background: linear-gradient(
to left,
#ffffff,
transparent
)
}
}
.artwork-image {
background-image: url("https://www.eventim.com.br/obj/media/BR-eventim/galery/kuenstler/s/Seal_PacoteEventim_1242x480.png")
}
</style>

<div class="stage" style="background-color: #ffffff;">
<div class="main-stage-bg hidden-xs">
<img src="https://www.eventim.com.br/obj/media/BR-eventim/galery/kuenstler/s/Seal_PacoteEventim_1242x480.png" class="stage-blurred-image" alt="">
</div>
<div class="artwork artwork-scalable artist-stage u-position-relative">
<div class="artwork-image-container">
<div class="hidden-xs u-height-100">






<div class="container artwork-content padding-bottom-xl">
<div class="artwork-content-text">
<div class="stage-content-text">
<div class="stage-headline">SEAL</div>
</div>
</div>
</div>
</div>
<div class="artwork-image">
<div class="gradient gradient-left"></div>
<div class="gradient gradient-right"></div>
</div>
</div>
<div class="visible-xs fullwidth">






<div class="container artwork-content padding-bottom-xl">
<div class="artwork-content-text">
<div class="stage-content-text">
<div class="stage-headline">SEAL</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="container u-position-relative">
<div class="stage-buttons-wrapper">
<div class="stage-buttons-container u-flex-justify-end">
<div class="u-flex">
<div class="stage-player-button-box js-scroll">
<a href="#portfolio-audio" class="play-btn js-scroll-trigger js-apple-music-link-btn" aria-label="Listen to music">
<div class="play-btn-icon"></div>
</a>
<button class="play-btn hidden js-apple-music-btn" type="button" aria-label="Listen to music">
<i class="play-btn-icon"></i>
</button>
</div>
<div class="stage-favs-buttons-box">
<div class="stage-favs-btn fav-btn js-fav" title="Clique no ícone para adicionar aos seus favoritos." tabindex="0" role="checkbox" aria-checked="false" data-qa="icon-follow-881263">
<i class="icon icon-follow icon-follow-outline js-fav-icon">
<span class="sr-only">Clique no ícone para adicionar aos seus favoritos.</span>
</i>
<script type="application/configuration">
{
"favId": "881263",
"refType": "ARTIST",
"icon": "icon-follow",
"name": "SEAL",
"isStageBtn": true,
"trackingCategory": "favorite_stage",
"trackingAction": "activation",
"trackingLabel": "artist_seal",
"trackParamsGa4": {
"wishlist_placement": "artist",
"wishlist_feature": "stage_heart_icon",
"wishlist_selected": "artist_881263",
"wishlist_type": "favorites"
},
"messages": {
"favTooltip": {
"title": "Salve {0} nos seus favoritos",
"bullet1": "Encontre eventos que você vai gostar",
"bullet2": "Saiba quando seus favoritos estiverem em turnê"
}
}
}
</script>
</div>
</div>
</div>
</div>
</div>
</div>

    
    
    `;

    return (
<section data-c="artiststage" className="c-flat with-stage-buttons" dangerouslySetInnerHTML={{__html: artistHTML }}></section>
    )
}