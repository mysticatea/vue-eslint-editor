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
    "revision": "4888fe603f2bb2ba95fd9f1e2ffe5188"
  },
  {
    "url": "api/index.html",
    "revision": "0cce6341a9c1417e13e23de5ae3ab70a"
  },
  {
    "url": "assets/css/0.styles.64084e9b.css",
    "revision": "b2f6830b8de3657c84e6626acfab8370"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/2.2579edd8.js",
    "revision": "45ba3cd942ac796789b4ff73c8dd8bf1"
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
    "url": "assets/js/app.d8e67ef9.js",
    "revision": "0510f586a18e571374b1cb0cf6784d90"
  },
  {
    "url": "favicon.png",
    "revision": "10a772e57cde44384fefb9ea46da8a61"
  },
  {
    "url": "guide/index.html",
    "revision": "8106e456e48389803029cfac03af7c99"
  },
  {
    "url": "index.html",
    "revision": "7fa0972100344c9dfb1c933dc172c1b0"
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
