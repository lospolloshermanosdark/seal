"use client";

import Image from "next/image";
import "./StageArtwork.css";

export default function StageArtwork() {
  return (
    <div className="show-stage-image" data-qa="eventstage2-show-artwork-image">
      <section data-c="eventstage2" className="c-flat">
        <div className="stage" style={{ backgroundColor: "#000000" }}>
          {/* Fundo borrado desktop */}
          <div className="main-stage-bg hidden-xs">
            <Image
              src="/eventim/assets/Dominguinho_Eventim_1240x480.png"
              alt=""
              className="stage-blurred-image"
              width={1920}
              height={1080}
            />
          </div>

          <div className="artwork artwork-scalable u-position-relative">
            <div className="artwork-image-container">
              <div className="hidden-xs">
                <div className="container artwork-content">
                  <div className="artwork-content-text">
                    <div className="stage-content-text">
                      <div className="hidden-xs visible-lg visible-sm visible-md">
                        <div className="back-link-container u-flex">
                          <div className="back-link-wrapper margin-right-m notPrinted js-show-in-iframe-only hidden">
                            <a
                              className="link display-inline-block theme-headline-color js-tracking js-track"
                              title="Voltar"
                              href="javascript:history.go(-1);"
                            >
                              <i className="icon icon-chevron-left before-text" />
                              <span>Voltar</span>
                            </a>
                          </div>

                          <div className="back-link-wrapper notPrinted">
                            <a
                              className="link display-inline-block theme-headline-color js-tracking js-track"
                              href="https://www.eventim.com.br/artist/formula-1/?affiliate=F1M#calendar-start=2026-11"
                            >
                              <span>
                                <i className="icon icon-chevron-left before-text" />
                                <span>Voltar</span>
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Data e Local */}
                    <div>
                      <div className="stage-meta-infos stage-content-text-item">
                        <div className="stage-list-item">
                          <div className="display-inline-block">
                            <i className="stage-list-icon icon icon-calendar" />
                          </div>
                          <time data-qa="event-date">
                            sexta-feira, 06/11/2026 ─ domingo, 08/11/2026
                          </time>
                        </div>

                        <div className="stage-list-item u-position-relative">
                          <div className="display-inline-block">
                            <i className="stage-list-icon icon icon-location" />
                          </div>
                          <span className="u-position-relative">
                            <span />
                            <span>Autódromo de Interlagos</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="artwork-icons stage-content-icons" />
                </div>
              </div>

              {/* Imagem com gradientes */}
              <div className="artwork-image">
                <div className="gradient gradient-left" />
                <div className="gradient gradient-right" />
              </div>
            </div>

            {/* MOBILE */}
            <div className="visible-xs">
              <div className="container artwork-content">
                <div className="artwork-content-text">
                  <div className="stage-content-text">
                    <div className="stage-headline">
                      FORMULA 1 MSC CRUISES GRANDE PRÊMIO DE SÃO PAULO 2026 -
                      ORANGE TREE CLUB
                    </div>
                  </div>

                  <div>
                    <div className="stage-meta-infos stage-content-text-item">
                      <div className="stage-list-item">
                        <div className="display-inline-block">
                          <i className="stage-list-icon icon icon-calendar" />
                        </div>
                        <time>sexta-feira, 06/11/2026 ─ domingo, 08/11/2026</time>
                      </div>

                      <div className="stage-list-item u-position-relative">
                        <div className="display-inline-block">
                          <i className="stage-list-icon icon icon-location" />
                        </div>
                        <span className="u-position-relative">
                          <span />
                          <span>Autódromo de Interlagos</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="artwork-icons stage-content-icons" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
