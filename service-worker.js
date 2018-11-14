/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "1c3fb5e8fda7910157adf116bbd8632b"
  },
  {
    "url": "api/index.html",
    "revision": "603c6783339fdbecfa88d19fb0735c77"
  },
  {
    "url": "assets/css/0.styles.9adae5ca.css",
    "revision": "2eb44d7b3212e1a3157922c516b362cb"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/2.fa5328a1.js",
    "revision": "409a9f188e73986d282af4fb2e741eb3"
  },
  {
    "url": "assets/js/3.ccb08742.js",
    "revision": "27ead5507689b196990a3bbda6b1f14b"
  },
  {
    "url": "assets/js/4.fd013919.js",
    "revision": "086d926a47b1601a4da6c2683bd141ee"
  },
  {
    "url": "assets/js/6.05c26872.js",
    "revision": "e64629cc0eb6e0a2e72429e97cf64ebc"
  },
  {
    "url": "assets/js/7.4810b81c.js",
    "revision": "5b132d63baf66c89057b954e29ae65cb"
  },
  {
    "url": "assets/js/8.2e4184ea.js",
    "revision": "8c58b64bf0e640a0fa77fe6ba6284cdc"
  },
  {
    "url": "assets/js/9.8b59248b.js",
    "revision": "795f05d45084105e1e7df9c2f596a51b"
  },
  {
    "url": "assets/js/app.a4d08983.js",
    "revision": "fd36f03de5926f792ad966a969f116d7"
  },
  {
    "url": "favicon.png",
    "revision": "10a772e57cde44384fefb9ea46da8a61"
  },
  {
    "url": "guide/index.html",
    "revision": "238f2191d7dddad8aa1307e4715451e9"
  },
  {
    "url": "index.html",
    "revision": "22760416a155d38dde4476fcce4e3f9c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
