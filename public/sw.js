if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,c,a)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const t={uri:location.origin+s.slice(1)};return Promise.all(c.map((s=>{switch(s){case"exports":return n;case"module":return t;default:return e(s)}}))).then((e=>{const s=a(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/0bdd3ff4.c877fa5b2ef1dff2f093.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/202-4064ea6c1e1c17dd3138.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/219.335e4b60b81f490e13d8.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/249.ea8b9a71930eb2c4c8f3.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/32.db90516b411fde5f3365.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/364.10dc12b707ae16681b3e.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/369.d27b808d4a884ff8df77.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/392.acbe83940d075fb429bc.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/405-6736278920f62299f9d4.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/4322cd96.805fc5eab02f6764e8ad.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/458.5a12047fedb9ed257144.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/49.0ce346613682f0b791ef.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/499.fda5ee960105e7eacd05.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/503.9c13dbd00f4fbc369822.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/563.25a9dfbbe9f82483d1f2.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/582.c1132d63cc134e42d612.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/63-4e928820025a9d443652.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/678-09e5e4911a9dbd4a28b8.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/684-5135332998948f7bd255.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/7112840a.14f0b353d7e79917b5f7.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/759.6683792a9b845604b985.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/779.14d37c5f279b3f77d91e.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/794-3125ce4ab7764b816a54.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/834.18a89373b5ef39cba473.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/836-5352199d99291f35f7b9.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/880.7bc6cbcb8a53b95343e1.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/891-ee6dc204c59b0fd611bd.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/918.066f566ac3b0a3aba787.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/98f61148.ebcc4844c72d45c1fbcd.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/commons-6aa09b5edda7f3b1d772.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/dff27125.9cb36a7a5576b9e6cad9.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/f10e284a.4c93d419c6d060f5e687.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/framework-09efafa0164cc8740805.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/main-a0d26962905f66042025.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/pages/_app-25eea2fd157dc40cd6a1.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/pages/_error-9197505bf5c19ed2c4b5.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/pages/calendario-a5695e030d71269cba38.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/pages/cuenta-67c9cf164f2c9a863fc2.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/pages/f/%5BformID%5D/respuestas-85f3d66c1474c8156df7.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/pages/formularios-602611d94d481e535393.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/pages/p/%5BproductID%5D/editar-fa2f1659fe18e4c50023.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/pages/productos-c68a0db519389d1ce40b.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/pages/t/%5BformID%5D/editar-5e59cf96eeff71eae7c5.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/pages/tracking-7b8861f2dd3e54061a3f.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/polyfills-e7a279300235e161e32a.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/chunks/webpack-a357decd09eb15abbc46.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/css/29b5ffd665f2a7a6acb5.css",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/css/3b0014f9c0d643860477.css",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/css/411861b17ad18659b6a0.css",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/css/43759d1d9bd4eca9afca.css",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/css/464ee880196240b9eff7.css",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/css/5b00dcc5230dd73705e2.css",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/css/af45ba37be46914b65f5.css",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/css/c2176356944304f06b39.css",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/css/c93067e6c62c99a15617.css",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/css/e6230cdab50311110c25.css",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/css/efd2640b440d1dc8a218.css",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/css/f038d14128ed404dbf34.css",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/css/f7daa5584b2b29b3f41d.css",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/media/orkney-bold.c268a4d85e4bff25b1d3ccbdbed08eb8.otf",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/media/orkney-light.d39847adbd2ffbfec8ffb576ab864a3f.otf",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/media/orkney-medium.57859b5b795bc47b08080a912944025d.otf",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/media/orkney-regular.5b030529f4435f9d7dde4622c08da816.otf",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/npLoLWovYgF4A0ac5AxXF/_buildManifest.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/_next/static/npLoLWovYgF4A0ac5AxXF/_ssgManifest.js",revision:"npLoLWovYgF4A0ac5AxXF"},{url:"/assets/brand/icon.png",revision:"fcc781311b190fcb58fca8cd9faa62ab"},{url:"/assets/brand/logo.png",revision:"e27357ee956dd9f6165545ae8d0c5485"},{url:"/assets/icons/google.svg",revision:"f6ce5696e634677f94343db90b9f66dd"},{url:"/assets/icons/whatsapp.svg",revision:"f4ed67df912a7df12a9648072049529f"},{url:"/favicon.ico",revision:"5929fa74d708e3b5277dcd9d083cb55d"},{url:"/images/badge.png",revision:"9add1ba93adb233bcab6f9cb060ea429"},{url:"/images/icon.png",revision:"ca4adb4c76f7183d469b7cdbf7e2be0e"},{url:"/images/maskable_icon.png",revision:"0e8acac98ed6b1e8c45d69684b9e1f17"},{url:"/manifest.json",revision:"14c105708c2bc14ab96036a0f3ad90f2"},{url:"/privacy.pdf",revision:"2788c1624a55425b89899f6a4ee40a0c"},{url:"/robots.txt",revision:"3ad0652bd17ff826a31fa29366021cfd"},{url:"/terms.pdf",revision:"77a7a846d3ad825461980e8deea27722"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600,purgeOnQuotaError:!0})]}),"GET")}));
