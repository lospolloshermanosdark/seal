$(function () {
  // CLICK CONTROLADO (SEM conflito)
  $(document).on("click", ".viewMore", function (e) {
    e.preventDefault();

    const target = $(this).attr("href");
    const el = $(target)[0];

    const instance = bootstrap.Collapse.getOrCreateInstance(el, {
      toggle: false,
    });

    if ($(target).hasClass("show")) {
      instance.hide();
    } else {
      instance.show();
    }
  });

  // ÍCONE (abre)
  $(".collapse").on("shown.bs.collapse", function () {
    const id = `#${this.id}`;

    $(`a[href="${id}"] i`)
      .removeClass("fa-caret-right")
      .addClass("fa-caret-down");
  });

  // ÍCONE (fecha)
  $(".collapse").on("hidden.bs.collapse", function () {
    const id = `#${this.id}`;

    $(`a[href="${id}"] i`)
      .addClass("fa-caret-right")
      .removeClass("fa-caret-down");
  });

  // ESTADO INICIAL
  $(".collapse.show").each(function () {
    const id = `#${this.id}`;

    $(`a[href="${id}"] i`)
      .removeClass("fa-caret-right")
      .addClass("fa-caret-down");
  });
});