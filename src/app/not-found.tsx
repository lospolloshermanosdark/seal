"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="nf">
      <div className="nf-box">

        <div className="nf-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="nf-icon-svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9.75 9.75L14.25 14.25M14.25 9.75L9.75 14.25"
            />
          </svg>
        </div>

        <h1 className="nf-title">Página não encontrada</h1>

        <p className="nf-desc">
          O conteúdo que você tentou acessar não existe ou foi removido.
        </p>

        <div className="nf-buttons">
          <Link href="/" className="nf-btn nf-primary">
            Voltar para a Home
          </Link>

          <button className="nf-btn nf-secondary" onClick={() => history.back()}>
            Voltar (uma página)
          </button>
        </div>
      </div>

      {/* =======================
          CSS PURO INLINE
      ======================= */}
      <style>{`
        .nf {
          min-height: 100vh;
          padding: 24px;
          background: #f3f4f7;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .nf-box {
          width: 100%;
          max-width: 420px;
          background: #fff;
          padding: 32px;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.06);
          text-align: center;
        }

        .nf-icon {
          width: 90px;
          height: 90px;
          margin: 0 auto;
          border-radius: 50%;
          background: #eef2ff;
          border: 1px solid #d0d7ff;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .nf-icon-svg {
          width: 48px;
          height: 48px;
          stroke: #3b5bdb;
        }

        .nf-title {
          margin-top: 20px;
          font-size: 26px;
          font-weight: 700;
          color: #111;
        }

        .nf-desc {
          margin-top: 10px;
          font-size: 16px;
          color: #555;
        }

        /* BUTTONS */
        .nf-buttons {
          margin-top: 26px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .nf-btn {
          padding: 14px 22px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          display: block;
        }

        .nf-primary {
          background: #0b74ff;
          color: white;
        }

        .nf-primary:hover {
          background: #005ee0;
        }

        .nf-secondary {
          background: #fff;
          border: 1px solid #ddd;
          color: #444;
        }

        .nf-secondary:hover {
          background: #f5f5f5;
        }

        /* Desktop */
        @media (min-width: 768px) {
          .nf-box {
            padding: 40px;
          }

          .nf-title {
            font-size: 28px;
          }
        }
      `}</style>
    </main>
  );
}
