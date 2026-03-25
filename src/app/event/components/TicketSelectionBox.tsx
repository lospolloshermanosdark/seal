"use client";

export default function TicketSelectionBox() {
  return (
    <section
      data-c="ticketselectionbox2"
      className="container margin-top-xxl "
      style={{padding: "0 10px"}}
    >
      <div className="row">
        <div className="col-xs-12">
          <div className="alert alert-with-stripe alert-with-stripe-info" style={{overflow: "hidden", borderRadius: "12px"}}>
            <div className="alert-stripe">
              <i className="icon icon-info-filled"></i>
            </div>

            <div className="alert-text">
              <b>Atenção:</b> A compra está limitada a{" "}
              <b>1 ingresso por vez</b>. Escolha apenas uma das opções abaixo.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
