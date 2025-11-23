console.log("SCRIPT INTERLAGOS ATIVADO ✔️");

/* ============================================================================
   NAMESPACE GLOBAL (Next.js safe)
============================================================================ */
if (!window.f1) window.f1 = {};
if (!window.f1.ready)
  window.f1.ready = {
    menu: false,
    sbnf: false,
    track: false,
  };

/* ============================================================================
   HELPER — executa só após tudo carregado (incluindo Bootstrap)
============================================================================ */
function onReady(callback) {
  if (document.readyState === "complete") {
    callback();
  } else {
    window.addEventListener("load", callback);
  }
}

/* ============================================================================
   1. MENU
============================================================================ */
(function initMenu() {
  if (window.f1.ready.menu) return;

  const navPc = document.querySelector("#c1038654 ul");
  const navBtn = document.querySelector("#c1038651 p");
  const navMob = document.querySelector("#c1038648 ul");

  if (!navPc || !navBtn || !navMob) {
    return setTimeout(initMenu, 40);
  }

  window.f1.ready.menu = true;

  window.ilNavMngr = function (pcId, btnId, mobId) {
    const pc = document.querySelector(`#c${pcId} ul`);
    const btn = document.querySelector(`#c${btnId} p`);
    const mob = document.querySelector(`#c${mobId} ul`);

    if (pc) {
      pc.classList.add("iprimeNavListPc");
      fix(pc);
    }
    if (btn) btn.classList.add("iprimeNavBtn");

    if (mob) {
      mob.classList.add("iprimeNavListMobile");
      fix(mob);
    }

    function fix(ul) {
      ul.querySelectorAll(":scope>li").forEach((li) => {
        if (li.querySelector(".ilNavSclLink"))
          li.classList.add("ilNavSclLinksBox");
        if (li.querySelector(".ilNavLangLink"))
          li.classList.add("ilNavLangLinkBox");
        if (li.querySelector(".ilNavEvLink"))
          li.classList.add("ilNavEvLinkBox");
      });
    }
  };

  window.iprimeNavMobileToggle = function (uid) {
    const btn = document.querySelector(`.uid${uid} p.iprimeNavBtn`);
    const mob = document.querySelector(`.uid${uid} ul.iprimeNavListMobile`);
    if (!btn || !mob) return;

    btn.style.cursor = "pointer";

    btn.addEventListener("click", () => {
      const open = mob.style.top !== "0px" && mob.style.top !== "";
      open
        ? window.iprimeNavListHide(btn, mob)
        : window.iprimeNavListShow(btn, mob);
    });

    mob.addEventListener("click", () => window.iprimeNavListHide(btn, mob));
    window.addEventListener("resize", () => window.iprimeNavListHide(btn, mob));
  };

  window.iprimeNavListShow = (btn, mob) => {
    mob.style.top = mob.offsetHeight + "px";
    btn.innerText = "×";
  };

  window.iprimeNavListHide = (btn, mob) => {
    mob.style.top = "0";
    btn.innerText = "≡";
  };

  window.iprimeNavLinks = function (uid, offset) {
    const links = document.querySelectorAll(`.uid${uid} a.internalLink`);
    links.forEach((a) => {
      const id = a.href.split("#")[1];
      const target = document.querySelector(`#${id}`);

      a.style.cursor = "pointer";
      a.addEventListener("click", (e) => {
        e.preventDefault();
        if (!target) return;

        window.scrollTo({
          top: target.getBoundingClientRect().top + window.pageYOffset - offset,
          behavior: "smooth",
        });
      });
    });
  };

  window.ilNavMngr("1038654", "1038651", "1038648");
  window.iprimeNavMobileToggle("1038660");
  window.iprimeNavLinks("1038660", 60);
})();

/* ============================================================================
   2. SOCIAL BOX (SBNF)
============================================================================ */
(function initSbnf() {
  if (window.f1.ready.sbnf) return;

  const root = document.querySelector(".uid1038090");
  if (!root) return setTimeout(initSbnf, 40);

  window.f1.ready.sbnf = true;

  window.ilSbnfMngr = function (rootId, img, ev, sc, tn, tx) {
    const box = document.querySelector(`.uid${rootId}`);
    if (!box) return;

    const map = {
      [img]: "ilSbnfImgBx",
      [ev]: "ilSbnfEvslBx",
      [sc]: "ilSbnfSclBx",
      [tn]: "ilSbnfTncBx",
      [tx]: "ilSbnfTxtBx",
    };

    Object.keys(map).forEach((id) => {
      const el = box.querySelector(`#c${id}`);
      if (el) el.classList.add(map[id]);
    });
  };

  window.ilSbnfMngr(
    "1038090",
    "1038084",
    "1038078",
    "1038075",
    "1038072",
    "1038069"
  );
})();

