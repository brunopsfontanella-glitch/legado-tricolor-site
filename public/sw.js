// Service worker do app Legado Tricolor (protótipo).
// Estratégia: telas do app com rede primeiro e cópia em cache como reserva;
// arquivos estáticos (JS, CSS, ícones, imagens) com cache e atualização em segundo plano.
// A troca do nome apaga os caches das versões anteriores (inclusive qualquer resposta de erro que tenha ficado guardada).
const CACHE = "legado-app-v3";

// Só entram no cache respostas completas e bem-sucedidas. Um erro (404, 503) nunca pode ficar guardado,
// senão a tela deixa de abrir mesmo depois de o servidor voltar ao normal.
function guardar(cache, request, response) {
  if (response.status === 200 && response.type === "basic" && !response.redirected) {
    cache.put(request, response.clone());
  }
}

// Prefixo do site: "" na raiz ou "/nome-do-repositório" no GitHub Pages (deduzido do endereço deste arquivo).
const BASE = new URL("./", self.location).pathname.replace(/\/$/, "");
const BASE_RE = BASE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const STATIC_RE = new RegExp(`^${BASE_RE}/(_next/static|icons|images)/`);
const PRECACHE = [`${BASE}/app/`, `${BASE}/icons/icon-192.png`, `${BASE}/icons/icon-512.png`];

self.addEventListener("install", (event) => {
  // Um item que falhe (ex.: redirecionamento) não pode impedir a instalação.
  event.waitUntil(caches.open(CACHE).then((cache) => Promise.allSettled(PRECACHE.map((url) => cache.add(url)))));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate" && url.pathname.startsWith(`${BASE}/app`)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          caches.open(CACHE).then((cache) => guardar(cache, request, response));
          return response;
        })
        .catch(() => caches.match(request).then((hit) => hit || caches.match(`${BASE}/app/`))),
    );
    return;
  }

  if (STATIC_RE.test(url.pathname)) {
    event.respondWith(
      caches.open(CACHE).then(async (cache) => {
        const guardado = await cache.match(request);
        const hit = guardado && guardado.status === 200 ? guardado : undefined;
        // Arquivos de _next/static trazem o conteúdo no nome (hash): se já existe, serve direto.
        if (hit && url.pathname.includes("/_next/static/")) return hit;
        const network = fetch(request).then((response) => {
          guardar(cache, request, response);
          return response;
        });
        if (hit) {
          // Ícones e imagens: serve o guardado e atualiza ao fundo.
          network.catch(() => {});
          return hit;
        }
        return network;
      }),
    );
  }
});
