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
    "revision": "6b3d8616376dae2213331c328dccbe3d"
  },
  {
    "url": "assets/css/0.styles.25e9b8f4.css",
    "revision": "4b3c030bc1547dfc39560b36d695c506"
  },
  {
    "url": "assets/css/1.styles.ea463696.css",
    "revision": "bf68fc1751de9f60be353d0ee09ffa52"
  },
  {
    "url": "assets/css/10.styles.03f9b373.css",
    "revision": "fb3824a184b40afd6f01edb02d6c2060"
  },
  {
    "url": "assets/css/11.styles.2d65a6bf.css",
    "revision": "e071d2a9b3f21c3eab9dd711e1bbdc90"
  },
  {
    "url": "assets/css/12.styles.919daba4.css",
    "revision": "e7729eac8b94e22f34de706aeeab56aa"
  },
  {
    "url": "assets/css/13.styles.22342362.css",
    "revision": "3da36b0a4f5d09050668f23db5ef36d1"
  },
  {
    "url": "assets/css/14.styles.07d512a9.css",
    "revision": "ace9f25855b5eeb563c4787c9415361b"
  },
  {
    "url": "assets/css/15.styles.dc4af21e.css",
    "revision": "bdc94dcc15c8231027d78dada1090c52"
  },
  {
    "url": "assets/css/16.styles.85a8c2b5.css",
    "revision": "6556997fd275c8524552d142d0478198"
  },
  {
    "url": "assets/css/17.styles.d918ac85.css",
    "revision": "b909c0c0806fdd7d3126d4222c69c4a4"
  },
  {
    "url": "assets/css/18.styles.b15a5ea8.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "assets/css/19.styles.b1ad4bff.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "assets/css/2.styles.dddd34e0.css",
    "revision": "1260392a0719ab372d4d02e127931594"
  },
  {
    "url": "assets/css/20.styles.9befcf19.css",
    "revision": "df7c35ec8029dbbde0735a45f875eaf7"
  },
  {
    "url": "assets/css/21.styles.e248011b.css",
    "revision": "a7167d5b34410103ac97bcc770babe15"
  },
  {
    "url": "assets/css/22.styles.fb355c4e.css",
    "revision": "e8adcd0c09d283517347e48088ec8311"
  },
  {
    "url": "assets/css/23.styles.137fadd8.css",
    "revision": "139c2f9b91ead1da668eb12137c8a833"
  },
  {
    "url": "assets/css/25.styles.1c83fd08.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "assets/css/4.styles.5925f4d1.css",
    "revision": "1260392a0719ab372d4d02e127931594"
  },
  {
    "url": "assets/css/5.styles.e1e67948.css",
    "revision": "b909c0c0806fdd7d3126d4222c69c4a4"
  },
  {
    "url": "assets/css/6.styles.46a09ec9.css",
    "revision": "b909c0c0806fdd7d3126d4222c69c4a4"
  },
  {
    "url": "assets/css/7.styles.492a1be3.css",
    "revision": "713ff99668d4a24f6fa7bf7ab7cad631"
  },
  {
    "url": "assets/css/8.styles.3aaf37ba.css",
    "revision": "932aca2a883265bb0310badbd2350c6f"
  },
  {
    "url": "assets/css/9.styles.4d000e2b.css",
    "revision": "bc8d8e8979e1f576ddfb544c92dde45e"
  },
  {
    "url": "assets/css/styles.1a444ffc.css",
    "revision": "cdbcfbd9a0654e6beec824fcc18d54a3"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/0.25e9b8f4.js",
    "revision": "2569d5e54bab42e4da2acbcc77106cd1"
  },
  {
    "url": "assets/js/1.ea463696.js",
    "revision": "043628d24a0e7e87fcd0a20bc1bd0ecd"
  },
  {
    "url": "assets/js/10.03f9b373.js",
    "revision": "a6675ca9ceed6b5b238ae5ed2e00f96a"
  },
  {
    "url": "assets/js/100.6cabfe14.js",
    "revision": "10691c1313155f9c02f4d0721ce926e5"
  },
  {
    "url": "assets/js/101.2cc0cea1.js",
    "revision": "d0fabab053cf2757226ea9128af09def"
  },
  {
    "url": "assets/js/102.2f57b49c.js",
    "revision": "8c716024a89c8dfa5add0fc7a9aa963b"
  },
  {
    "url": "assets/js/103.7436eac1.js",
    "revision": "02ba6d253ce4a02e9b9090e59d2d42cc"
  },
  {
    "url": "assets/js/104.58260e9f.js",
    "revision": "c4a89ab2e2d0f24842d431a3f132ef8d"
  },
  {
    "url": "assets/js/105.054f9d50.js",
    "revision": "0efc01d17b09c72927d7ff54c83be1d8"
  },
  {
    "url": "assets/js/106.718da124.js",
    "revision": "39a14e1dd737337af9e90e1f9e9e434b"
  },
  {
    "url": "assets/js/107.108f80e4.js",
    "revision": "f01a748f06d2115b51392a1b994011a7"
  },
  {
    "url": "assets/js/108.599a7ab3.js",
    "revision": "6b9f96df6d81aa40fe513c04c6c300fa"
  },
  {
    "url": "assets/js/109.029503a2.js",
    "revision": "4c74e955140060ec0074fe11d7ea06ff"
  },
  {
    "url": "assets/js/11.2d65a6bf.js",
    "revision": "38564183d8dc7a21b99133f77e02ac03"
  },
  {
    "url": "assets/js/110.9042b0ca.js",
    "revision": "ecbb205b9e9bc24f4df3c8cf8d453842"
  },
  {
    "url": "assets/js/111.ca998b60.js",
    "revision": "0723a080c0465c754743703f288842e3"
  },
  {
    "url": "assets/js/112.3951050c.js",
    "revision": "9979f8211e81ed52e216f0ad66eee00d"
  },
  {
    "url": "assets/js/113.e4ad819c.js",
    "revision": "d85280ecccb3e7c597f8f8d295a319fa"
  },
  {
    "url": "assets/js/114.aa61352b.js",
    "revision": "3f844b04855aabb7a4d4023c2166ae96"
  },
  {
    "url": "assets/js/115.92f5628b.js",
    "revision": "9fa63f97cf75cab8f8f06fbb1bf91b3f"
  },
  {
    "url": "assets/js/116.54b37d42.js",
    "revision": "9c3527229ab634d797b679b032bc631a"
  },
  {
    "url": "assets/js/117.a7ace10b.js",
    "revision": "bbc3ff266949dc2f64f9168bebd99c22"
  },
  {
    "url": "assets/js/12.919daba4.js",
    "revision": "434b7382650bc95ff0097f430d992dcc"
  },
  {
    "url": "assets/js/13.22342362.js",
    "revision": "653245fe1dc8ffe931b8252a1d2459ec"
  },
  {
    "url": "assets/js/14.07d512a9.js",
    "revision": "e9f3c2bda2e20f3d962d1ae9755827b9"
  },
  {
    "url": "assets/js/15.dc4af21e.js",
    "revision": "425a2be1cda7ed2890b3765edc0943d1"
  },
  {
    "url": "assets/js/16.85a8c2b5.js",
    "revision": "e6c56dce044b5f4d575a325c75410886"
  },
  {
    "url": "assets/js/17.d918ac85.js",
    "revision": "4796ebfd7b6cae35c0a9f734ee842b87"
  },
  {
    "url": "assets/js/18.b15a5ea8.js",
    "revision": "a0fa68a60e1e11c1cc0caa8c3936b487"
  },
  {
    "url": "assets/js/19.b1ad4bff.js",
    "revision": "ed01cf12661223598ace0ef506ef8ae4"
  },
  {
    "url": "assets/js/2.dddd34e0.js",
    "revision": "a509cfc793ff221de282424e95f337df"
  },
  {
    "url": "assets/js/20.9befcf19.js",
    "revision": "9553c54e7789f4fb64f1bda597f052af"
  },
  {
    "url": "assets/js/21.e248011b.js",
    "revision": "706caa4c72dafccb4d6807b7cf7b382d"
  },
  {
    "url": "assets/js/22.fb355c4e.js",
    "revision": "952098a851e6df730f1acb60d9b3d498"
  },
  {
    "url": "assets/js/23.137fadd8.js",
    "revision": "4e5d7db35eefb132a5ffaed3a74a184a"
  },
  {
    "url": "assets/js/24.1d7fbd62.js",
    "revision": "0925ea152a11578187e41596488ae733"
  },
  {
    "url": "assets/js/25.1c83fd08.js",
    "revision": "3932ef3714966676baeca562faf9ce48"
  },
  {
    "url": "assets/js/26.713572bc.js",
    "revision": "6fdec2a8a56a10b78f45ab671a7d4777"
  },
  {
    "url": "assets/js/27.d2520b7b.js",
    "revision": "9aa79eb5854de569b2527bd48737d8bd"
  },
  {
    "url": "assets/js/28.d9e4ad7a.js",
    "revision": "50c2e1864a7ed76926dcdfdfcce80116"
  },
  {
    "url": "assets/js/29.fc1af160.js",
    "revision": "e8eb03e28039b2e330db161828ec3faa"
  },
  {
    "url": "assets/js/30.1db46309.js",
    "revision": "c3e885de802424e04c204a7201bd13d9"
  },
  {
    "url": "assets/js/31.a6469450.js",
    "revision": "e61dd1ffe7b3c10fcb6b8c68be828379"
  },
  {
    "url": "assets/js/32.15620132.js",
    "revision": "3c74866bf1fbcd7f0176debce6eff176"
  },
  {
    "url": "assets/js/33.536c1884.js",
    "revision": "590bfd19371e81ed17103afd38e68c47"
  },
  {
    "url": "assets/js/34.6205531d.js",
    "revision": "6525ccff91847ab996cb6fd475fb0664"
  },
  {
    "url": "assets/js/35.8f0fa45f.js",
    "revision": "d955af86840241f3e143d308d5568510"
  },
  {
    "url": "assets/js/36.b75732d0.js",
    "revision": "72ab6ee5646b1aa0fbd7b68c72b367d6"
  },
  {
    "url": "assets/js/37.ed4aefaf.js",
    "revision": "6ae8d65cab65276f6841ed43ad201186"
  },
  {
    "url": "assets/js/38.29b21c04.js",
    "revision": "cf728658b836a9d97e9f6bceef3e4f53"
  },
  {
    "url": "assets/js/39.e0cb343d.js",
    "revision": "670dd17c501fcb41f62dbff2a526c4ab"
  },
  {
    "url": "assets/js/4.5925f4d1.js",
    "revision": "cd9270d3da7858a2a859bb867dbea54c"
  },
  {
    "url": "assets/js/40.e9d96e04.js",
    "revision": "193746dbd4bfb8f4cdc1114d729efef7"
  },
  {
    "url": "assets/js/41.e1a3a46c.js",
    "revision": "258516ac7c54f6d6bb60627a2848c44c"
  },
  {
    "url": "assets/js/42.b3133352.js",
    "revision": "f64ce0b164faa56356e1640b6e0c96c7"
  },
  {
    "url": "assets/js/43.494fab7a.js",
    "revision": "7e269b35e6563c95cecd3b86be0f3822"
  },
  {
    "url": "assets/js/44.3a32ee42.js",
    "revision": "fc74a5e8511c00db2e45dae4cc6d59cb"
  },
  {
    "url": "assets/js/45.4de3598d.js",
    "revision": "c61f92020c4f71b9de8923b5ff38b8ad"
  },
  {
    "url": "assets/js/46.c91ebb66.js",
    "revision": "873e55f66e4aad06d635e843c3913aca"
  },
  {
    "url": "assets/js/47.453b0edd.js",
    "revision": "3ac505eb604e25c049d5c65e1f6d29c7"
  },
  {
    "url": "assets/js/48.db456a46.js",
    "revision": "449fee6f3f90e1d491e11c3ab7058b7b"
  },
  {
    "url": "assets/js/49.45f189de.js",
    "revision": "9d9bc430f2353d8612a3ed35a6e3d538"
  },
  {
    "url": "assets/js/5.e1e67948.js",
    "revision": "f345e33dcecc67904613bbd67c48bdb7"
  },
  {
    "url": "assets/js/50.ec88e8b1.js",
    "revision": "6ee5135e4856a35f0211ed7b62a08234"
  },
  {
    "url": "assets/js/51.7437a3b2.js",
    "revision": "b4cbf17d924c950eef02fd4c3f7c8efa"
  },
  {
    "url": "assets/js/52.d45351e7.js",
    "revision": "f5fb600fc6b79f04842a68926162c89d"
  },
  {
    "url": "assets/js/53.3825777d.js",
    "revision": "5dba76b62e7e29de62bb79f4d5803898"
  },
  {
    "url": "assets/js/54.4c8997bd.js",
    "revision": "904bd1b6eeeee4be81fe9120c54c3ea8"
  },
  {
    "url": "assets/js/55.0486cc05.js",
    "revision": "a2610c2e46a9c9444a576fe2ad482982"
  },
  {
    "url": "assets/js/56.83aa7893.js",
    "revision": "e1d6d698b36fc6152bc8555700b858ac"
  },
  {
    "url": "assets/js/57.0f417515.js",
    "revision": "ca86bebf1e11d7005efc03b47c8a0790"
  },
  {
    "url": "assets/js/58.2af19f8f.js",
    "revision": "34543c81084167a8ea3ab4eda198f1f1"
  },
  {
    "url": "assets/js/59.ca1cd302.js",
    "revision": "cfb2ab82a8f192dd1c106a0efeaf7372"
  },
  {
    "url": "assets/js/6.46a09ec9.js",
    "revision": "e17112627820cbe88a322d9b37a556f6"
  },
  {
    "url": "assets/js/60.fca20af2.js",
    "revision": "54493af6ade4419ab4d8211fdfea1b51"
  },
  {
    "url": "assets/js/61.68466e55.js",
    "revision": "62599b3605481fefc7845a762b343c30"
  },
  {
    "url": "assets/js/62.4abf94e4.js",
    "revision": "2f3019515780d53c60edeac74c942ccf"
  },
  {
    "url": "assets/js/63.12bfb247.js",
    "revision": "1fe3fc97ef85971bdcd634c7cea246b3"
  },
  {
    "url": "assets/js/64.d784ea06.js",
    "revision": "33b5bd34cde806915eed2f8d2432df77"
  },
  {
    "url": "assets/js/65.aabe24bf.js",
    "revision": "1f360a474c245a893f1f16db16fc3a37"
  },
  {
    "url": "assets/js/66.35493bf6.js",
    "revision": "672de927cef9921a9dcb6f4078d746f1"
  },
  {
    "url": "assets/js/67.ca2657c5.js",
    "revision": "f7289df3d44a1cc8b423b2ef24a0b391"
  },
  {
    "url": "assets/js/68.e87e96bd.js",
    "revision": "5bc860e9dcbce3dffb2da3ab282c5411"
  },
  {
    "url": "assets/js/69.764a85e7.js",
    "revision": "0dd52e6b5b9c5eb499058f2b542997f1"
  },
  {
    "url": "assets/js/7.492a1be3.js",
    "revision": "21c3d164a1d763bc7aab4447e22cf9cb"
  },
  {
    "url": "assets/js/70.f7bc502a.js",
    "revision": "4b615a8b8f4dc6460d778eec86302b5a"
  },
  {
    "url": "assets/js/71.c209a2ed.js",
    "revision": "06aac50aa9980dd6df7cf50a210cf530"
  },
  {
    "url": "assets/js/72.fc3dfb8d.js",
    "revision": "6c850a1312509d4713ee445d8648bec2"
  },
  {
    "url": "assets/js/73.240e5a18.js",
    "revision": "239abf695fac69f1cf807d0b20de17b0"
  },
  {
    "url": "assets/js/74.90ac398c.js",
    "revision": "eeb2dd1b115f4677aa59867ea7a3a30c"
  },
  {
    "url": "assets/js/75.cb426f5e.js",
    "revision": "76f54e7c9a9c5efcbf898b4ed888b3df"
  },
  {
    "url": "assets/js/76.e3c6e694.js",
    "revision": "be2f26b493030cc669196f3b4e2107a2"
  },
  {
    "url": "assets/js/77.c17056ff.js",
    "revision": "87a78ead3e7b8e8404e66fbc95c0ab94"
  },
  {
    "url": "assets/js/78.edc436e2.js",
    "revision": "4e0c3511844e4bfe247fc80289c0233e"
  },
  {
    "url": "assets/js/79.dd9c23d8.js",
    "revision": "e4344bc9e5061c90b5be9f41197ae4de"
  },
  {
    "url": "assets/js/8.3aaf37ba.js",
    "revision": "1117698e713f4c60f80a05c1ebb0ef94"
  },
  {
    "url": "assets/js/80.61182ad4.js",
    "revision": "668942fbd03c72e40824f6a79d7d863a"
  },
  {
    "url": "assets/js/81.0dc1b33f.js",
    "revision": "46be1294006d7c87641147fd6d1d8bc5"
  },
  {
    "url": "assets/js/82.1c7e3329.js",
    "revision": "82ac371516ec166cc106e20e84bad70f"
  },
  {
    "url": "assets/js/83.7cec3dc5.js",
    "revision": "590d8f272e25e3463df79a27699eee8d"
  },
  {
    "url": "assets/js/84.d3d47b85.js",
    "revision": "34baab2481d26ab8e70686f691ee7ead"
  },
  {
    "url": "assets/js/85.db87749a.js",
    "revision": "4c61a6cfbddc09dd8bbf3f53c82e05ca"
  },
  {
    "url": "assets/js/86.55b3a5ad.js",
    "revision": "b6c4a47ff35debc615f9c3d8e21f14c2"
  },
  {
    "url": "assets/js/87.f318de55.js",
    "revision": "3ca5293b5f3a956c3e7e8e2a0a61a77f"
  },
  {
    "url": "assets/js/88.94bc92f5.js",
    "revision": "09d902be54f9b8f1b30a1ee4d5740dd1"
  },
  {
    "url": "assets/js/89.4d29383f.js",
    "revision": "8115843dbe2711637142ec7ba632d36b"
  },
  {
    "url": "assets/js/9.4d000e2b.js",
    "revision": "6f54ac638b2c3639d16edf85355e7f62"
  },
  {
    "url": "assets/js/90.079dce3f.js",
    "revision": "066cedfac038b3e33b9e9993c9db135f"
  },
  {
    "url": "assets/js/91.25b0265a.js",
    "revision": "0d0266abf2563b4ec41423e526baaff7"
  },
  {
    "url": "assets/js/92.ea46004f.js",
    "revision": "df668f2965df0dc118d38d54b473b811"
  },
  {
    "url": "assets/js/93.0720d680.js",
    "revision": "9ba39539458eb816dbd764c33df811a1"
  },
  {
    "url": "assets/js/94.2e310c14.js",
    "revision": "546bd26ee531f5c3f29757862f78a3cc"
  },
  {
    "url": "assets/js/95.eff2bc89.js",
    "revision": "6157bc9c8ba3b358ac04dff3417b40cc"
  },
  {
    "url": "assets/js/96.33f70266.js",
    "revision": "9979ebc01fdaf9fc96f57acf3d15b281"
  },
  {
    "url": "assets/js/97.cd30d927.js",
    "revision": "537d77a5919a51970c22358c9fdac025"
  },
  {
    "url": "assets/js/98.9e6816fe.js",
    "revision": "1dcc2075ac7088bcb2d75183d1e87d7f"
  },
  {
    "url": "assets/js/99.02fc82ad.js",
    "revision": "8c2ab204298f1bff771275c097972d9f"
  },
  {
    "url": "assets/js/app.1a444ffc.js",
    "revision": "a7728c8bc81d451f03a5caa7b1c5df8d"
  },
  {
    "url": "chain_json/basics/2chain_b.json",
    "revision": "f6fe86a02ee1a290c60f9e45d851d17a"
  },
  {
    "url": "chain_json/basics/3chain_lshape_a.json",
    "revision": "51bbaf754fc5549bbf5afb803660c3a4"
  },
  {
    "url": "chain_json/basics/3chain_stairs_a.json",
    "revision": "1bc5b44b9a044d47c31bdc6c1c345db5"
  },
  {
    "url": "chain_json/basics/4chain_yayoi_a.json",
    "revision": "79e5b2721456314192218ea8e42a4e26"
  },
  {
    "url": "chain_json/basics/6chain_a.json",
    "revision": "f6709d119fdc4f938a46f4df333538ff"
  },
  {
    "url": "chain_json/default.json",
    "revision": "8fce35d6a7174daf65f88858fe35b328"
  },
  {
    "url": "chain_json/fukigen/12chain_gtr_nov2.json",
    "revision": "70f905632c23bef5bd034f6a16d5c79f"
  },
  {
    "url": "chain_json/fukigen/9chain_fukigen_GTR_nov2.json",
    "revision": "af208fa46e47256a6d1f2700f82783ce"
  },
  {
    "url": "chain_json/gtr/10chain_GTR_nov2.json",
    "revision": "038aafe0beec5f9a025330971aba92c8"
  },
  {
    "url": "chain_json/gtr/11chain_gtr_b_nov2.json",
    "revision": "c0ba23f98f9e7d02aa7d4cbacd373bb4"
  },
  {
    "url": "chain_json/gtr/11chain_gtr_nov2.json",
    "revision": "b43d9b64bff2deb22e0301f47b7db7b8"
  },
  {
    "url": "chain_json/gtr/12chain_gtr.json",
    "revision": "70f905632c23bef5bd034f6a16d5c79f"
  },
  {
    "url": "chain_json/gtr/13chain_gtr_nov2.json",
    "revision": "72ec4a0f73bea02979f0eee883c4b234"
  },
  {
    "url": "chain_json/gtr/14chain_a.json",
    "revision": "6d6df0bb17499d252e5b291820a1ea0f"
  },
  {
    "url": "chain_json/gtr/14chain_gtr_cushion_nov2.json",
    "revision": "8efd9c0855a79f804017e6e254013e82"
  },
  {
    "url": "chain_json/gtr/14chain_gtr_nov2.json",
    "revision": "17ecbc933ef1fc76847a7a4ffa393594"
  },
  {
    "url": "chain_json/gtr/7chain_GTR_nov2.json",
    "revision": "c1ad04493aa85a914aa7d8e86c5d51e6"
  },
  {
    "url": "chain_json/lshape/10chain_lshape_nov2.json",
    "revision": "bb8108d76bf77e8fd27ffd21a5893aee"
  },
  {
    "url": "chain_json/lshape/11chain_lshape_nov2.json",
    "revision": "657ff74d37275bf5bb12cbc25087ff26"
  },
  {
    "url": "chain_json/lshape/12chain_lshape_nov2.json",
    "revision": "70f905632c23bef5bd034f6a16d5c79f"
  },
  {
    "url": "chain_json/lshape/2chain_a.json",
    "revision": "b654f13209a6f9378a70420a950a832a"
  },
  {
    "url": "chain_json/lshape/4chain_a.json",
    "revision": "06c883f8c35a12e272994b3faa673059"
  },
  {
    "url": "chain_json/lshape/6chain_a.json",
    "revision": "39266bff1fbc3a17074653d95fa395b8"
  },
  {
    "url": "chain_json/lshape/9chain_lshape_nov2.json",
    "revision": "6562658f50a22e0c593abd8355eb79c7"
  },
  {
    "url": "chain_json/newgtr/11chain_newgtr.json",
    "revision": "b43d9b64bff2deb22e0301f47b7db7b8"
  },
  {
    "url": "chain_json/newgtr/14chain_newGTR_nov2.json",
    "revision": "c068b5e305167bb3c17198028fbd7be2"
  },
  {
    "url": "chain_json/playermade/ddrdan_1.json",
    "revision": "9ddf3a9a8345b3779ba296596078c51f"
  },
  {
    "url": "chain_json/playermade/histy_1.json",
    "revision": "f634d77c0eb01ffdb23d2dbe05fcf2ec"
  },
  {
    "url": "chain_json/playermade/histy_nov2/chain1_stairs.json",
    "revision": "bdef10c30dbcfe6dabfa38a947090ed5"
  },
  {
    "url": "chain_json/playermade/histy_nov2/chain10_sandwich.json",
    "revision": "08b545c0b89473c9b9cfe0f9dc844b0d"
  },
  {
    "url": "chain_json/playermade/histy_nov2/chain11_sandwich.json",
    "revision": "24a27726380f162e66ecc6ba7ec84762"
  },
  {
    "url": "chain_json/playermade/histy_nov2/chain12_avalanche.json",
    "revision": "bee56916752d34dc3cbdc197aadb34e9"
  },
  {
    "url": "chain_json/playermade/histy_nov2/chain13_flat.json",
    "revision": "7f855e550249ccf0630c5333b978f3cc"
  },
  {
    "url": "chain_json/playermade/histy_nov2/chain14_lshape.json",
    "revision": "15c208e456f7be9c82c5c6d490f527af"
  },
  {
    "url": "chain_json/playermade/histy_nov2/chain15_sandwich.json",
    "revision": "c07f566733f3233451486b9f9ab31367"
  },
  {
    "url": "chain_json/playermade/histy_nov2/chain16_.json",
    "revision": "577778364f7519da113a25a6c35ee02f"
  },
  {
    "url": "chain_json/playermade/histy_nov2/chain17_kumastacking.json",
    "revision": "2168c81425c890bd905509376a1fe800"
  },
  {
    "url": "chain_json/playermade/histy_nov2/chain18_flat.json",
    "revision": "3352fdc41837c2b8ea5fafb1d02e4d3b"
  },
  {
    "url": "chain_json/playermade/histy_nov2/chain19_sandwich.json",
    "revision": "f6384ae576935a3ad5f67ec468999f83"
  },
  {
    "url": "chain_json/playermade/histy_nov2/chain2_sandwich.json",
    "revision": "247261c3c8bd18c32634c530a6a4e92e"
  },
  {
    "url": "chain_json/playermade/histy_nov2/chain20_kumastacking.json",
    "revision": "795355aeb8726ff1996bb5a5e07659a8"
  },
  {
    "url": "chain_json/playermade/histy_nov2/chain3_gtr.json",
    "revision": "a4f4f981ac67f7961f90789113375ead"
  },
  {
    "url": "chain_json/playermade/histy_nov2/chain4_flat.json",
    "revision": "29e7aad0581fb95ebd0454fc53f6a70f"
  },
  {
    "url": "chain_json/playermade/histy_nov2/chain5_gtr.json",
    "revision": "d3b5a9213ea3278894ea59dd59012056"
  },
  {
    "url": "chain_json/playermade/histy_nov2/chain6_sandwich.json",
    "revision": "05aee1174653724fb9a1138ab0a924f8"
  },
  {
    "url": "chain_json/playermade/histy_nov2/chain7_gtrlong.json",
    "revision": "b1472571206884d50779191efabb82e6"
  },
  {
    "url": "chain_json/playermade/histy_nov2/chain8_gtr.json",
    "revision": "c8c9f9a4538c42515a1b9b085be7f56d"
  },
  {
    "url": "chain_json/playermade/histy_nov2/chain9_lshape.json",
    "revision": "07855e182dd041ceaeeb913f9a4dfde5"
  },
  {
    "url": "chain_json/playermade/lon_1.json",
    "revision": "22bae40cf75542871917dfb13e833448"
  },
  {
    "url": "chain_json/playermade/pyrojay_1.json",
    "revision": "a0134ccf71200750c3c351cae4f104c8"
  },
  {
    "url": "chain_json/playermade/raikon_1.json",
    "revision": "e3c2bb4159a0b9ebe056eb49df803fe9"
  },
  {
    "url": "chain_json/playermade/shiningbolt_1.json",
    "revision": "5ad5f8270f61083e00d9ef1b497f0e5e"
  },
  {
    "url": "chain_json/playermade/yoshi100_1.json",
    "revision": "b9997f1c0d997d270b8004964f6d8084"
  },
  {
    "url": "chain_json/sandwich/15chain_sandwich_nov2.json",
    "revision": "17ecbc933ef1fc76847a7a4ffa393594"
  },
  {
    "url": "chain_json/sandwich/6chain_a.json",
    "revision": "3923d2b120acddf0883d493c9d95f7e3"
  },
  {
    "url": "chain_json/sandwich/8chain_sandwich_b_nov2.json",
    "revision": "04a09e24612d8e34690ce0d4f3f11891"
  },
  {
    "url": "chain_json/sandwich/8chain_sandwich_lshape_nov2.json",
    "revision": "53dfa9244f24e2f0172297a234a80dd0"
  },
  {
    "url": "chain_json/sandwich/8chain_sandwich_nov2.json",
    "revision": "5f2626348842954397f0befe8809690a"
  },
  {
    "url": "chain_json/sandwich/9chain_sandwich_nov2.json",
    "revision": "6a51c34101247879d54bb337528100fb"
  },
  {
    "url": "chain_json/stairs/11chain_stairs_nov2.json",
    "revision": "e8743bb35035c70e6603f1741a51bccf"
  },
  {
    "url": "chain_json/stairs/5chain_a.json",
    "revision": "243fc92775df1bd3569979fda2b27f32"
  },
  {
    "url": "chain_json/stairs/5chain_stairs_nov2.json",
    "revision": "ce8769f2601d2369420bee392d3884e4"
  },
  {
    "url": "chain_json/stairs/8chain_a.json",
    "revision": "822301c673063c16a0932c0ec54c77fd"
  },
  {
    "url": "chain_json/tailing/10chain_3columnavalanche_a.json",
    "revision": "2af8d408668005ba726fd0d07926d252"
  },
  {
    "url": "chain_json/tailing/11chain_a.json",
    "revision": "3d44af492e19d8d4143c1756382cefdd"
  },
  {
    "url": "chain_json/tailing/12chain_tanakaspecial_nov2.json",
    "revision": "b151fc45c09b7b38b658d299045f7fcb"
  },
  {
    "url": "chain_json/tailing/4chain_kumastacking_a.json",
    "revision": "cb2749250f3d802a9df35b8d4f6f4138"
  },
  {
    "url": "chain_json/tailing/4chain_tanakaspecial_nov2.json",
    "revision": "6cfc52e6e6d90bf53dfb071b663dcf17"
  },
  {
    "url": "chain_json/tailing/6chain_3columnavalanche_nov2.json",
    "revision": "4e44ad85db03fd3fe8476f8794156629"
  },
  {
    "url": "chain_json/tailing/8chain_avalanche_b_nov2.json",
    "revision": "e779887f93b072824075e7da534d08f0"
  },
  {
    "url": "chain_json/tailing/8chain_avalanche_nov2.json",
    "revision": "555f7a775cdc88151459c0b371cc2952"
  },
  {
    "url": "chain_json/yayoi/10chain_yayoi_nov2.json",
    "revision": "586cf3250a632d4bf3de19ba3f2c5863"
  },
  {
    "url": "chain_json/yayoi/13chain_yayoi_nov2.json",
    "revision": "dbc7f368da0cf827c1d25e013e2501da"
  },
  {
    "url": "chain_json/yayoi/8chain_yayoi_nov2.json",
    "revision": "a972b9252a087196b19d5262178cb1ab"
  },
  {
    "url": "chaindb.json",
    "revision": "288817a0a5ae8e20a4ab62d7f285c10e"
  },
  {
    "url": "drills/10chain_gtr_nov_2.html",
    "revision": "2ee199ef9d30534ec7f6f159561e7035"
  },
  {
    "url": "drills/10chain_lshape_nov2.html",
    "revision": "7a66add2f0fc42332f0ff5193ee032d5"
  },
  {
    "url": "drills/10chain_yayoi_nov2.html",
    "revision": "71b2b2730b4c3641ca9b60ebac41610a"
  },
  {
    "url": "drills/11chain_gtr_b_nov_2.html",
    "revision": "cba47f8638f0efc9e0d79d551173da7d"
  },
  {
    "url": "drills/11chain_gtr_nov_2.html",
    "revision": "35ba4701ff80bb452334fa0538cd1e11"
  },
  {
    "url": "drills/11chain_lshape_nov2.html",
    "revision": "648afa06df7e6d479fda4d9af3276e42"
  },
  {
    "url": "drills/11chain_stairs_nov2.html",
    "revision": "e6fa761ce17202a097f03583685c18e7"
  },
  {
    "url": "drills/12chain_gtr_nov_2.html",
    "revision": "5aa91482f70dcb1866415009d6d93405"
  },
  {
    "url": "drills/12chain_lshape_nov2.html",
    "revision": "3715658deb4909f3972496d940e29440"
  },
  {
    "url": "drills/12chain_tanakaspecial_nov2.html",
    "revision": "463bd972842811d94c6dc054ea3bb537"
  },
  {
    "url": "drills/13chain_gtr_nov_2.html",
    "revision": "348172cc666bb3ea8664eafb75b08115"
  },
  {
    "url": "drills/13chain_yayoi_nov2.html",
    "revision": "9d4a5d957e0516488fd4bd30776b817a"
  },
  {
    "url": "drills/14chain_gtr_cushion_nov_2.html",
    "revision": "a4101bf541c07514edf604bd58c5d74e"
  },
  {
    "url": "drills/14chain_gtr_nov_2.html",
    "revision": "4da6226d8056aec0d643cef89a390c48"
  },
  {
    "url": "drills/14chain_newgtr_nov_2.html",
    "revision": "44b5f17d282e4b2e60ec80faa217eb7e"
  },
  {
    "url": "drills/14chain_sandwich_nov2.html",
    "revision": "00295dc02745d1575f3f5c837cbd6656"
  },
  {
    "url": "drills/4chain_tanakaspecial_nov2.html",
    "revision": "1ee9257be0c2c60afa77a7017d2ab3ff"
  },
  {
    "url": "drills/5chain_stairs_nov2.html",
    "revision": "c2cfa7fdeb72d0281c2e26ddf37445e4"
  },
  {
    "url": "drills/6chain_3columnavalanche_nov2.html",
    "revision": "8d781524e6601b37b215ce3fa9248e6a"
  },
  {
    "url": "drills/7chain_gtr_nov_2.html",
    "revision": "99bce8413a354d3ac17dfddd310e1b67"
  },
  {
    "url": "drills/8chain_avalanche_b_nov2.html",
    "revision": "d09a3101614f7fdd2d8b632187132914"
  },
  {
    "url": "drills/8chain_avalanche_nov2.html",
    "revision": "806047c820033bc0791569ca35b6c731"
  },
  {
    "url": "drills/8chain_sandwich_b_nov2.html",
    "revision": "4f690dc33a3ed1570ed7b5fb24828cec"
  },
  {
    "url": "drills/8chain_sandwich_lshape_nov2.html",
    "revision": "fdc64905c1036fa920dab54d6b8cc71f"
  },
  {
    "url": "drills/8chain_sandwich_nov2.html",
    "revision": "75ef32028cadbd848d5b3c7e2da04adc"
  },
  {
    "url": "drills/8chain_yayoi_nov2.html",
    "revision": "a569c0a2da6b6dfd05a0128f93ad1d4a"
  },
  {
    "url": "drills/9chain_fukigen_gtr_nov_2.html",
    "revision": "1764ab33e553acb672b895dc8a2b80a3"
  },
  {
    "url": "drills/9chain_lshape_nov2.html",
    "revision": "c0d7bacd65581972b12a52bc4feaa3a2"
  },
  {
    "url": "drills/9chain_sandwich_nov2.html",
    "revision": "e9792405068cf5dcaee78284bd632592"
  },
  {
    "url": "drills/basics/2chain_b.html",
    "revision": "de55588d31b87fe58f020a1955a762ab"
  },
  {
    "url": "drills/basics/3chain_lshape_a.html",
    "revision": "8d251087cfd38e5f4bd941bccf248b01"
  },
  {
    "url": "drills/basics/3chain_stairs_a.html",
    "revision": "bf1e02bcf91f0df7dd22fc9d50545993"
  },
  {
    "url": "drills/basics/4chain_yayoi_a.html",
    "revision": "a0772a8a355c7fb3b39ea11558f69b6f"
  },
  {
    "url": "drills/basics/6chain_a.html",
    "revision": "981e573eb0c6b44322726f12e6d5ba37"
  },
  {
    "url": "drills/chainrecord.html",
    "revision": "d51188aa912fa2f97e8d0d03ed7d17c4"
  },
  {
    "url": "drills/drill_loader_manual_seed.html",
    "revision": "77dbd1c8199c6a4acb6029ed1a2d353b"
  },
  {
    "url": "drills/drill_loader.html",
    "revision": "1f34eb7a3d518454cb84375e231f23b1"
  },
  {
    "url": "drills/gtr/14chain_a.html",
    "revision": "934f29d0ef0fc38b8043507afa849e51"
  },
  {
    "url": "drills/index.html",
    "revision": "44b312e0586de1f6316bb3a2c60e7b8f"
  },
  {
    "url": "drills/lshape/2chain_a.html",
    "revision": "e12b6b00c70815ed2e39502575c1d1ed"
  },
  {
    "url": "drills/lshape/4chain_a.html",
    "revision": "b9c74aa016efa4064a1e0c5eee4609a2"
  },
  {
    "url": "drills/lshape/6chain_a.html",
    "revision": "89adac2ca97c671788f2b66d68c1f9d4"
  },
  {
    "url": "drills/playermade/ddrdan_1.html",
    "revision": "0941de5eff6ab87e7bdf4b63991d25ed"
  },
  {
    "url": "drills/playermade/histy_1.html",
    "revision": "f6f8a0294c0eb915eadfbcf2a252c106"
  },
  {
    "url": "drills/playermade/histy_nov2/chain1_stairs.html",
    "revision": "0f34e6b06a27c7e9f75f118043b6e0dd"
  },
  {
    "url": "drills/playermade/histy_nov2/chain10_sandwich.html",
    "revision": "7d873f6a91aa1927f55513fa6b4437dd"
  },
  {
    "url": "drills/playermade/histy_nov2/chain11_sandwich.html",
    "revision": "de881272e3ddce4c9091e4a83f433abe"
  },
  {
    "url": "drills/playermade/histy_nov2/chain12_avalanche.html",
    "revision": "32c253fa81f08028a4723da212aa6acd"
  },
  {
    "url": "drills/playermade/histy_nov2/chain13_flat.html",
    "revision": "d82176bc13d26497961b8c607f43bcf0"
  },
  {
    "url": "drills/playermade/histy_nov2/chain14_lshape.html",
    "revision": "4425e24f5e3d17234a9564d0116c76f8"
  },
  {
    "url": "drills/playermade/histy_nov2/chain15_sandwich.html",
    "revision": "0ae1e04db802f94dd8cf65e427f88466"
  },
  {
    "url": "drills/playermade/histy_nov2/chain16_.html",
    "revision": "a9fa2c7914c3be639e765608ec676ebc"
  },
  {
    "url": "drills/playermade/histy_nov2/chain17_kumastacking.html",
    "revision": "da05f96520356d9c69d3cffb8cee69d0"
  },
  {
    "url": "drills/playermade/histy_nov2/chain18_flat.html",
    "revision": "e564aba9d30d4ebb5d8911605aa4aaaa"
  },
  {
    "url": "drills/playermade/histy_nov2/chain19_sandwich.html",
    "revision": "47f3418d0a4e22a1fd73257d3cd7e8ee"
  },
  {
    "url": "drills/playermade/histy_nov2/chain2_sandwich.html",
    "revision": "71e6206e8a116b29cfb8c86e7a31a921"
  },
  {
    "url": "drills/playermade/histy_nov2/chain20_kumastacking.html",
    "revision": "8ba4938daaa3e57e197e8f965b64ef2e"
  },
  {
    "url": "drills/playermade/histy_nov2/chain3_gtr.html",
    "revision": "2f744bc6c037233829f1ddf321330086"
  },
  {
    "url": "drills/playermade/histy_nov2/chain4_flat.html",
    "revision": "57f321ae70da1d12b6f33241ee325d2e"
  },
  {
    "url": "drills/playermade/histy_nov2/chain5_gtr.html",
    "revision": "50136f2349eba0858e4f8c2f39c45faa"
  },
  {
    "url": "drills/playermade/histy_nov2/chain6_sandwich.html",
    "revision": "08e2c64820fc1254d550ab364a342f0d"
  },
  {
    "url": "drills/playermade/histy_nov2/chain7_gtrlong.html",
    "revision": "9486f6510d8b3fbe560a7b3297dcece1"
  },
  {
    "url": "drills/playermade/histy_nov2/chain8_gtr.html",
    "revision": "bc02da11b9f5645303769e040faec6d9"
  },
  {
    "url": "drills/playermade/histy_nov2/chain9_lshape.html",
    "revision": "5bda233441debd39452790886ea18d14"
  },
  {
    "url": "drills/playermade/lon_1.html",
    "revision": "75aeef447b1bee490dbc6a1aa723717e"
  },
  {
    "url": "drills/playermade/pyrojay_1.html",
    "revision": "32431e34fcf78b082a67b3a292ab62a3"
  },
  {
    "url": "drills/playermade/raikon_1.html",
    "revision": "2751b54e86ad55ddf05f1feb9874c3a5"
  },
  {
    "url": "drills/playermade/shiningbolt_1.html",
    "revision": "03279327144e321dddd4d7d07b89560a"
  },
  {
    "url": "drills/playermade/yoshi100_1.html",
    "revision": "c1222d0e19e44725d74f043591dbcfba"
  },
  {
    "url": "drills/sandwich/6chain_a.html",
    "revision": "486208d755bd28cd803c06b30d59c5f4"
  },
  {
    "url": "drills/stairs/5chain_a.html",
    "revision": "0d689cbf46ba6f0ed1e4d016c1ee5de1"
  },
  {
    "url": "drills/stairs/8chain_a.html",
    "revision": "e88364536b1d0f4f1095e6446beb8c74"
  },
  {
    "url": "drills/tailing/10chain_3columnavalanche_a.html",
    "revision": "e99bf42c64d0291bb5b1b5cc18e8afa8"
  },
  {
    "url": "drills/tailing/11chain_a.html",
    "revision": "865b2b17ee6b16cf09767cff89823ae1"
  },
  {
    "url": "drills/tailing/4chain_kumastacking_a.html",
    "revision": "a710437a7a5b2f0ca393e9a6e9faa8a3"
  },
  {
    "url": "esports/index.html",
    "revision": "12f1667841307c178b17b92aa8d1c2c2"
  },
  {
    "url": "esports/overview.html",
    "revision": "39a6570bf7a09bc3a89a378177f0be5f"
  },
  {
    "url": "esports/translation/menus.html",
    "revision": "0ec52ff28ec04a40b9dd3f8387f5971b"
  },
  {
    "url": "esports/translation/purchasing.html",
    "revision": "ffe21362c9ce8bcdaec8af5296a6faea"
  },
  {
    "url": "icon192.png",
    "revision": "1903e70249c73ed11aefee691f00f165"
  },
  {
    "url": "icon512.png",
    "revision": "ea6005a47a0026fed712bdf1bd5044cf"
  },
  {
    "url": "img/0.png",
    "revision": "edfa59f2ad63625e01d67837bca92cb2"
  },
  {
    "url": "img/1.png",
    "revision": "9770051e853ffb02bbf95037ff03c093"
  },
  {
    "url": "img/2.png",
    "revision": "66b2f569cc333487d6dca50c54cede23"
  },
  {
    "url": "img/3.png",
    "revision": "fbc2b634fd2386631d11d02d726f25f3"
  },
  {
    "url": "img/4.png",
    "revision": "670d1ee6fa1805bc0526367f4bc08184"
  },
  {
    "url": "img/5.png",
    "revision": "be2960aa471a1120dd849d3591175782"
  },
  {
    "url": "img/6.png",
    "revision": "f62891ed102207374b4879c0ef7aa517"
  },
  {
    "url": "img/7.png",
    "revision": "9a933c4af78bfadc3b8d91893ec40b7b"
  },
  {
    "url": "img/8.png",
    "revision": "5cb92a3ac4c4bd562e3b582525f9a918"
  },
  {
    "url": "img/9.png",
    "revision": "a846fdac5d0250c913f0b834143b193a"
  },
  {
    "url": "img/arle_bg.png",
    "revision": "f8549cec15243f8c8dcc0a0e7f340389"
  },
  {
    "url": "img/arrow - Copy.png",
    "revision": "3f5d8406f9c59f79c870f967c1daae49"
  },
  {
    "url": "img/arrow_x.png",
    "revision": "149a6a4d5552ccd8c67c080ee7702e84"
  },
  {
    "url": "img/arrow.png",
    "revision": "82cca81941772e5e34c53aad89970ea5"
  },
  {
    "url": "img/btn_auto_pressed.png",
    "revision": "fe421e30e7c0f275609b76defc0220f3"
  },
  {
    "url": "img/btn_auto.png",
    "revision": "5734834f5f4e7754c5ed25405699291a"
  },
  {
    "url": "img/btn_back_pressed.png",
    "revision": "bb0da29c17189973ce048ea5d3d3c08e"
  },
  {
    "url": "img/btn_back.png",
    "revision": "8981e364e53aa0e21b67d88b57af9e71"
  },
  {
    "url": "img/btn_edit_pressed.png",
    "revision": "fba3148f3ae4fb9cb2a883a6a1a5b30a"
  },
  {
    "url": "img/btn_edit.png",
    "revision": "8aa688348e7f5c9176eda7a067fbafb8"
  },
  {
    "url": "img/btn_play_pressed.png",
    "revision": "76f6f8c32afd1c8efb7b92820fd22ddb"
  },
  {
    "url": "img/btn_play.png",
    "revision": "6401a73ac998ba96e848981f419bfaf6"
  },
  {
    "url": "img/btn_reset_pressed.png",
    "revision": "c54e67a77ebfd242b596b415b8114f8c"
  },
  {
    "url": "img/btn_reset.png",
    "revision": "b63516d715228b8c9ebee3a99423c3c9"
  },
  {
    "url": "img/btn_stop_pressed.png",
    "revision": "10af26b80de406b1c9cd2f13ba12d81a"
  },
  {
    "url": "img/btn_stop.png",
    "revision": "10973021d28c7b925628ecfc10eca4af"
  },
  {
    "url": "img/chain_font.json",
    "revision": "073043b321f7ada60faabe3841d9e084"
  },
  {
    "url": "img/chain_font.png",
    "revision": "932902a739bbd5b859da4ab896b30f6f"
  },
  {
    "url": "img/charaselect_tgs_1_000.png",
    "revision": "cec42e58fe8a8888bea1bb6b0f2d9bd9"
  },
  {
    "url": "img/clubmake_001.png",
    "revision": "158611758b4121e86b219e569d8c52c6"
  },
  {
    "url": "img/clubmake_011.png",
    "revision": "f0da6ec035f0a8d04e4de4f98a1cb2ab"
  },
  {
    "url": "img/current_tool.png",
    "revision": "7ae19635f1921accf44b24e64f9e39c9"
  },
  {
    "url": "img/cursor_x.png",
    "revision": "ea71fc7d073edeeef9cc462f0760c418"
  },
  {
    "url": "img/cursor.png",
    "revision": "2c3568c44f0dbd48a6fa7d0b828c72c1"
  },
  {
    "url": "img/drills/explanation_1.png",
    "revision": "d12b6576304c8faf2cbd2b71e4f1dc12"
  },
  {
    "url": "img/drills/explanation_2.png",
    "revision": "ddacd166ed2cb04fe92db08453062e67"
  },
  {
    "url": "img/edit_bubble.png",
    "revision": "143a9da5941d577b9c84bc6a3681fad3"
  },
  {
    "url": "img/editor_x - Copy.png",
    "revision": "27ff65aca0f20b9ca55795dcc0089c37"
  },
  {
    "url": "img/editor_x.png",
    "revision": "98aec43a892c12f3cceee2f5136483bd"
  },
  {
    "url": "img/esports/base_settings.jpg",
    "revision": "ad290c0a0ddbb3047de8b456b99b1964"
  },
  {
    "url": "img/esports/battle_endurance.jpg",
    "revision": "7a47de001a29f0a554d8f8ac44a798dc"
  },
  {
    "url": "img/esports/characterselect.jpg",
    "revision": "cd788b86f984c1673d2dfeafd2715c86"
  },
  {
    "url": "img/esports/decide_com.jpg",
    "revision": "98dd6d67863bfb4c3e3fc82f1b4a93e0"
  },
  {
    "url": "img/esports/fever_setup.jpg",
    "revision": "9c7fd4e84741dabf5d38fb58db096bff"
  },
  {
    "url": "img/esports/fever.jpg",
    "revision": "4bd9c4857c630f7bfdc4022f0b0ee8a4"
  },
  {
    "url": "img/esports/internet.jpg",
    "revision": "ad49c659adbce39eeb541e942dffc742"
  },
  {
    "url": "img/esports/mainmenu.jpg",
    "revision": "d205e7ca524935ef31081fdb02a93ba6"
  },
  {
    "url": "img/esports/match_over.jpg",
    "revision": "83fa8c81e3a63f27922c2e1f7b060ec5"
  },
  {
    "url": "img/esports/match_setup.jpg",
    "revision": "87c5da210e13ad7f71cda714b5e8332d"
  },
  {
    "url": "img/esports/minna_play_mode.jpg",
    "revision": "fc8a3ad5b7ff28d485fdd427636bc176"
  },
  {
    "url": "img/esports/my_character.jpg",
    "revision": "6bf6f49e12ec3cafdc1ae0ca25d26d84"
  },
  {
    "url": "img/esports/my_data.jpg",
    "revision": "635530340f5a91da6c6b1c5eec55d822"
  },
  {
    "url": "img/esports/my_deco.jpg",
    "revision": "2defe9370661e7b5b652eb44fc2f1d1f"
  },
  {
    "url": "img/esports/my_icon.jpg",
    "revision": "6fad2ce35282a01755f876a7ddcec7d8"
  },
  {
    "url": "img/esports/pause_menu.jpg",
    "revision": "635847559be1aeddd4883911d594d036"
  },
  {
    "url": "img/esports/purchasing.jpg",
    "revision": "3dfbce85801552ba53ff05ec67ae5ae8"
  },
  {
    "url": "img/esports/puyopuyoleague.jpg",
    "revision": "52fbb73a11b5aa4a5e2005be86f296f5"
  },
  {
    "url": "img/esports/room_select.jpg",
    "revision": "c0ef4b9d71327b67aa7f75bd05a4e589"
  },
  {
    "url": "img/esports/roomcreate_1.jpg",
    "revision": "2ec3474ae8901382a4ff649ed9b99761"
  },
  {
    "url": "img/esports/roomcreate_2.jpg",
    "revision": "85a4bf19cc9485fd01ccb47c523652bd"
  },
  {
    "url": "img/esports/roomcreate_3.jpg",
    "revision": "e036d245402808ec9bdf6a6562fee30c"
  },
  {
    "url": "img/esports/save_over_replay.jpg",
    "revision": "b3eea5abe774f642fa03ad11446eb396"
  },
  {
    "url": "img/esports/singlepuyopuyo.jpg",
    "revision": "5aac62ff63e81a9dde79a0bcd2514c31"
  },
  {
    "url": "img/esports/titlescreen.jpg",
    "revision": "c9c31ee951377d2ac61eb314997f0773"
  },
  {
    "url": "img/esports/tsu_settings.jpg",
    "revision": "4e080c39337d1d88adbcd7d99457bc60"
  },
  {
    "url": "img/esports/your_replays_menu.jpg",
    "revision": "3b3cb3b88f1006758ce4245751e490c1"
  },
  {
    "url": "img/esports/your_replays.jpg",
    "revision": "599fb2e41064dfe070964ce0170b87d5"
  },
  {
    "url": "img/field_border_bottom.png",
    "revision": "feeb5918ef8538417be5f99a55a9b592"
  },
  {
    "url": "img/field_border_left_bottomhalf.png",
    "revision": "5287eb1612074db70daece54cf4e4d6d"
  },
  {
    "url": "img/field_border_left_tophalf.png",
    "revision": "21357b63820bfff066c76089f0773c59"
  },
  {
    "url": "img/field_border_right_bottomhalf.png",
    "revision": "40840d1a46149327dfa1e7db1537ca71"
  },
  {
    "url": "img/field_border_right_tophalf.png",
    "revision": "81364e82b05d52beb0822b835369ea0d"
  },
  {
    "url": "img/field_border_top.png",
    "revision": "b374a3f1e7e1390f4817ef063ae6d80a"
  },
  {
    "url": "img/field.json",
    "revision": "2470aeab78baff7a45f7d25c2928c22c"
  },
  {
    "url": "img/field.png",
    "revision": "cbd56369c678219f194babf0d8327e1b"
  },
  {
    "url": "img/garbage_tray_old.png",
    "revision": "16402c687abbebc9fb1fcc7ed5ec83ec"
  },
  {
    "url": "img/garbage_tray.png",
    "revision": "c6ce5d53c095b3907ff083909cb13d93"
  },
  {
    "url": "img/guides/activepair.gif",
    "revision": "64f58ad4965dea654f1076fb121ae0d2"
  },
  {
    "url": "img/guides/column_numbers.jpg",
    "revision": "3b2e772e685e588349f95c96f2c758c2"
  },
  {
    "url": "img/guides/crown.png",
    "revision": "a8f64a56e6a1234d6309d1dbcbb95d08"
  },
  {
    "url": "img/guides/gamefield.jpg",
    "revision": "3b407fae96018a3e5e258eccafc54022"
  },
  {
    "url": "img/guides/garbage_tray.jpg",
    "revision": "c04e91c1a3e463fe559ba7ac5d6e5dbd"
  },
  {
    "url": "img/guides/moon.png",
    "revision": "63504872b909ff4811615fab1c5c40cc"
  },
  {
    "url": "img/guides/p5.jpg",
    "revision": "a0d03a93d157d9bd960199daaaaa5f5e"
  },
  {
    "url": "img/guides/p5.png",
    "revision": "695314975d5407b0f7ec548d10b4ed14"
  },
  {
    "url": "img/guides/puyopuyoesports.jpg",
    "revision": "427c8fae90d44ee1302687575214c78d"
  },
  {
    "url": "img/guides/rock.png",
    "revision": "7bc526421e6d5580e20321248fa50d92"
  },
  {
    "url": "img/guides/star.png",
    "revision": "a4911534a72a5aaac8eeac9d826ef183"
  },
  {
    "url": "img/icons/android-chrome-192x192.png",
    "revision": "f130a0b70e386170cf6f011c0ca8c4f4"
  },
  {
    "url": "img/icons/android-chrome-512x512.png",
    "revision": "0ff1bc4d14e5c9abcacba7c600d97814"
  },
  {
    "url": "img/icons/apple-touch-icon-120x120.png",
    "revision": "936d6e411cabd71f0e627011c3f18fe2"
  },
  {
    "url": "img/icons/apple-touch-icon-152x152.png",
    "revision": "1a034e64d80905128113e5272a5ab95e"
  },
  {
    "url": "img/icons/apple-touch-icon-180x180.png",
    "revision": "c43cd371a49ee4ca17ab3a60e72bdd51"
  },
  {
    "url": "img/icons/apple-touch-icon-60x60.png",
    "revision": "9a2b5c0f19de617685b7b5b42464e7db"
  },
  {
    "url": "img/icons/apple-touch-icon-76x76.png",
    "revision": "af28d69d59284dd202aa55e57227b11b"
  },
  {
    "url": "img/icons/apple-touch-icon.png",
    "revision": "66830ea6be8e7e94fb55df9f7b778f2e"
  },
  {
    "url": "img/icons/favicon-16x16.png",
    "revision": "4bb1a55479d61843b89a2fdafa7849b3"
  },
  {
    "url": "img/icons/favicon-32x32.png",
    "revision": "98b614336d9a12cb3f7bedb001da6fca"
  },
  {
    "url": "img/icons/msapplication-icon-144x144.png",
    "revision": "b89032a4a5a1879f30ba05a13947f26f"
  },
  {
    "url": "img/icons/mstile-150x150.png",
    "revision": "058a3335d15a3eb84e7ae3707ba09620"
  },
  {
    "url": "img/icons/safari-pinned-tab.svg",
    "revision": "f78c0251d6ddd56ee219a1830ded71b4"
  },
  {
    "url": "img/next_background_1p_mask.png",
    "revision": "7cf8b448309d88f53451b4966df36202"
  },
  {
    "url": "img/next_background_1p.png",
    "revision": "af4bb4be8ec04ddedfb72bb2a248f3fb"
  },
  {
    "url": "img/next_border_1p.png",
    "revision": "eb8ea5055b8d85ebeb80bb8873de1ae5"
  },
  {
    "url": "img/picker_arrow_left.png",
    "revision": "d5902678fef9c0c0624134ccd531166b"
  },
  {
    "url": "img/picker_arrow_right.png",
    "revision": "7f7e035c3262e759483b70717791d390"
  },
  {
    "url": "img/player/button_edit.png",
    "revision": "a67b08534196f160e56a5197011b6099"
  },
  {
    "url": "img/player/button_fastforward-01.svg",
    "revision": "0cc447df675329abc61b069eafc79e13"
  },
  {
    "url": "img/player/button_fastforward.png",
    "revision": "f338eef24021ed43543105303fe416df"
  },
  {
    "url": "img/player/button_fastforward.svg",
    "revision": "9ab9bea246963917d9b4181eb973b465"
  },
  {
    "url": "img/player/round-edit-24px.svg",
    "revision": "74bfe505077f0cf4a47316a49b95fa68"
  },
  {
    "url": "img/popups.json",
    "revision": "7ef9a02dc071891e0216e0d81e79b27d"
  },
  {
    "url": "img/popups.png",
    "revision": "75f801fd93be616435f06ee77ad2a926"
  },
  {
    "url": "img/puyo_aqua.png",
    "revision": "7604706d63d5726a60e702dcb2ea50c3"
  },
  {
    "url": "img/puyo.json",
    "revision": "191b8e5a161344d80cc109be0f4d925d"
  },
  {
    "url": "img/rateranking_002.png",
    "revision": "7dce2b14ed405a4f9849fb6715449b33"
  },
  {
    "url": "img/red.gif",
    "revision": "023898f4d9875d4bc7123a43e0de4441"
  },
  {
    "url": "img/rensa.png",
    "revision": "c4381310d8ab3ebc0a97a1fbeb4e177c"
  },
  {
    "url": "img/rotate_container.png",
    "revision": "637a027de4d707f189a3e3c11b3a21bf"
  },
  {
    "url": "img/save_wheel.png",
    "revision": "48c8b810091dcead8dba81ead6b1b8a5"
  },
  {
    "url": "img/score_0.png",
    "revision": "fc6c096963d87f09548df84358e7ca74"
  },
  {
    "url": "img/score_1.png",
    "revision": "5fa43440a16b749468f0e5b070178e98"
  },
  {
    "url": "img/score_2.png",
    "revision": "bf74d6d1c8db5c8a6b9614e373296b31"
  },
  {
    "url": "img/score_3.png",
    "revision": "4e19b8e2b517cf0e3d3ec9e506ec6959"
  },
  {
    "url": "img/score_4.png",
    "revision": "b8840cc789b2600570d58ad466b209ff"
  },
  {
    "url": "img/score_5.png",
    "revision": "6f8fc40c1e88787d180be6b669b3c9cb"
  },
  {
    "url": "img/score_6.png",
    "revision": "4ecc6ce9725eb23ae344e48f751a3d5c"
  },
  {
    "url": "img/score_7.png",
    "revision": "b6e76e7654f1283b3d883f38075b6902"
  },
  {
    "url": "img/score_8.png",
    "revision": "0fef858cb42d72b50e487bb36aeb8a9c"
  },
  {
    "url": "img/score_9.png",
    "revision": "d71e7a183b41e8cc47eb5491bb8a7a0b"
  },
  {
    "url": "img/seiseki_003.png",
    "revision": "2be82320feca84e5940d0255370a02a0"
  },
  {
    "url": "img/sprites.json",
    "revision": "49851e49b562ac818e2ba8052665dab3"
  },
  {
    "url": "img/standby_club_2p_002.png",
    "revision": "c0190e3807d606ef94b54cda930cef53"
  },
  {
    "url": "img/toko_31_000.png",
    "revision": "6a2505ac7c7bb52be44bd2104baf27bb"
  },
  {
    "url": "img/touch_disabler.png",
    "revision": "c9b90ec613e50491fb93273bdabc43ae"
  },
  {
    "url": "index.html",
    "revision": "d842700e5842818436d10020475ab525"
  },
  {
    "url": "js/bezier-easing.js",
    "revision": "d517904ce25afdd4f349399e431428db"
  },
  {
    "url": "js/hnl.mobileConsole.js",
    "revision": "3037fcdc1b304625b377c9dbcf4d6017"
  },
  {
    "url": "js/pixi.min.js",
    "revision": "be073d522ac1b9f65d61e89ac824ad72"
  },
  {
    "url": "manifest.json",
    "revision": "1fb0601de946769c7f48c56ac41007df"
  },
  {
    "url": "settings/settings.html",
    "revision": "d26d44f7b67bf122fb6db0797217a3e2"
  },
  {
    "url": "streamers/caneofpacci.html",
    "revision": "fa9b76ce1f373aa4a5d5f9e066c084e6"
  },
  {
    "url": "streamers/index.html",
    "revision": "012251c241eb4d0bfd1befb774211791"
  },
  {
    "url": "streamers/raikon.html",
    "revision": "d302cdae8b49a16fff6c0ce654372d73"
  },
  {
    "url": "streamers/shiro.html",
    "revision": "c10a107803a836bd05ca7e01d2ec0244"
  },
  {
    "url": "streamers/yoshi100.html",
    "revision": "3ed626cf53f06dbf05fc6a66da44ff90"
  },
  {
    "url": "tutorial/basics.html",
    "revision": "f54bbc3cc6db365490c0b384f05ea983"
  },
  {
    "url": "tutorial/gamescreen.html",
    "revision": "e3fd78a948ac0e7185582f89c4461a54"
  },
  {
    "url": "tutorial/index.html",
    "revision": "17a547899708125ec8948c402b08fd35"
  },
  {
    "url": "tutorial/stairs.html",
    "revision": "10fd72d9a40c8d64af2dd86e0ec6e475"
  },
  {
    "url": "tutorial/test2.html",
    "revision": "88f372db53c88e2d90088212999d8b1d"
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
