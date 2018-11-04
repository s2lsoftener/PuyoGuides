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
    "revision": "71614f2a65f76883fa26482c66865af4"
  },
  {
    "url": "assets/css/0.styles.dff3c0a6.css",
    "revision": "4b3c030bc1547dfc39560b36d695c506"
  },
  {
    "url": "assets/css/1.styles.496bb93e.css",
    "revision": "bf68fc1751de9f60be353d0ee09ffa52"
  },
  {
    "url": "assets/css/10.styles.12ed68a9.css",
    "revision": "fb3824a184b40afd6f01edb02d6c2060"
  },
  {
    "url": "assets/css/11.styles.c45296ae.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "assets/css/12.styles.b809d9f9.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "assets/css/13.styles.72cb892f.css",
    "revision": "e071d2a9b3f21c3eab9dd711e1bbdc90"
  },
  {
    "url": "assets/css/14.styles.99996488.css",
    "revision": "b909c0c0806fdd7d3126d4222c69c4a4"
  },
  {
    "url": "assets/css/15.styles.4d90fd23.css",
    "revision": "e7729eac8b94e22f34de706aeeab56aa"
  },
  {
    "url": "assets/css/16.styles.8c64de7d.css",
    "revision": "3da36b0a4f5d09050668f23db5ef36d1"
  },
  {
    "url": "assets/css/17.styles.a9f135e0.css",
    "revision": "ace9f25855b5eeb563c4787c9415361b"
  },
  {
    "url": "assets/css/18.styles.5f9fc96b.css",
    "revision": "bdc94dcc15c8231027d78dada1090c52"
  },
  {
    "url": "assets/css/19.styles.662b052d.css",
    "revision": "6556997fd275c8524552d142d0478198"
  },
  {
    "url": "assets/css/2.styles.f3b33984.css",
    "revision": "1260392a0719ab372d4d02e127931594"
  },
  {
    "url": "assets/css/20.styles.c5dee91a.css",
    "revision": "a7167d5b34410103ac97bcc770babe15"
  },
  {
    "url": "assets/css/21.styles.e22cd635.css",
    "revision": "e8adcd0c09d283517347e48088ec8311"
  },
  {
    "url": "assets/css/22.styles.34f31f46.css",
    "revision": "139c2f9b91ead1da668eb12137c8a833"
  },
  {
    "url": "assets/css/23.styles.b9ed713d.css",
    "revision": "df7c35ec8029dbbde0735a45f875eaf7"
  },
  {
    "url": "assets/css/25.styles.1c83fd08.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "assets/css/4.styles.20c8183d.css",
    "revision": "1260392a0719ab372d4d02e127931594"
  },
  {
    "url": "assets/css/5.styles.d8a79736.css",
    "revision": "b909c0c0806fdd7d3126d4222c69c4a4"
  },
  {
    "url": "assets/css/6.styles.b2fd0371.css",
    "revision": "b909c0c0806fdd7d3126d4222c69c4a4"
  },
  {
    "url": "assets/css/7.styles.0157fc4e.css",
    "revision": "713ff99668d4a24f6fa7bf7ab7cad631"
  },
  {
    "url": "assets/css/8.styles.ad5aa58e.css",
    "revision": "932aca2a883265bb0310badbd2350c6f"
  },
  {
    "url": "assets/css/9.styles.a30036a6.css",
    "revision": "bc8d8e8979e1f576ddfb544c92dde45e"
  },
  {
    "url": "assets/css/styles.bd12bdeb.css",
    "revision": "cdbcfbd9a0654e6beec824fcc18d54a3"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/0.dff3c0a6.js",
    "revision": "e6da9452bad94cf0c49a71db361d8d81"
  },
  {
    "url": "assets/js/1.496bb93e.js",
    "revision": "286759f1eb95ec30c3cb6c8a35e7f664"
  },
  {
    "url": "assets/js/10.12ed68a9.js",
    "revision": "a6675ca9ceed6b5b238ae5ed2e00f96a"
  },
  {
    "url": "assets/js/100.12eb6bcd.js",
    "revision": "10691c1313155f9c02f4d0721ce926e5"
  },
  {
    "url": "assets/js/101.3308e9fd.js",
    "revision": "d0fabab053cf2757226ea9128af09def"
  },
  {
    "url": "assets/js/102.a2998cbd.js",
    "revision": "8c716024a89c8dfa5add0fc7a9aa963b"
  },
  {
    "url": "assets/js/103.ddfba454.js",
    "revision": "02ba6d253ce4a02e9b9090e59d2d42cc"
  },
  {
    "url": "assets/js/104.069ef668.js",
    "revision": "c4a89ab2e2d0f24842d431a3f132ef8d"
  },
  {
    "url": "assets/js/105.06c89c7c.js",
    "revision": "0efc01d17b09c72927d7ff54c83be1d8"
  },
  {
    "url": "assets/js/106.791177ed.js",
    "revision": "39a14e1dd737337af9e90e1f9e9e434b"
  },
  {
    "url": "assets/js/107.88afe54f.js",
    "revision": "f01a748f06d2115b51392a1b994011a7"
  },
  {
    "url": "assets/js/108.f6cd0427.js",
    "revision": "6b9f96df6d81aa40fe513c04c6c300fa"
  },
  {
    "url": "assets/js/109.61e6e771.js",
    "revision": "4c74e955140060ec0074fe11d7ea06ff"
  },
  {
    "url": "assets/js/11.c45296ae.js",
    "revision": "a1e355d6a8610380ba50ac12784d93cf"
  },
  {
    "url": "assets/js/110.510eedc9.js",
    "revision": "ecbb205b9e9bc24f4df3c8cf8d453842"
  },
  {
    "url": "assets/js/111.97af79a1.js",
    "revision": "0723a080c0465c754743703f288842e3"
  },
  {
    "url": "assets/js/112.da4dc712.js",
    "revision": "9979f8211e81ed52e216f0ad66eee00d"
  },
  {
    "url": "assets/js/113.30e3a82c.js",
    "revision": "d85280ecccb3e7c597f8f8d295a319fa"
  },
  {
    "url": "assets/js/114.219c1da9.js",
    "revision": "3f844b04855aabb7a4d4023c2166ae96"
  },
  {
    "url": "assets/js/115.4c022e89.js",
    "revision": "9fa63f97cf75cab8f8f06fbb1bf91b3f"
  },
  {
    "url": "assets/js/116.42c3b9a6.js",
    "revision": "9c3527229ab634d797b679b032bc631a"
  },
  {
    "url": "assets/js/117.bac62822.js",
    "revision": "bbc3ff266949dc2f64f9168bebd99c22"
  },
  {
    "url": "assets/js/12.b809d9f9.js",
    "revision": "7859e9d9399c442dc4bf777dc98647f3"
  },
  {
    "url": "assets/js/13.72cb892f.js",
    "revision": "c178b46d26f590eb9bcc7337b21c22f4"
  },
  {
    "url": "assets/js/14.99996488.js",
    "revision": "72f640191e4374c4fbb364313f6baeac"
  },
  {
    "url": "assets/js/15.4d90fd23.js",
    "revision": "63b022bd692154ddc17789ba00f7d6bd"
  },
  {
    "url": "assets/js/16.8c64de7d.js",
    "revision": "66e0855252eef9d21c4a5b215d9b99af"
  },
  {
    "url": "assets/js/17.a9f135e0.js",
    "revision": "705ccfc1017ef44f48412fd736b244e0"
  },
  {
    "url": "assets/js/18.5f9fc96b.js",
    "revision": "e9512d74b5bcab4fe370c1c547ae0947"
  },
  {
    "url": "assets/js/19.662b052d.js",
    "revision": "5b44cfa6c93490b1638dbd6baddd04e1"
  },
  {
    "url": "assets/js/2.f3b33984.js",
    "revision": "a03fdf1cead6e54bce5eda3346bd2b29"
  },
  {
    "url": "assets/js/20.c5dee91a.js",
    "revision": "bfd0f5389c72dc085ccdffec346f1c55"
  },
  {
    "url": "assets/js/21.e22cd635.js",
    "revision": "4c4e12303f695a705fd12d186688f4fb"
  },
  {
    "url": "assets/js/22.34f31f46.js",
    "revision": "839fe59e0d1293794a22fba5742c4f0d"
  },
  {
    "url": "assets/js/23.b9ed713d.js",
    "revision": "6022fa8c2c8763f2f8e3bf40a6313b98"
  },
  {
    "url": "assets/js/24.8711984f.js",
    "revision": "0925ea152a11578187e41596488ae733"
  },
  {
    "url": "assets/js/25.1c83fd08.js",
    "revision": "3932ef3714966676baeca562faf9ce48"
  },
  {
    "url": "assets/js/26.f51de94c.js",
    "revision": "6fdec2a8a56a10b78f45ab671a7d4777"
  },
  {
    "url": "assets/js/27.f4e413c5.js",
    "revision": "9aa79eb5854de569b2527bd48737d8bd"
  },
  {
    "url": "assets/js/28.d4ff9ffa.js",
    "revision": "50c2e1864a7ed76926dcdfdfcce80116"
  },
  {
    "url": "assets/js/29.1394fc2e.js",
    "revision": "e8eb03e28039b2e330db161828ec3faa"
  },
  {
    "url": "assets/js/30.f6a1c9e4.js",
    "revision": "c3e885de802424e04c204a7201bd13d9"
  },
  {
    "url": "assets/js/31.1f1d2c50.js",
    "revision": "e61dd1ffe7b3c10fcb6b8c68be828379"
  },
  {
    "url": "assets/js/32.b2542adf.js",
    "revision": "3c74866bf1fbcd7f0176debce6eff176"
  },
  {
    "url": "assets/js/33.a6291a67.js",
    "revision": "590bfd19371e81ed17103afd38e68c47"
  },
  {
    "url": "assets/js/34.56bfea0c.js",
    "revision": "6525ccff91847ab996cb6fd475fb0664"
  },
  {
    "url": "assets/js/35.3fdd5cff.js",
    "revision": "d955af86840241f3e143d308d5568510"
  },
  {
    "url": "assets/js/36.39e95f9d.js",
    "revision": "72ab6ee5646b1aa0fbd7b68c72b367d6"
  },
  {
    "url": "assets/js/37.704fc9ac.js",
    "revision": "6ae8d65cab65276f6841ed43ad201186"
  },
  {
    "url": "assets/js/38.2ed0c916.js",
    "revision": "cf728658b836a9d97e9f6bceef3e4f53"
  },
  {
    "url": "assets/js/39.e2f6e533.js",
    "revision": "670dd17c501fcb41f62dbff2a526c4ab"
  },
  {
    "url": "assets/js/4.20c8183d.js",
    "revision": "2b67199ee7ef31828c7dc890fb6fbe89"
  },
  {
    "url": "assets/js/40.4d54ad6c.js",
    "revision": "193746dbd4bfb8f4cdc1114d729efef7"
  },
  {
    "url": "assets/js/41.f389b01f.js",
    "revision": "258516ac7c54f6d6bb60627a2848c44c"
  },
  {
    "url": "assets/js/42.1baba9b7.js",
    "revision": "f64ce0b164faa56356e1640b6e0c96c7"
  },
  {
    "url": "assets/js/43.d0cb321b.js",
    "revision": "7e269b35e6563c95cecd3b86be0f3822"
  },
  {
    "url": "assets/js/44.a5977dfc.js",
    "revision": "fc74a5e8511c00db2e45dae4cc6d59cb"
  },
  {
    "url": "assets/js/45.b9b86e7a.js",
    "revision": "c61f92020c4f71b9de8923b5ff38b8ad"
  },
  {
    "url": "assets/js/46.4b285d15.js",
    "revision": "873e55f66e4aad06d635e843c3913aca"
  },
  {
    "url": "assets/js/47.59d6b0d3.js",
    "revision": "3ac505eb604e25c049d5c65e1f6d29c7"
  },
  {
    "url": "assets/js/48.64029485.js",
    "revision": "449fee6f3f90e1d491e11c3ab7058b7b"
  },
  {
    "url": "assets/js/49.4bd32ea2.js",
    "revision": "9d9bc430f2353d8612a3ed35a6e3d538"
  },
  {
    "url": "assets/js/5.d8a79736.js",
    "revision": "edf3f9750970fecc31f8c6cc9ea9f128"
  },
  {
    "url": "assets/js/50.b2b3a0b7.js",
    "revision": "6ee5135e4856a35f0211ed7b62a08234"
  },
  {
    "url": "assets/js/51.b25f9c5f.js",
    "revision": "b4cbf17d924c950eef02fd4c3f7c8efa"
  },
  {
    "url": "assets/js/52.9dcd4dc5.js",
    "revision": "f5fb600fc6b79f04842a68926162c89d"
  },
  {
    "url": "assets/js/53.ac59e421.js",
    "revision": "5dba76b62e7e29de62bb79f4d5803898"
  },
  {
    "url": "assets/js/54.2b4f0e06.js",
    "revision": "904bd1b6eeeee4be81fe9120c54c3ea8"
  },
  {
    "url": "assets/js/55.c193633f.js",
    "revision": "a2610c2e46a9c9444a576fe2ad482982"
  },
  {
    "url": "assets/js/56.fec65ae4.js",
    "revision": "e1d6d698b36fc6152bc8555700b858ac"
  },
  {
    "url": "assets/js/57.ca36968c.js",
    "revision": "ca86bebf1e11d7005efc03b47c8a0790"
  },
  {
    "url": "assets/js/58.07dcb63e.js",
    "revision": "34543c81084167a8ea3ab4eda198f1f1"
  },
  {
    "url": "assets/js/59.5166d2f7.js",
    "revision": "cfb2ab82a8f192dd1c106a0efeaf7372"
  },
  {
    "url": "assets/js/6.b2fd0371.js",
    "revision": "e8252a59a3da27cce6c44d5a4038bb74"
  },
  {
    "url": "assets/js/60.c7a0a4e4.js",
    "revision": "54493af6ade4419ab4d8211fdfea1b51"
  },
  {
    "url": "assets/js/61.2ef4377e.js",
    "revision": "62599b3605481fefc7845a762b343c30"
  },
  {
    "url": "assets/js/62.dc028cbe.js",
    "revision": "2f3019515780d53c60edeac74c942ccf"
  },
  {
    "url": "assets/js/63.022fc50f.js",
    "revision": "1fe3fc97ef85971bdcd634c7cea246b3"
  },
  {
    "url": "assets/js/64.0a5877d8.js",
    "revision": "33b5bd34cde806915eed2f8d2432df77"
  },
  {
    "url": "assets/js/65.dde3838f.js",
    "revision": "1f360a474c245a893f1f16db16fc3a37"
  },
  {
    "url": "assets/js/66.e06d3d2e.js",
    "revision": "672de927cef9921a9dcb6f4078d746f1"
  },
  {
    "url": "assets/js/67.f1ad3a31.js",
    "revision": "f7289df3d44a1cc8b423b2ef24a0b391"
  },
  {
    "url": "assets/js/68.65abea60.js",
    "revision": "5bc860e9dcbce3dffb2da3ab282c5411"
  },
  {
    "url": "assets/js/69.02716b43.js",
    "revision": "0dd52e6b5b9c5eb499058f2b542997f1"
  },
  {
    "url": "assets/js/7.0157fc4e.js",
    "revision": "21c3d164a1d763bc7aab4447e22cf9cb"
  },
  {
    "url": "assets/js/70.f781b86d.js",
    "revision": "4b615a8b8f4dc6460d778eec86302b5a"
  },
  {
    "url": "assets/js/71.d5b39c47.js",
    "revision": "06aac50aa9980dd6df7cf50a210cf530"
  },
  {
    "url": "assets/js/72.60f363dc.js",
    "revision": "6c850a1312509d4713ee445d8648bec2"
  },
  {
    "url": "assets/js/73.ac8c6475.js",
    "revision": "239abf695fac69f1cf807d0b20de17b0"
  },
  {
    "url": "assets/js/74.5e8e93fa.js",
    "revision": "eeb2dd1b115f4677aa59867ea7a3a30c"
  },
  {
    "url": "assets/js/75.327470fd.js",
    "revision": "76f54e7c9a9c5efcbf898b4ed888b3df"
  },
  {
    "url": "assets/js/76.e07bf09f.js",
    "revision": "be2f26b493030cc669196f3b4e2107a2"
  },
  {
    "url": "assets/js/77.aba39a84.js",
    "revision": "87a78ead3e7b8e8404e66fbc95c0ab94"
  },
  {
    "url": "assets/js/78.2723d6fd.js",
    "revision": "4e0c3511844e4bfe247fc80289c0233e"
  },
  {
    "url": "assets/js/79.2e4c5573.js",
    "revision": "e4344bc9e5061c90b5be9f41197ae4de"
  },
  {
    "url": "assets/js/8.ad5aa58e.js",
    "revision": "6aac009645fed71247f4f53c00a6ea80"
  },
  {
    "url": "assets/js/80.f1089775.js",
    "revision": "668942fbd03c72e40824f6a79d7d863a"
  },
  {
    "url": "assets/js/81.9b36969a.js",
    "revision": "46be1294006d7c87641147fd6d1d8bc5"
  },
  {
    "url": "assets/js/82.0449079c.js",
    "revision": "82ac371516ec166cc106e20e84bad70f"
  },
  {
    "url": "assets/js/83.5f3e1b56.js",
    "revision": "590d8f272e25e3463df79a27699eee8d"
  },
  {
    "url": "assets/js/84.59d585eb.js",
    "revision": "34baab2481d26ab8e70686f691ee7ead"
  },
  {
    "url": "assets/js/85.6d6aade3.js",
    "revision": "4c61a6cfbddc09dd8bbf3f53c82e05ca"
  },
  {
    "url": "assets/js/86.a977c859.js",
    "revision": "b6c4a47ff35debc615f9c3d8e21f14c2"
  },
  {
    "url": "assets/js/87.21877313.js",
    "revision": "3ca5293b5f3a956c3e7e8e2a0a61a77f"
  },
  {
    "url": "assets/js/88.5a0e6264.js",
    "revision": "09d902be54f9b8f1b30a1ee4d5740dd1"
  },
  {
    "url": "assets/js/89.0aede988.js",
    "revision": "8115843dbe2711637142ec7ba632d36b"
  },
  {
    "url": "assets/js/9.a30036a6.js",
    "revision": "6f54ac638b2c3639d16edf85355e7f62"
  },
  {
    "url": "assets/js/90.6cb22ef8.js",
    "revision": "066cedfac038b3e33b9e9993c9db135f"
  },
  {
    "url": "assets/js/91.485da25d.js",
    "revision": "0d0266abf2563b4ec41423e526baaff7"
  },
  {
    "url": "assets/js/92.657ff69a.js",
    "revision": "df668f2965df0dc118d38d54b473b811"
  },
  {
    "url": "assets/js/93.daf7c9e0.js",
    "revision": "9ba39539458eb816dbd764c33df811a1"
  },
  {
    "url": "assets/js/94.f086b712.js",
    "revision": "546bd26ee531f5c3f29757862f78a3cc"
  },
  {
    "url": "assets/js/95.b9b1ab2b.js",
    "revision": "6157bc9c8ba3b358ac04dff3417b40cc"
  },
  {
    "url": "assets/js/96.bac9db28.js",
    "revision": "9979ebc01fdaf9fc96f57acf3d15b281"
  },
  {
    "url": "assets/js/97.3cce79b8.js",
    "revision": "537d77a5919a51970c22358c9fdac025"
  },
  {
    "url": "assets/js/98.d6734bd1.js",
    "revision": "1dcc2075ac7088bcb2d75183d1e87d7f"
  },
  {
    "url": "assets/js/99.744f482c.js",
    "revision": "8c2ab204298f1bff771275c097972d9f"
  },
  {
    "url": "assets/js/app.bd12bdeb.js",
    "revision": "3be49c469de0144473184a54659627fd"
  },
  {
    "url": "drills/10chain_gtr_nov_2.html",
    "revision": "bccef16eb23376738dc587179d251e0f"
  },
  {
    "url": "drills/10chain_lshape_nov2.html",
    "revision": "e5eb3905f8b4dba2994fa9e4ee24f8a2"
  },
  {
    "url": "drills/10chain_yayoi_nov2.html",
    "revision": "2fffb5701f1674189491fd29d6577805"
  },
  {
    "url": "drills/11chain_gtr_b_nov_2.html",
    "revision": "b44881d7d64b156a65640be9ed4fc943"
  },
  {
    "url": "drills/11chain_gtr_nov_2.html",
    "revision": "5ef49e2394b12b2ba48d640e99aa5137"
  },
  {
    "url": "drills/11chain_lshape_nov2.html",
    "revision": "40ca73c45754477b57195d0e82dd0e7a"
  },
  {
    "url": "drills/11chain_stairs_nov2.html",
    "revision": "9bebb72cb6c5ece550cd8046665da3fb"
  },
  {
    "url": "drills/12chain_gtr_nov_2.html",
    "revision": "4088b628d89bb97f56432daebc728119"
  },
  {
    "url": "drills/12chain_lshape_nov2.html",
    "revision": "663b7a470a223e826ccc971276da28b4"
  },
  {
    "url": "drills/12chain_tanakaspecial_nov2.html",
    "revision": "689791879020cd5b13ca7b563679c34c"
  },
  {
    "url": "drills/13chain_gtr_nov_2.html",
    "revision": "afec6f172b1f8ee9e3d75e744ad8bafb"
  },
  {
    "url": "drills/13chain_yayoi_nov2.html",
    "revision": "bd2fb446ce4f02d44982b2107a9c6f11"
  },
  {
    "url": "drills/14chain_gtr_cushion_nov_2.html",
    "revision": "4c7a330fc2c30ff927c595041245410f"
  },
  {
    "url": "drills/14chain_gtr_nov_2.html",
    "revision": "b266767cf66be5355e097f73dcb6dd5d"
  },
  {
    "url": "drills/14chain_newgtr_nov_2.html",
    "revision": "7b829f6bb030055396708f204170c5c8"
  },
  {
    "url": "drills/14chain_sandwich_nov2.html",
    "revision": "10fe153ad576e776356f2eb934a11868"
  },
  {
    "url": "drills/4chain_tanakaspecial_nov2.html",
    "revision": "81f0932fb3ffe3a44664716470351f66"
  },
  {
    "url": "drills/5chain_stairs_nov2.html",
    "revision": "4b459916cf5cef218e30d7dbf56e2646"
  },
  {
    "url": "drills/6chain_3columnavalanche_nov2.html",
    "revision": "9fda76b229c14ddde85c8a957793d1f2"
  },
  {
    "url": "drills/7chain_gtr_nov_2.html",
    "revision": "46effe8fa35857b9d474e56b5cfd5fcf"
  },
  {
    "url": "drills/8chain_avalanche_b_nov2.html",
    "revision": "6e2a598f0f7fde61112187b1ea4ff04e"
  },
  {
    "url": "drills/8chain_avalanche_nov2.html",
    "revision": "a376f2804876ae20a8b1193148df12ee"
  },
  {
    "url": "drills/8chain_sandwich_b_nov2.html",
    "revision": "ab2632bd39a995cb09a5351d1d7dcd77"
  },
  {
    "url": "drills/8chain_sandwich_lshape_nov2.html",
    "revision": "5285c9e839699373123dc158115285b3"
  },
  {
    "url": "drills/8chain_sandwich_nov2.html",
    "revision": "bff44be7e2fc6a537947cef983885357"
  },
  {
    "url": "drills/8chain_yayoi_nov2.html",
    "revision": "26672154d9ff3f04e3c79d8017c0cb93"
  },
  {
    "url": "drills/9chain_fukigen_gtr_nov_2.html",
    "revision": "30003375126fe5bf1d9208169f34bb0a"
  },
  {
    "url": "drills/9chain_lshape_nov2.html",
    "revision": "1f90e9fad238c6ae462384cdd2622dfc"
  },
  {
    "url": "drills/9chain_sandwich_nov2.html",
    "revision": "4a14fbe248df3b7dff1fac38eecd666a"
  },
  {
    "url": "drills/basics/2chain_b.html",
    "revision": "68a2627d74341ac3dfbc94f36c8e330a"
  },
  {
    "url": "drills/basics/3chain_lshape_a.html",
    "revision": "f85c9a71b9a14ed6a604e89c37afe19c"
  },
  {
    "url": "drills/basics/3chain_stairs_a.html",
    "revision": "7e433aa5bb9ced53f3a41e004e6a71a9"
  },
  {
    "url": "drills/basics/4chain_yayoi_a.html",
    "revision": "698f616518abbed5fa0ee451be114a27"
  },
  {
    "url": "drills/basics/6chain_a.html",
    "revision": "1f066ad512f6426583d9a76274b88172"
  },
  {
    "url": "drills/chainrecord.html",
    "revision": "2e9bdd46b7edb2630b62dd409676585f"
  },
  {
    "url": "drills/drill_loader_manual_seed.html",
    "revision": "4026aa05cfbc692a621b359d666819bb"
  },
  {
    "url": "drills/drill_loader.html",
    "revision": "f5852ea94fe334c0f1b2b428a64d6f53"
  },
  {
    "url": "drills/gtr/14chain_a.html",
    "revision": "a5b5ccf62a3b12129a02884f3276adce"
  },
  {
    "url": "drills/index.html",
    "revision": "6de8c90b3c974192c2ace843d9cc6fae"
  },
  {
    "url": "drills/lshape/2chain_a.html",
    "revision": "112bd2ad8cd83ec50f531d97b1d828c3"
  },
  {
    "url": "drills/lshape/4chain_a.html",
    "revision": "31b0f8c72251bb249a09e4f89c45455e"
  },
  {
    "url": "drills/lshape/6chain_a.html",
    "revision": "28fcec9b10cc3fb735ac959c69182cd5"
  },
  {
    "url": "drills/playermade/ddrdan_1.html",
    "revision": "75f5f4fe9846f0d1d3f8a9a696616be8"
  },
  {
    "url": "drills/playermade/histy_1.html",
    "revision": "ad1c031af40501fc455d1ea07c879ec9"
  },
  {
    "url": "drills/playermade/histy_nov2/chain1_stairs.html",
    "revision": "7235f37de5f7e6be820cbb524d592714"
  },
  {
    "url": "drills/playermade/histy_nov2/chain10_sandwich.html",
    "revision": "afb9f83219336ae3a8ccb0350deb3737"
  },
  {
    "url": "drills/playermade/histy_nov2/chain11_sandwich.html",
    "revision": "d95daf33adcc913552d03532f28f260d"
  },
  {
    "url": "drills/playermade/histy_nov2/chain12_avalanche.html",
    "revision": "959e6d8e57b3241be2338e851e809d53"
  },
  {
    "url": "drills/playermade/histy_nov2/chain13_flat.html",
    "revision": "e795db5ebfb66215b4a602f36512bd97"
  },
  {
    "url": "drills/playermade/histy_nov2/chain14_lshape.html",
    "revision": "0bf819ce421e79363deda643deb435f9"
  },
  {
    "url": "drills/playermade/histy_nov2/chain15_sandwich.html",
    "revision": "326e26447b919b3af0e14850dde6d00c"
  },
  {
    "url": "drills/playermade/histy_nov2/chain16_.html",
    "revision": "c374baded89f3bb5f9144f2a3a6d85c7"
  },
  {
    "url": "drills/playermade/histy_nov2/chain17_kumastacking.html",
    "revision": "e9c2be51def9619b8e3a276623b95358"
  },
  {
    "url": "drills/playermade/histy_nov2/chain18_flat.html",
    "revision": "e62f3ea764e9bf7cea43a58b08b9d34a"
  },
  {
    "url": "drills/playermade/histy_nov2/chain19_sandwich.html",
    "revision": "66edd929fe31c2010f591712bde7b58a"
  },
  {
    "url": "drills/playermade/histy_nov2/chain2_sandwich.html",
    "revision": "bff7a11c7651b5643b8d242b459a0072"
  },
  {
    "url": "drills/playermade/histy_nov2/chain20_kumastacking.html",
    "revision": "f3420a8b5be2d20047d361bbd2a6e67f"
  },
  {
    "url": "drills/playermade/histy_nov2/chain3_gtr.html",
    "revision": "a766d05b4ac9afe3bb2e9f0789e4d872"
  },
  {
    "url": "drills/playermade/histy_nov2/chain4_flat.html",
    "revision": "4eaf029d410ebdf87f80a641c8bf9fad"
  },
  {
    "url": "drills/playermade/histy_nov2/chain5_gtr.html",
    "revision": "25ddd9083381777c2207ce8cfead0fe8"
  },
  {
    "url": "drills/playermade/histy_nov2/chain6_sandwich.html",
    "revision": "c1e90b1ba752afa0a6dbee40ebee4d34"
  },
  {
    "url": "drills/playermade/histy_nov2/chain7_gtrlong.html",
    "revision": "480578c8734d81f214afe31bd42ca716"
  },
  {
    "url": "drills/playermade/histy_nov2/chain8_gtr.html",
    "revision": "7e87a98043605e77d08c2c200e4e82ed"
  },
  {
    "url": "drills/playermade/histy_nov2/chain9_lshape.html",
    "revision": "16029184dcb204ac7d7ceee4771900ba"
  },
  {
    "url": "drills/playermade/lon_1.html",
    "revision": "8bbe93e5e6b7c9684f484549bccac5c6"
  },
  {
    "url": "drills/playermade/pyrojay_1.html",
    "revision": "43bc634bc05015daa31979d3c3010aa2"
  },
  {
    "url": "drills/playermade/raikon_1.html",
    "revision": "bf2b8687bf3daf750bfac8692d6130fd"
  },
  {
    "url": "drills/playermade/shiningbolt_1.html",
    "revision": "e5ba920a6d447c2f414881eb9aa8c8a2"
  },
  {
    "url": "drills/playermade/yoshi100_1.html",
    "revision": "42f00fec0d994321b68a59710d83146b"
  },
  {
    "url": "drills/sandwich/6chain_a.html",
    "revision": "1218916f2dbde606c918333bc017f9c1"
  },
  {
    "url": "drills/stairs/5chain_a.html",
    "revision": "369ce8d77b4b785f30c741cbe4efa3df"
  },
  {
    "url": "drills/stairs/8chain_a.html",
    "revision": "dce8ff546dac5d5099d048174bb428d8"
  },
  {
    "url": "drills/tailing/10chain_3columnavalanche_a.html",
    "revision": "a9baa4ac33313a9924056969147b1f6e"
  },
  {
    "url": "drills/tailing/11chain_a.html",
    "revision": "737cbbe60674a1fe32808abffb0c57a6"
  },
  {
    "url": "drills/tailing/4chain_kumastacking_a.html",
    "revision": "91ca0aca752df2d723cfb02f74b38dbc"
  },
  {
    "url": "esports/index.html",
    "revision": "e51d6fac6cca8010d96265229c7fdda2"
  },
  {
    "url": "esports/overview.html",
    "revision": "e5837cff7c645af59f69b41a70067987"
  },
  {
    "url": "esports/translation/menus.html",
    "revision": "9b812cc67530f12203f2f8a297441e5a"
  },
  {
    "url": "esports/translation/purchasing.html",
    "revision": "a32cfb78c0c7398c4785a4f547c21f2c"
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
    "url": "img/popups.png",
    "revision": "75f801fd93be616435f06ee77ad2a926"
  },
  {
    "url": "img/puyo_aqua.png",
    "revision": "7604706d63d5726a60e702dcb2ea50c3"
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
    "revision": "b7810573ffa321d190a2ea39b617befd"
  },
  {
    "url": "js/bezier-easing.js",
    "revision": "d517904ce25afdd4f349399e431428db"
  },
  {
    "url": "js/pixi.min.js",
    "revision": "be073d522ac1b9f65d61e89ac824ad72"
  },
  {
    "url": "settings/settings.html",
    "revision": "fba566aa70fab6c09823cc046be8f87e"
  },
  {
    "url": "streamers/caneofpacci.html",
    "revision": "d055873d79986a9cac16363c59a153b5"
  },
  {
    "url": "streamers/index.html",
    "revision": "a75cba04708a912d9e2fed8129cab057"
  },
  {
    "url": "streamers/raikon.html",
    "revision": "e71de67d69e44e0d8626371510f92784"
  },
  {
    "url": "streamers/shiro.html",
    "revision": "10d553700b4567506ab5c1235ef3372d"
  },
  {
    "url": "streamers/yoshi100.html",
    "revision": "3469199d78f97a4fed51a15a5bc9defc"
  },
  {
    "url": "tutorial/basics.html",
    "revision": "1e769955f6bdaa8a642f9915392316ac"
  },
  {
    "url": "tutorial/gamescreen.html",
    "revision": "895030dd00d9d084ebe0e881994849df"
  },
  {
    "url": "tutorial/index.html",
    "revision": "57b8c6ca54e0ec513eb889ee829ffd6b"
  },
  {
    "url": "tutorial/stairs.html",
    "revision": "0845d203fe1ca3a182d6451eec29f359"
  },
  {
    "url": "tutorial/test2.html",
    "revision": "1785cb6fdfd9378624caf7efe529623d"
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
