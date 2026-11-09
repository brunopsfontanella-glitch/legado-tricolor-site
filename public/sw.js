// Service worker do app Legado Tricolor (protótipo).
// Estratégia: telas do app com rede primeiro e cópia em cache como reserva;
// arquivos estáticos (JS, CSS, ícones, imagens) com cache e atualização em segundo plano.
const CACHE = "legado-app-v2";

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
          if (response.ok && !response.redirected) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match(request).then((hit) => hit || caches.match(`${BASE}/app/`))),
    );
    return;
  }

  if (STATIC_RE.test(url.pathname)) {
    event.respondWith(
      caches.open(CACHE).then((cache) =>
        cache.match(request).then((hit) => {
          const network = fetch(request).then((response) => {
            cache.put(request, response.clone());
            return response;
          });
          return hit || network;
        }),
      ),
    );
  }
});
