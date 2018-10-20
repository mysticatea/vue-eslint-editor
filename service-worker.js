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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.2/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "3eb06eccc74668333b490822252c5b73"
  },
  {
    "url": "api/index.html",
    "revision": "5f19742daf9ea7510deab26f237fd4f5"
  },
  {
    "url": "assets/css/1.styles.059a5971.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "assets/css/2.styles.56aeef9c.css",
    "revision": "df7c35ec8029dbbde0735a45f875eaf7"
  },
  {
    "url": "assets/css/3.styles.2dd3b0a0.css",
    "revision": "2f5ed57145fc3a219e72ffe4e4fbeaeb"
  },
  {
    "url": "assets/css/7.styles.6dd21a91.css",
    "revision": "30e51ae5824b2dec4ca4ba9e831db347"
  },
  {
    "url": "assets/css/styles.4ebee262.css",
    "revision": "9e2540b9df246a4ba5a5ed185cda12f8"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.059a5971.js",
    "revision": "e7b02cf5d4ebe4b12ea5aa946c76619a"
  },
  {
    "url": "assets/js/2.56aeef9c.js",
    "revision": "d41947ababecff2a7a16d985759926ac"
  },
  {
    "url": "assets/js/3.2dd3b0a0.js",
    "revision": "ceea4e1f644fd9b2e2adab63bc8d1432"
  },
  {
    "url": "assets/js/4.64b2dcea.js",
    "revision": "c870f6bb4a8c40994e0a86ca8837495c"
  },
  {
    "url": "assets/js/5.c575a3f4.js",
    "revision": "6a20d98741628c621e100f6fcdf86bb4"
  },
  {
    "url": "assets/js/6.1dc5dcb2.js",
    "revision": "a1a2b802e9ac7fcb1a96183ea68577f1"
  },
  {
    "url": "assets/js/8.39d0f677.js",
    "revision": "f67ba033e1aec4e5269735156a35ae3e"
  },
  {
    "url": "assets/js/app.4ebee262.js",
    "revision": "8ce10cca9a4c0cdef48a79699125a3d9"
  },
  {
    "url": "favicon.png",
    "revision": "10a772e57cde44384fefb9ea46da8a61"
  },
  {
    "url": "guide/index.html",
    "revision": "3ef19fbb2e1938c6b3618ea4f2e2b949"
  },
  {
    "url": "index.html",
    "revision": "832b939a14817fd54f46ca22d214bff7"
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
