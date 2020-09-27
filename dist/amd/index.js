var __awaiter=this&&this.__awaiter||function(e,n,t,o){return new(t||(t=Promise))(function(r,i){function s(e){try{a(o.next(e))}catch(e){i(e)}}function d(e){try{a(o.throw(e))}catch(e){i(e)}}function a(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t(function(e){e(n)})).then(s,d)}a((o=o.apply(e,n||[])).next())})};define("index",["require","exports","named-logs"],function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.WalletConnectModuleLoader=void 0;const o=t.logs("web3w-walletconnect:index");let r;const i={1:{host:"mainnet",networkName:"Main Ethereum Network"},3:{host:"ropsten",networkName:"Ropsten Test Network"},4:{host:"rinkeby",networkName:"Rinkeby Test Network"},5:{host:"goerli",networkName:"Goerli Test Network"},42:{host:"kovan",networkName:"Kovan Test Network"}};class s{constructor(e){this.id="walletconnect",this.infuraId=e&&e.infuraId,this.nodeUrl=e&&e.nodeUrl,this.chainId=e&&e.chainId}setup(e){return __awaiter(this,void 0,void 0,function*(){e=e||{};let{chainId:n,nodeUrl:t}=e;if(n=n||this.chainId,(t=t||this.nodeUrl)&&!n){o.log("no chanId provided but nodeUrl, fetching chainId...");const e=yield fetch(t,{headers:{"content-type":"application/json; charset=UTF-8"},body:JSON.stringify({id:Math.floor(1e6*Math.random()),jsonrpc:"2.0",method:"eth_chainId",params:[]}),method:"POST"}),r=yield e.json();n=parseInt(r.result.slice(2),16).toString(),o.log({chainId:n})}if(!n)throw new Error("chainId missing");const s=parseInt(n),d=i[n];let a;return this.infuraId&&d?(o.log(`known network, using infuraId: ${this.infuraId}`),a={infuraId:this.infuraId}):(o.log(`unknown network, using nodeUrl: ${t}`),a={rpc:{[s]:t}}),this.walletConnectProvider=new r(a),yield this.walletConnectProvider.enable(),window.walletConnectProvider=this.walletConnectProvider,{web3Provider:this.walletConnectProvider,chainId:n}})}logout(){return Promise.resolve()}disconnect(){this.walletConnectProvider.close(),this.walletConnectProvider=void 0,window.walletConnectProvider=void 0}isLoggedIn(){return __awaiter(this,void 0,void 0,function*(){return!0})}}class d{constructor(e){this.id="walletconnect",this.moduleConfig=e}static setJsURL(e,n){if(d._jsURLUsed)throw new Error("cannot change js url once used");d._jsURL=e,d._jsURLIntegrity=n}load(){return __awaiter(this,void 0,void 0,function*(){if(!r){const e=d._jsURL,n=d._jsURLIntegrity;d._jsURLUsed=!0;try{o.log(`loading ${e}...`),yield function(e,n,t){return new Promise(function(o,r){const i=document.createElement("script");i.type="text/javascript",i.src=e,n&&(i.integrity=n),t&&(i.crossOrigin=t),i.onload=i.onreadystatechange=function(){o()},i.onerror=function(){r()},document.head.appendChild(i)})}(e,n,"anonymous")}catch(e){throw o.error("error loading",e),d._jsURLUsed=!1,e}r=window.WalletConnectProvider.default,o.log("WalletConnectProvider Module",window.WalletConnectProvider)}return new s(this.moduleConfig)})}}n.WalletConnectModuleLoader=d,d._jsURL="https://cdn.jsdelivr.net/npm/@walletconnect/web3-provider@1.2.2/dist/umd/index.min.js",d._jsURLUsed=!1});