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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "37919a7b3748e00149da4992c033b457"
  },
  {
    "url": "api/index.html",
    "revision": "b3a8a6ec367edc1103a2d34196fcb3ba"
  },
  {
    "url": "assets/css/0.styles.4fbc18fc.css",
    "revision": "378880275f4234dd92437491f04d158f"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.0e8a14be.js",
    "revision": "b08371ea01877a6a456695e8bbf82bef"
  },
  {
    "url": "assets/js/2.500519c0.js",
    "revision": "ea01b824c894d68edcf14e3b0cc83838"
  },
  {
    "url": "assets/js/3.3c9f5539.js",
    "revision": "b5ecf458bdb136a18010c891e410dd03"
  },
  {
    "url": "assets/js/4.febd9926.js",
    "revision": "f552c8c1ebe0b22012a3519c3f7995a4"
  },
  {
    "url": "assets/js/5.972bf713.js",
    "revision": "d9fc53fc98b1493bb4abf165eb257942"
  },
  {
    "url": "assets/js/6.7bdff327.js",
    "revision": "0538af74728f35c7bd7d9550c8b3ee96"
  },
  {
    "url": "assets/js/app.fdc2b4e5.js",
    "revision": "425c66b4515c74477d48eb9e2c528a38"
  },
  {
    "url": "favicon.png",
    "revision": "10a772e57cde44384fefb9ea46da8a61"
  },
  {
    "url": "guide/index.html",
    "revision": "645624ad10fab9ee302cef1fdf06aaa0"
  },
  {
    "url": "index.html",
    "revision": "f8ddc9dee4cbe0a7923cc8f19817a93f"
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
