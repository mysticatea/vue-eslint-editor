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
    "revision": "de6f23656a996e138bf5fef68d6c1d96"
  },
  {
    "url": "api/index.html",
    "revision": "9a8c9b984b8a70b044860235648ba0fe"
  },
  {
    "url": "assets/css/2.styles.13a7d811.css",
    "revision": "2f5ed57145fc3a219e72ffe4e4fbeaeb"
  },
  {
    "url": "assets/css/3.styles.5aed5210.css",
    "revision": "df7c35ec8029dbbde0735a45f875eaf7"
  },
  {
    "url": "assets/css/4.styles.16da8f57.css",
    "revision": "7f9aa00c5c99ae9e207db977eee0b531"
  },
  {
    "url": "assets/css/5.styles.551e2c0c.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "assets/css/styles.7faa1208.css",
    "revision": "9e2540b9df246a4ba5a5ed185cda12f8"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.ed8531a6.js",
    "revision": "95ce6edd10e5254c27effa1105445360"
  },
  {
    "url": "assets/js/2.13a7d811.js",
    "revision": "ecf42f369bb6f53096aa7ab3f308facf"
  },
  {
    "url": "assets/js/3.5aed5210.js",
    "revision": "34dce661ae2a77b6f2fd192eb346ca5e"
  },
  {
    "url": "assets/js/5.551e2c0c.js",
    "revision": "f69f20e921525167887d58607f97578b"
  },
  {
    "url": "assets/js/6.28495fc8.js",
    "revision": "fbc3ea30b471b57db17f14080ad5beb4"
  },
  {
    "url": "assets/js/7.8bd696aa.js",
    "revision": "6ff75cca790241a8d8e8023e4099547f"
  },
  {
    "url": "assets/js/8.58ad4dd7.js",
    "revision": "256b8723f549d83a51cebef8b2b107f0"
  },
  {
    "url": "assets/js/app.7faa1208.js",
    "revision": "d04b0766921814bf992cf3293d2a7847"
  },
  {
    "url": "favicon.png",
    "revision": "10a772e57cde44384fefb9ea46da8a61"
  },
  {
    "url": "guide/index.html",
    "revision": "748de9a38b47490d0c2eed7a90d4984d"
  },
  {
    "url": "index.html",
    "revision": "57c3937f9ac7b4b5052ff0606a13d042"
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
