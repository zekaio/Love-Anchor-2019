(function(t){function e(e){for(var r,a,u=e[0],c=e[1],s=e[2],l=0,f=[];l<u.length;l++)a=u[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&f.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);p&&p(e);while(f.length)f.shift()();return i.push.apply(i,s||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,a=1;a<n.length;a++){var u=n[a];0!==o[u]&&(r=!1)}r&&(i.splice(e--,1),t=c(c.s=n[0]))}return t}var r={},a={app:0},o={app:0},i=[];function u(t){return c.p+"js/"+({about:"about"}[t]||t)+"."+{about:"9f5855c1"}[t]+".js"}function c(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(t){var e=[],n={about:1};a[t]?e.push(a[t]):0!==a[t]&&n[t]&&e.push(a[t]=new Promise((function(e,n){for(var r="css/"+({about:"about"}[t]||t)+"."+{about:"c4455b9e"}[t]+".css",o=c.p+r,i=document.getElementsByTagName("link"),u=0;u<i.length;u++){var s=i[u],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===o))return e()}var f=document.getElementsByTagName("style");for(u=0;u<f.length;u++){s=f[u],l=s.getAttribute("data-href");if(l===r||l===o)return e()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=e,p.onerror=function(e){var r=e&&e.target&&e.target.src||o,i=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete a[t],p.parentNode.removeChild(p),n(i)},p.href=o;var d=document.getElementsByTagName("head")[0];d.appendChild(p)})).then((function(){a[t]=0})));var r=o[t];if(0!==r)if(r)e.push(r[2]);else{var i=new Promise((function(e,n){r=o[t]=[e,n]}));e.push(r[2]=i);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=u(t);var f=new Error;s=function(e){l.onerror=l.onload=null,clearTimeout(p);var n=o[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src;f.message="Loading chunk "+t+" failed.\n("+r+": "+a+")",f.name="ChunkLoadError",f.type=r,f.request=a,n[1](f)}o[t]=void 0}};var p=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(e)},c.m=t,c.c=r,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)c.d(n,r,function(e){return t[e]}.bind(null,r));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/",c.oe=function(t){throw console.error(t),t};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var f=0;f<s.length;f++)e(s[f]);var p=l;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var r=n("85ec"),a=n.n(r);a.a},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("transition",{attrs:{name:t.transitionName}},[n("router-view")],1)],1)},o=[],i=(n("ac1f"),n("1276"),{data:function(){return{transitionName:"slide-right"}},watch:{$route:function(t,e){var n=t.path.split("/").length,r=e.path.split("/").length;this.transitionName=n<r?"slide-right":"slide-left"}},mounted:function(){}}),u=i,c=(n("034f"),n("2877")),s=Object(c["a"])(u,a,o,!1,null,null,null),l=s.exports,f=(n("d3b7"),n("8c4f")),p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"home"}},[n("div",{attrs:{id:"title"}}),n("h1",{staticClass:"title"},[t._v("这里是爱上你主播大赛投票通道")]),n("h2",{staticClass:"title"},[t._v("你的投票对选手们至关重要")]),n("h3",{staticClass:"title"},[t._v("快去给心仪选手投票打call吧！")]),n("div",{attrs:{id:"left"}}),n("h3",{staticClass:"title"},[t._v("每天可以投一票哦~")]),n("div",{attrs:{id:"change"}},[n("router-link",{staticClass:"changepage",attrs:{to:"/votepage"}},[t._v("去投票")])],1),n("div",{attrs:{id:"bottom"}})])},d=[],h={name:"home",mounted:function(){}},v=h,m=(n("da81"),Object(c["a"])(v,p,d,!1,null,"795cecb8",null)),b=m.exports;r["a"].use(f["a"]);var g=[{path:"/",name:"home",component:b},{path:"/votepage",name:"votepage",component:function(){return n.e("about").then(n.bind(null,"58d2"))}},{path:"/alert",name:"alert",component:function(){return n.e("about").then(n.bind(null,"475a"))}}],y=new f["a"]({routes:g}),w=y,_=n("bc3a"),O=n.n(_);r["a"].prototype.axios=O.a,O.a.defaults.timeout=3e4,r["a"].config.productionTip=!1,new r["a"]({router:w,render:function(t){return t(l)}}).$mount("#app")},"59b9":function(t,e,n){},"85ec":function(t,e,n){},da81:function(t,e,n){"use strict";var r=n("59b9"),a=n.n(r);a.a}});
//# sourceMappingURL=app.3c46b024.js.map