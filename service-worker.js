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
    "revision": "060a004f97dacf8d1c296fd11e37f7b1"
  },
  {
    "url": "api/index.html",
    "revision": "7a905f2c94f53f55698c04110fa5f344"
  },
  {
    "url": "assets/css/0.styles.4a2a5073.css",
    "revision": "7ea6f75a612ce62e75e523cdd1110373"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/2.5edcf3c1.js",
    "revision": "a8a3f24cebe6f20b6c4cc2b4102bd615"
  },
  {
    "url": "assets/js/3.1f655751.js",
    "revision": "2a0329a02270df9d23df820961e8196b"
  },
  {
    "url": "assets/js/4.623625a7.js",
    "revision": "dfbd563e8181443a5a598d0ed5f1e07f"
  },
  {
    "url": "assets/js/6.6f616285.js",
    "revision": "8b012d8779169c6e181032257c8c8635"
  },
  {
    "url": "assets/js/7.8c14d402.js",
    "revision": "29ac450e4125df1270d22f8a806244f0"
  },
  {
    "url": "assets/js/8.038eddc8.js",
    "revision": "7d48de2833d57a1abb88d8248b65d208"
  },
  {
    "url": "assets/js/9.4cc5ec47.js",
    "revision": "756be7d36ba379ebe28a056b129a5328"
  },
  {
    "url": "assets/js/app.42f18113.js",
    "revision": "cc30e938eb87eeb86f2abc07e6472aa5"
  },
  {
    "url": "favicon.png",
    "revision": "10a772e57cde44384fefb9ea46da8a61"
  },
  {
    "url": "guide/index.html",
    "revision": "930122c4015f281455e0d0e659afdd80"
  },
  {
    "url": "index.html",
    "revision": "9f1f2166952876ac9109f4036b2ab4a5"
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
