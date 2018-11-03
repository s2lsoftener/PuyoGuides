(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{149:function(t,e,i){},174:function(t,e){var i=function(t){void 0==t&&(t=(new Date).getTime()),this.N=624,this.M=397,this.MATRIX_A=2567483615,this.UPPER_MASK=2147483648,this.LOWER_MASK=2147483647,this.mt=new Array(this.N),this.mti=this.N+1,t.constructor==Array?this.init_by_array(t,t.length):this.init_seed(t)};i.prototype.init_seed=function(t){for(this.mt[0]=t>>>0,this.mti=1;this.mti<this.N;this.mti++){t=this.mt[this.mti-1]^this.mt[this.mti-1]>>>30;this.mt[this.mti]=(1812433253*((4294901760&t)>>>16)<<16)+1812433253*(65535&t)+this.mti,this.mt[this.mti]>>>=0}},i.prototype.init_by_array=function(t,e){var i,n,s;for(this.init_seed(19650218),i=1,n=0,s=this.N>e?this.N:e;s;s--){var a=this.mt[i-1]^this.mt[i-1]>>>30;this.mt[i]=(this.mt[i]^(1664525*((4294901760&a)>>>16)<<16)+1664525*(65535&a))+t[n]+n,this.mt[i]>>>=0,n++,++i>=this.N&&(this.mt[0]=this.mt[this.N-1],i=1),n>=e&&(n=0)}for(s=this.N-1;s;s--){a=this.mt[i-1]^this.mt[i-1]>>>30;this.mt[i]=(this.mt[i]^(1566083941*((4294901760&a)>>>16)<<16)+1566083941*(65535&a))-i,this.mt[i]>>>=0,++i>=this.N&&(this.mt[0]=this.mt[this.N-1],i=1)}this.mt[0]=2147483648},i.prototype.random_int=function(){var t,e=new Array(0,this.MATRIX_A);if(this.mti>=this.N){var i;for(this.mti==this.N+1&&this.init_seed(5489),i=0;i<this.N-this.M;i++)t=this.mt[i]&this.UPPER_MASK|this.mt[i+1]&this.LOWER_MASK,this.mt[i]=this.mt[i+this.M]^t>>>1^e[1&t];for(;i<this.N-1;i++)t=this.mt[i]&this.UPPER_MASK|this.mt[i+1]&this.LOWER_MASK,this.mt[i]=this.mt[i+(this.M-this.N)]^t>>>1^e[1&t];t=this.mt[this.N-1]&this.UPPER_MASK|this.mt[0]&this.LOWER_MASK,this.mt[this.N-1]=this.mt[this.M-1]^t>>>1^e[1&t],this.mti=0}return t=this.mt[this.mti++],t^=t>>>11,t^=t<<7&2636928640,t^=t<<15&4022730752,(t^=t>>>18)>>>0},i.prototype.random_int31=function(){return this.random_int()>>>1},i.prototype.random_incl=function(){return this.random_int()*(1/4294967295)},i.prototype.random=function(){return this.random_int()*(1/4294967296)},i.prototype.random_excl=function(){return(this.random_int()+.5)*(1/4294967296)},i.prototype.random_long=function(){return(67108864*(this.random_int()>>>5)+(this.random_int()>>>6))*(1/9007199254740992)},t.exports=i},175:function(t,e,i){"use strict";var n=i(149);i.n(n).a},195:function(t,e,i){"use strict";i.r(e);var n=i(185),s=i(174),a={name:"GameSlides",props:["jsonFileToLoad","useRandomSeed","useManualData","manualData","replay"],components:{ChainDrillMaker:n.default},data:function(){return{slideshowSlide:0,jsonLoaded:!1,importedData:void 0,mersenneData:"",seed:645,editText:!0,slideText:"OK",renderGame:!0,inputtingText:!1,gameTitle:"",chainType:""}},created:function(){!0===this.useRandomSeed&&(this.seed=Math.round(65535*Math.random())),!0===this.useManualData&&(this.manualData.nextQueue=this.manualData.nextQueue+=this.generatedNextQueue.nextQueue,this.manualData.seed=this.generatedNextQueue.seed),this.mersenneData=this.generatedNextQueue,this.setJSON()},methods:{loadJSON:function(t){var e;e=void 0===this.jsonFileToLoad?"default.json":this.jsonFileToLoad;var i=new XMLHttpRequest;i.overrideMimeType("application/json"),i.open("GET","/chain_json/".concat(e),!0),i.onreadystatechange=function(){4==i.readyState&&"200"==i.status&&t(i.responseText)},i.send(null)},setJSON:function(){var t=this;this.loadJSON(function(e){t.importedData=JSON.parse(e),t.jsonLoaded=!0,console.log("JSON loaded!")})},updateSlideText:function(t){this.slideText=t},reloadGame:function(t){var e=this,i=JSON.parse(t);this.renderGame=!1,this.importedData=i,this.mersenneData={seed:i.next.seed,nextQueue:i.next.nextQueue},setTimeout(function(){e.renderGame=!0},100)}},computed:{puyoGenerator:function(){return new s(this.seed)},generatedNextQueue:function(){var t=[],e=5*this.puyoGenerator.random();t=e<=1?["R","G","B","Y"]:e<=2?["P","G","B","Y"]:e<=3?["R","P","B","Y"]:e<=4?["R","G","P","Y"]:["R","G","B","P"];for(var i=[],n=3;n>=0;n--){var s=Math.floor(this.puyoGenerator.random_excl()*(n+1));i.push(t[s]),t.splice(s,1)}console.log(i);for(var a="",o=0;o<512;o++)a+=o<4?i[Math.floor(3*this.puyoGenerator.random_excl())]:i[Math.floor(4*this.puyoGenerator.random_excl())];return{seed:this.seed,nextQueue:a}}}},o=(i(175),i(1)),r=Object(o.a)(a,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"slideshow-wrapper"}},[i("div",{attrs:{id:"slideshow"}},[i("div",{staticClass:"chainsim-container"},[t.jsonLoaded?i("chain-drill-maker",{attrs:{importedData:t.importedData,manualData:t.manualData,mersenneData:t.mersenneData,useRandomSeed:t.useRandomSeed,useManualData:t.useManualData,slideText:t.slideText,replay:t.replay,inputtingText:t.inputtingText,gameTitle:t.gameTitle,chainType:t.chainType},on:{"change-comment-input":t.updateSlideText,reload:t.reloadGame}}):t._e()],1),t._v(" "),i("div",{staticClass:"text-container"},[i("div",{staticClass:"slide-controls"}),t._v(" "),void 0===t.replay||!1===t.replay?i("div",{staticClass:"slide-text",on:{mouseover:function(e){t.inputtingText=!0},mouseout:function(e){t.inputtingText=!1}}},[t._v("\n        Title: "),!1===t.replay?i("input",{directives:[{name:"model",rawName:"v-model",value:t.gameTitle,expression:"gameTitle"}],domProps:{value:t.gameTitle},on:{input:function(e){e.target.composing||(t.gameTitle=e.target.value)}}}):t._e()]):t._e(),t._v(" "),void 0===t.replay||!1===t.replay?i("div",{staticClass:"slide-text",on:{mouseover:function(e){t.inputtingText=!0},mouseout:function(e){t.inputtingText=!1}}},[t._v("\n        Type: "),i("select",{directives:[{name:"model",rawName:"v-model",value:t.chainType,expression:"chainType"}],on:{change:function(e){var i=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.chainType=e.target.multiple?i:i[0]}}},[i("option",{attrs:{disabled:"",value:""}},[t._v("Please select one")]),t._v(" "),i("option",[t._v("playermade")]),t._v(" "),i("option",[t._v("basics")]),t._v(" "),i("option",[t._v("stairs")]),t._v(" "),i("option",[t._v("sandwich")]),t._v(" "),i("option",[t._v("lshape")]),t._v(" "),i("option",[t._v("tailing")]),t._v(" "),i("option",[t._v("gtr")]),t._v(" "),i("option",[t._v("newgtr")]),t._v(" "),i("option",[t._v("yayoi")]),t._v(" "),i("option",[t._v("flatstacking")]),t._v(" "),i("option",[t._v("fukigen")]),t._v(" "),i("option",[t._v("other")])])]):t._e(),t._v(" "),void 0===t.replay||!1===t.replay?i("div",{staticClass:"slide-text",on:{mouseover:function(e){t.inputtingText=!0},mouseout:function(e){t.inputtingText=!1}}},[t._v("\n        Write a helpful hint.\n        "),i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.slideText,expression:"slideText"}],attrs:{rows:"20",cols:"30"},domProps:{value:t.slideText},on:{input:function(e){e.target.composing||(t.slideText=e.target.value)}}})]):t._e(),t._v(" "),!0===t.replay?i("div",{staticClass:"slide-text",on:{mouseover:function(e){t.inputtingText=!0},mouseout:function(e){t.inputtingText=!1}}},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.slideText,expression:"slideText"}],attrs:{rows:"20",cols:"30",readonly:""},domProps:{value:t.slideText},on:{input:function(e){e.target.composing||(t.slideText=e.target.value)}}})]):t._e()])])])},[],!1,null,"df4a0796",null);r.options.__file="GameSlides.vue";e.default=r.exports}}]);