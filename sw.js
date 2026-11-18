// Ajudante do app instalado: sempre tenta baixar a versão mais nova do jogo;
// se a internet cair, usa a cópia guardada da última vez.
const CACHE = 'zona-z';
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(function (resposta) {
      const copia = resposta.clone();
      caches.open(CACHE).then(function (c) { return c.put(e.request, copia); }).catch(function () {});
      return resposta;
    }).catch(function () { return caches.match(e.request); })
  );
});
