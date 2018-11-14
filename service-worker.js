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
    "revision": "0ae3a48e29400cb59176787a9e35bca4"
  },
  {
    "url": "api/index.html",
    "revision": "f45f8516aa030da27a552cd78ff7f0cf"
  },
  {
    "url": "assets/css/0.styles.764c5747.css",
    "revision": "d45e73b1b74e737e91e24d2b225b9a7a"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/2.e2c6f71a.js",
    "revision": "f0f199756f1fd873d8280ba3daefef73"
  },
  {
    "url": "assets/js/3.661a16c1.js",
    "revision": "5741dd79a1d8a3f64e038b69823a6247"
  },
  {
    "url": "assets/js/5.95ea4052.js",
    "revision": "d9d8992d58c3ff997af8199af44ff870"
  },
  {
    "url": "assets/js/6.1341c260.js",
    "revision": "76bde027c51634e317e14e674560b14a"
  },
  {
    "url": "assets/js/7.d525e257.js",
    "revision": "0d72da48d34179b1bb070ac7891157ab"
  },
  {
    "url": "assets/js/8.279ac230.js",
    "revision": "54819a3114ca65b4830c9d3b6ea41825"
  },
  {
    "url": "assets/js/9.d561cf2b.js",
    "revision": "480655c9f3e3688fe1bb852f009e947b"
  },
  {
    "url": "assets/js/app.d18200f7.js",
    "revision": "43442fc34066dc6c7d21d32f7d2ecbf8"
  },
  {
    "url": "favicon.png",
    "revision": "10a772e57cde44384fefb9ea46da8a61"
  },
  {
    "url": "guide/index.html",
    "revision": "25d5310fb24529dc913a72ca15a9a185"
  },
  {
    "url": "index.html",
    "revision": "d2a1c11e013915e796d674e8dcd4655f"
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
