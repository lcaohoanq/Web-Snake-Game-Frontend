if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,t)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let d={};const l=e=>a(e,r),n={module:{uri:r},exports:d,require:l};s[r]=Promise.all(i.map((e=>n[e]||l(e)))).then((e=>(t(...e),d)))}}define(["./workbox-9a84fccb"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/images/apple.png",revision:"ad32731fce215f48c3f1a92e84946737"},{url:"assets/images/dot.png",revision:"cf3d9af9d52baafde152ce2d03baf819"},{url:"assets/images/favicon.ico",revision:"643e0a6a8773704cab8ba1079a49713c"},{url:"assets/images/head.png",revision:"937774e6be562fb2cbe8167598dbf1d6"},{url:"assets/images/logo.png",revision:"1ce5b44708093ddb4121cf3a1ea3a8bf"},{url:"assets/images/wall.png",revision:"7ea48c46561e9dfec9d039d3fb6494ef"},{url:"assets/sounds/bigAppleApp.wav",revision:"c85a464195a3d023a025b8674d7032fa"},{url:"assets/sounds/bigAppleDis.wav",revision:"b64cd633e77746daa847f8ecc6081d2f"},{url:"assets/sounds/eating.wav",revision:"d6fa989d000f481d77e39dae815fd3c0"},{url:"assets/sounds/eating2.wav",revision:"6b3bf66cff510de30e438a1669882515"},{url:"assets/sounds/gameover.wav",revision:"51ca184796f71ce4fd0d583412430d38"},{url:"assets/sounds/intro.wav",revision:"655c9545a3c04578ed36a37738730ee8"},{url:"components/button/button.html",revision:"64a63379238a3d59b33952feb0506246"},{url:"index.html",revision:"ad5988216b3c5b4a2ac4917c013f5968"},{url:"main.css",revision:"54c1d4ce7bf0edf7d3095d043b746dbd"},{url:"main.js",revision:"f2f6927132b435ed3032cd1bfcf4ef59"},{url:"templates/apartment.html",revision:"fe16a161cc9e1eaed06f81dce83b2aaf"},{url:"templates/box.html",revision:"47d2500130498392f7a1bbd31376f16a"},{url:"templates/campaign.html",revision:"774fc0036103415949d57e1113064cef"},{url:"templates/forgotPassword.html",revision:"d5580cc4639dac24e32a976541c1e1fd"},{url:"templates/gameover.html",revision:"a3d4858c8dec5f5db71419d4e63125be"},{url:"templates/login.html",revision:"663d8673fb9d0e2b48d730158593a182"},{url:"templates/mill.html",revision:"f58eda80307c663ae5c236a16262f906"},{url:"templates/nomaze.html",revision:"38317c1095cc525bec52e81cf21e92df"},{url:"templates/options.html",revision:"ce0138ac30b9fdc4189e788bf5973abd"},{url:"templates/rails.html",revision:"0e28029b8a12f419bb2d00e366a96007"},{url:"templates/register.html",revision:"d2d69c1b7884de43379e01da72395a38"},{url:"templates/tunnel.html",revision:"6804a8f8643de43ab537d95da42fb938"}],{})}));
