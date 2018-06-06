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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "20ef6f265f5d09cd759e6f50036a8a44"
  },
  {
    "url": "api/index.html",
    "revision": "a389e36a4af0ccf6b3fd50ff07870c6b"
  },
  {
    "url": "assets/css/0.styles.c341376a.css",
    "revision": "5f03a414d4158cf36afa42eed410be73"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.0fd0e97e.js",
    "revision": "07a08adb562afead54f346132596526d"
  },
  {
    "url": "assets/js/2.8d5855fb.js",
    "revision": "e9cbb40f1ae9fa831bfdcbf01af95a1f"
  },
  {
    "url": "assets/js/3.6c104da9.js",
    "revision": "1539bc0a0db312cbc9a0b08153af9107"
  },
  {
    "url": "assets/js/4.1a125dbc.js",
    "revision": "1cd6e335b135795baf5066a64c0234c8"
  },
  {
    "url": "assets/js/5.d1bc8d94.js",
    "revision": "6975791362d93b77f1ec9d0053cfd4b0"
  },
  {
    "url": "assets/js/6.1b213544.js",
    "revision": "30894a9866882c4cdf217a1c5ad0e291"
  },
  {
    "url": "assets/js/app.1755f1b5.js",
    "revision": "29dedd4d5aeaa6de7dde210826dd8c97"
  },
  {
    "url": "favicon.png",
    "revision": "10a772e57cde44384fefb9ea46da8a61"
  },
  {
    "url": "guide/index.html",
    "revision": "35dd1396ef1bd76e9906376a7cb99e72"
  },
  {
    "url": "index.html",
    "revision": "9cb9fb0555640ab02325090fd11b4daa"
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
