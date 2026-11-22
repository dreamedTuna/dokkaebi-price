// 오프라인 실행·업데이트 담당 (버전은 config.js에서 가져와요)
importScripts("./config.js");
const CACHE = "dokkaebi-app-" + self.APP_CONFIG.version;
const LIB = "dokkaebi-lib-1";
const SHELL = ["./", "./index.html", "./config.js", "./app.js", "./manifest.webmanifest", "./vendor/fonts/fonts.css",
  "./icons/icon-192.png", "./icons/slot-weapon.png", "./icons/slot-armor.png", "./icons/slot-acc.png", "./img/example-capture.jpg", "./icons/icon-512.png", "./icons/icon-maskable-512.png", "./icons/apple-touch-icon.png"];

// 설치할 때 브라우저에 남은 예전 파일이 아니라 서버의 새 파일을 받아 둠
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: "reload" }))))); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("dokkaebi-app-") && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("message", e => { if (e.data === "skip") self.skipWaiting(); });

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;            // 외부 주소는 사용하지 않음
  if (url.pathname.endsWith("/version.json")) return;     // 업데이트 확인은 항상 최신으로
  if (url.pathname.includes("/vendor/")) {                // 글꼴·글자 인식 도구: 한 번 받으면 저장해 두고 사용
    e.respondWith(caches.open(LIB).then(c => c.match(req).then(hit => hit || fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; }))));
    return;
  }
  // 앱 파일: 인터넷이 되면 최신, 안 되면 저장해 둔 파일
  e.respondWith(fetch(req.url, { cache: "no-cache", credentials: "same-origin" }).then(res => { if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); } return res; })
    .catch(() => caches.match(req).then(r => r || caches.match("./index.html"))));
});
