let cachedToken: string | null = null;
let tokenExpiresAt: number | null = null;

export async function getPagloopToken() {
  // Se ainda válido, reutiliza
  if (cachedToken && tokenExpiresAt && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const res = await fetch("https://api.pagloop.tech/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.PAGLOOP_CLIENT_ID,
      client_secret: process.env.PAGLOOP_CLIENT_SECRET,
    }),
  });

  if (!res.ok) {
    throw new Error("Erro ao autenticar na Pagloop");
  }

  const data = await res.json();

  cachedToken = data.token;

  // expira em 55 min (segurança)
  tokenExpiresAt = Date.now() + 55 * 60 * 1000;

  return cachedToken;
}