/* ============================================================================
   3. TRACKMAP
============================================================================ */
onReady(() => {
  function initTrack() {
    const img = document.querySelector(".uid1038603");
    const info = document.querySelector(".uid1038588");

    if (!img || !info) return setTimeout(initTrack, 40);

    window.f1.ready.track = true;

    /* MANAGER */
    window.ilTrkmpMngr = function (imgId, infoId) {
      const imgBox = document.querySelector(`.uid${imgId}`);
      const infoBox = document.querySelector(`.uid${infoId}`);
      if (!imgBox || !infoBox) return;

      const markerBox = document.createElement("div");
      markerBox.classList.add("ilTrkmpSctrMrkrBox");
      imgBox.querySelector("picture")?.appendChild(markerBox);

      const sectors = [
        ["setor a", "ilSctrA"],
        ["setor b", "ilSctrB"],
        ["setor d", "ilSctrD"],
        ["setor g", "ilSctrG"],
        ["setor h", "ilSctrH"],
        ["setor m", "ilSctrM"],
        ["setor r", "ilSctrR"],
        ["pit", "ilSctrPsc"],
        ["grand", "ilSctrGpc"],
        ["orange", "ilSctrOtc"],

        /* NOVOS */
        ["gramado", "ilSctrHvg"],
        ["estrela", "ilSctrHve"],
      ];

      const boxes = infoBox.querySelectorAll(".gridelement");

      boxes.forEach((box) => {
        box.classList.add("ilTrkmpInfoBox");

        const title = (box.querySelector("h3")?.innerText || "").toLowerCase();

        sectors.forEach(([key, cls]) => {
          if (title.includes(key)) {
            window.ilSctrInfBxMngr(box, cls, infoBox, markerBox);
          }
        });

        box.querySelectorAll("p").forEach((p) => {
          if (
            p.innerText.toLowerCase() === "comprar ingressos" &&
            !p.querySelector("a")
          ) {
            const a = document.createElement("a");
            a.href = "#c0000000";
            a.innerText = "Comprar ingressos";
            p.innerHTML = "";
            p.appendChild(a);
          }
          if (p.querySelector("a")) p.classList.add("ilTixLinkShrtct");
        });

        const btn = box.querySelector("a.viewMore");
        if (btn) {
          btn.addEventListener("click", () => {
            infoBox.querySelectorAll("a.viewMore").forEach((other) => {
              if (
                other !== btn &&
                other.getAttribute("aria-expanded") === "true"
              ) {
                other.click();
              }
            });
            window.ilSctrInfBxCmprs(infoBox);
          });
        }
      });
    };

    /* SETOR HANDLER (GLOBAL) */
    window.ilSctrInfBxMngr = function (box, id, infoBox, markerBox) {
      box.classList.add(id);

      const btn = box.querySelector("a.viewMore");
      if (!btn) return;

      // 🔥 FIX OBRIGATÓRIO
      btn.setAttribute("sector-id", id);

      const marker = document.createElement("div");
      marker.className = `ilTrkmpSctrMrkr ${id}`;
      marker.setAttribute("sector-id", id);
      markerBox.appendChild(marker);

      marker.addEventListener("click", () => {
        infoBox.querySelectorAll("a.viewMore").forEach((b) => {
          if (b.getAttribute("sector-id") === id) b.click();
        });
      });

      btn.addEventListener("mouseover", () => marker.classList.add("ilHover"));
      btn.addEventListener("mouseout", () =>
        marker.classList.remove("ilHover")
      );

      btn.addEventListener("click", () => {
        setTimeout(() => {
          const exp = btn.getAttribute("aria-expanded") === "true";
          box.classList.toggle("ilActive", exp);

          markerBox.querySelectorAll(".ilTrkmpSctrMrkr").forEach((m) => {
            if (m.getAttribute("sector-id") === id) {
              m.classList.toggle("ilActive", exp);
            }
          });
        }, 120);
      });
    };

    /* COMPRESS (GLOBAL) */
    window.ilSctrInfBxCmprs = function (container) {
      setTimeout(() => {
        const anyOpen = [...container.querySelectorAll("a.viewMore")].some(
          (btn) => btn.getAttribute("aria-expanded") === "true"
        );

        container.classList.toggle("ilCompress", anyOpen);
      }, 80);
    };

    /* NAV LINKS */
    window.ilTrkmpNavLinks = function (infoId, tixId, offset) {
      const links = document.querySelectorAll(
        `.uid${infoId} p.ilTixLinkShrtct a`
      );

      links.forEach((lnk) => {
        const id = lnk.href.split("#")[1];
        const target =
          id && document.getElementById(id)
            ? document.getElementById(id)
            : document.querySelector(`.uid${tixId}`);

        lnk.addEventListener("click", (e) => {
          e.preventDefault();
          window.scrollTo({
            top:
              target.getBoundingClientRect().top + window.pageYOffset - offset,
            behavior: "smooth",
          });
        });
      });
    };

    window.ilTrkmpMngr("1038603", "1038588");
    window.ilTrkmpNavLinks("1038588", "1038447", 60);
  }

  initTrack();
});
