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
    "revision": "64f25fb2046fc85b595825c70a56a1ca"
  },
  {
    "url": "api/index.html",
    "revision": "97ed2c0880a36cb7abee947a3238fc1c"
  },
  {
    "url": "assets/css/0.styles.9b4a32d3.css",
    "revision": "dc284effed3f5cd1e5996bbe9aa629d8"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.4df038e6.js",
    "revision": "7a1b0c004b849e81f436551a1fe4a168"
  },
  {
    "url": "assets/js/2.d352e0b9.js",
    "revision": "7121b0fb9cd0f2977dcc960469f9cb89"
  },
  {
    "url": "assets/js/3.0b3934d3.js",
    "revision": "a438ae6f7af3400abae9b2ba84d314f7"
  },
  {
    "url": "assets/js/4.3b0a943f.js",
    "revision": "b536bd4aacd9c1cf3da3f1f32c7ce02f"
  },
  {
    "url": "assets/js/5.cd3d3290.js",
    "revision": "10da02177241528806e2094bcbf990a2"
  },
  {
    "url": "assets/js/6.339cb223.js",
    "revision": "2f68f4bfdaa1a55c9bc496ad9d1f9578"
  },
  {
    "url": "assets/js/app.0a345e68.js",
    "revision": "81acb9e2f4020e5cd00223fc1df00782"
  },
  {
    "url": "favicon.png",
    "revision": "69348706d5adc5f4674e50c0649ea6ad"
  },
  {
    "url": "guide/index.html",
    "revision": "05442e5a68b419f01c32220c056f9206"
  },
  {
    "url": "index.html",
    "revision": "90fd593002ecd1ea819dfdf9f10a6ef3"
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
