(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{2374:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),!function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{cancelIdleCallback:function(){return n},requestIdleCallback:function(){return r}});let r="undefined"!=typeof self&&self.requestIdleCallback&&self.requestIdleCallback.bind(window)||function(e){let t=Date.now();return self.setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)},n="undefined"!=typeof self&&self.cancelIdleCallback&&self.cancelIdleCallback.bind(window)||function(e){return clearTimeout(e)};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2714:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"setAttributesFromProps",{enumerable:!0,get:function(){return l}});let r={acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv",noModule:"noModule"},n=["onLoad","onReady","dangerouslySetInnerHTML","children","onError","strategy","stylesheets"];function a(e){return["async","defer","noModule"].includes(e)}function l(e,t){for(let[l,o]of Object.entries(t)){if(!t.hasOwnProperty(l)||n.includes(l)||void 0===o)continue;let s=r[l]||l.toLowerCase();"SCRIPT"===e.tagName&&a(s)?e[s]=!!o:e.setAttribute(s,String(o)),(!1===o||"SCRIPT"===e.tagName&&a(s)&&(!o||"false"===o))&&(e.setAttribute(s,""),e.removeAttribute(s))}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3773:(e,t,r)=>{Promise.resolve().then(r.bind(r,4807))},4807:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>p});var n=r(5155),a=r(2115),l=r(9243),o=r.n(l),s=r(9509);function i(){let[e,t]=(0,a.useState)("initial"),[r,l]=(0,a.useState)(""),[i,p]=(0,a.useState)(""),[m,h]=(0,a.useState)(""),[g,y]=(0,a.useState)(""),[b,x]=(0,a.useState)({email:"",name:"",phoneNumber:"",address:"",city:"",state:"",postalCode:""}),[j,v]=(0,a.useState)({}),[_,w]=(0,a.useState)(!1),O=()=>{let e={};return r||(e.currency="Currency is required"),i||(e.program="Program is required"),m&&"--Select A Project--"!==m||(e.project="Project is required"),console.log(e),v(e),0===Object.keys(e).length},C=()=>{"initial"===e?O()&&t("donation"):"donation"===e&&g?t("personal"):g||v({...j,amount:"Amount is required"})},N=()=>{let e={};return Object.entries(b).forEach(t=>{let[r,n]=t;n||(e[r]="".concat(r.replace(/([A-Z])/g," $1")," is required"))}),v(e),0===Object.keys(e).length},S=async()=>{O()&&g&&N()&&(console.log("Payment Process Started"),console.log(b,r),await P())},k=e=>{let{name:t,value:r}=e.target;x({...b,[t]:r})},I=async()=>{try{let e=await fetch("/api/order",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({amount:100*parseFloat(g)})});if(!e.ok)throw Error("Network response was not ok");let t=await e.json();return console.log("order id is ",t.orderId),t.orderId}catch(e){console.error("There was a problem with your fetch operation:",e)}},P=async()=>{try{let e=await I();console.log("order id is ",e);let t={key:s.env.KEY_ID,amount:100*parseFloat(g),currency:r,name:b.name,description:i,order_id:e,handler:async function(t){let r={orderCreationId:e,razorpayPaymentId:t.razorpay_payment_id,razorpayOrderId:t.razorpay_order_id,razorpaySignature:t.razorpay_signature},n=await fetch("/api/verify",{method:"POST",body:JSON.stringify(r),headers:{"Content-Type":"application/json"}}),a=await n.json();console.log(a),a.isOk?w(!0):alert(a.message)},prefill:{name:b.name,email:b.email},theme:{color:"#3399cc"}},n=new window.Razorpay(t);n.on("payment.failed",function(e){alert(e.error.description)}),n.open()}catch(e){console.log(e)}};return(0,n.jsxs)("div",{className:"max-w-lg mx-auto p-6 space-y-6 border rounded-lg shadow-lg",children:[(0,n.jsx)(o(),{id:"razorpay-checkout-js",src:"https://checkout.razorpay.com/v1/checkout.js"}),_?(0,n.jsxs)("div",{className:"flex flex-col items-center justify-center space-y-4 p-6 bg-green-100 border border-green-400 rounded-lg shadow-lg",children:[(0,n.jsx)("div",{className:"text-6xl text-green-600 animate-bounce",children:"✅"}),(0,n.jsx)("h1",{className:"text-2xl font-bold text-green-700",children:"Payment Successful!"}),(0,n.jsx)("p",{className:"text-green-600",children:"Thank you for your donation."})]}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(c,{title:"1. Initial Details",active:"initial"===e,onEdit:()=>t("initial"),children:[(0,n.jsx)(d,{label:"Choose your currency",value:r,onChange:l,options:["INR","USD","EUR"],error:j.currency}),(0,n.jsx)(d,{label:"Select a program",value:i,onChange:p,options:["Youth Development","Education"],error:j.program}),(0,n.jsx)(d,{label:"Select a project",value:m,onChange:h,options:["Project A","Project B"],error:j.project}),(0,n.jsx)(f,{onClick:C,text:"Choose an Amount →"})]}),(0,n.jsxs)(c,{title:"2. Donation Amount Details",active:"donation"===e,onEdit:()=>t("donation"),children:[(0,n.jsx)("input",{type:"number",placeholder:"Amount",value:g,onChange:e=>y(e.target.value),className:"w-full p-2 border rounded mb-2"}),j.amount&&(0,n.jsx)(u,{text:j.amount}),(0,n.jsx)(f,{onClick:C,text:"Proceed to Personal Information →"})]}),(0,n.jsxs)(c,{title:"3. Personal Information",active:"personal"===e,onEdit:()=>t("personal"),children:[Object.entries(b).map(e=>{let[t,r]=e;return(0,n.jsxs)("div",{className:"mb-2",children:[(0,n.jsx)("input",{type:"text",name:t,value:r,onChange:k,placeholder:t.replace(/([A-Z])/g," $1")+" *",className:"w-full p-2 border rounded"}),j[t]&&(0,n.jsx)(u,{text:j[t]})]},t)}),(0,n.jsx)(f,{className:"cursor-pointer",onClick:S,text:"Pay"})]})]})]})}let c=e=>{let{title:t,active:r,children:a,onEdit:l}=e;return(0,n.jsxs)("div",{className:"border rounded-lg overflow-hidden mb-4",children:[(0,n.jsxs)("div",{className:"px-4 py-2 text-lg font-semibold ".concat(r?"bg-[#e36955] text-white":"bg-gray-200"),children:[t," ",!r&&(0,n.jsx)("button",{className:"ml-2 text-sm text-blue-500",onClick:l,children:"Edit"})]}),r&&(0,n.jsx)("div",{className:"p-4 space-y-4",children:a})]})},d=e=>{let{label:t,value:r,onChange:a,options:l,error:o}=e;return(0,n.jsxs)("div",{children:[(0,n.jsxs)("label",{className:"block mb-1 font-medium",children:[t," *"]}),(0,n.jsxs)("select",{className:"w-full p-2 border rounded",value:r,onChange:e=>a(e.target.value),children:[(0,n.jsx)("option",{value:"",children:"Select"}),l.map(e=>(0,n.jsx)("option",{value:e,children:e},e))]}),o&&(0,n.jsx)(u,{text:o})]})},u=e=>{let{text:t}=e;return(0,n.jsx)("p",{className:"text-red-500 text-sm",children:t})},f=e=>{let{className:t,onClick:r,text:a}=e;return(0,n.jsx)("button",{className:"".concat(t," cursor-pointer w-full bg-[#e36955] text-white px-4 py-2 mt-4 rounded-lg hover:bg-[#e36955] transition"),onClick:r,children:a})};function p(){return(0,n.jsxs)("div",{className:"flex flex-col lg:flex-row gap-6 p-6 bg-cover bg-center min-h-screen",style:{backgroundImage:"url('/background.jpg')"},children:[(0,n.jsxs)("div",{className:"flex-1 bg-white shadow-lg rounded-lg p-6",children:[(0,n.jsx)(i,{}),(0,n.jsxs)("div",{className:"mt-4 bg-white shadow-lg rounded-lg p-6",children:[(0,n.jsx)("h2",{className:"text-lg font-semibold mb-4",children:"What does your generous donation support?"}),(0,n.jsx)("div",{className:"grid grid-cols-2 gap-4",children:[{label:"Child Development",icon:"\uD83D\uDC76"},{label:"Livelihood Support",icon:"\uD83D\uDC9C"},{label:"Quality Education",icon:"\uD83D\uDCD8"},{label:"Youth Development",icon:"\uD83E\uDDD1"},{label:"Other Projects",icon:"\uD83D\uDCCB"},{label:"Crisis Relief",icon:"\uD83D\uDEA8"}].map((e,t)=>(0,n.jsxs)("button",{className:"flex items-center justify-center gap-2 p-4 border rounded-lg  transition",children:[(0,n.jsx)("span",{children:e.icon}),(0,n.jsx)("span",{children:e.label})]},t))})]})]}),(0,n.jsxs)("div",{className:"lg:w-1/3 bg-white shadow-lg rounded-lg p-6 lg:self-start",children:[(0,n.jsx)("h2",{className:"text-lg font-semibold mb-4",children:"OTHER WAYS TO DONATE"}),["PayPal","Venmo","Zelle","Cheque","Stocks"].map((e,t)=>(0,n.jsxs)("div",{className:"flex flex-col items-center my-10 ",children:[(0,n.jsx)("button",{className:"bg-[#e36955] text-white px-10 py-2 rounded",children:e}),t<3&&(0,n.jsx)("img",{src:"frame.png",alt:"".concat(e," QR"),className:"w-64 h-64"})]},t))]})]})}},9243:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),!function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return b},handleClientScriptLoad:function(){return h},initScriptLoader:function(){return g}});let n=r(8229),a=r(6966),l=r(5155),o=n._(r(7650)),s=a._(r(2115)),i=r(2830),c=r(2714),d=r(2374),u=new Map,f=new Set,p=e=>{if(o.default.preinit){e.forEach(e=>{o.default.preinit(e,{as:"style"})});return}{let t=document.head;e.forEach(e=>{let r=document.createElement("link");r.type="text/css",r.rel="stylesheet",r.href=e,t.appendChild(r)})}},m=e=>{let{src:t,id:r,onLoad:n=()=>{},onReady:a=null,dangerouslySetInnerHTML:l,children:o="",strategy:s="afterInteractive",onError:i,stylesheets:d}=e,m=r||t;if(m&&f.has(m))return;if(u.has(t)){f.add(m),u.get(t).then(n,i);return}let h=()=>{a&&a(),f.add(m)},g=document.createElement("script"),y=new Promise((e,t)=>{g.addEventListener("load",function(t){e(),n&&n.call(this,t),h()}),g.addEventListener("error",function(e){t(e)})}).catch(function(e){i&&i(e)});l?(g.innerHTML=l.__html||"",h()):o?(g.textContent="string"==typeof o?o:Array.isArray(o)?o.join(""):"",h()):t&&(g.src=t,u.set(t,y)),(0,c.setAttributesFromProps)(g,e),"worker"===s&&g.setAttribute("type","text/partytown"),g.setAttribute("data-nscript",s),d&&p(d),document.body.appendChild(g)};function h(e){let{strategy:t="afterInteractive"}=e;"lazyOnload"===t?window.addEventListener("load",()=>{(0,d.requestIdleCallback)(()=>m(e))}):m(e)}function g(e){e.forEach(h),[...document.querySelectorAll('[data-nscript="beforeInteractive"]'),...document.querySelectorAll('[data-nscript="beforePageRender"]')].forEach(e=>{let t=e.id||e.getAttribute("src");f.add(t)})}function y(e){let{id:t,src:r="",onLoad:n=()=>{},onReady:a=null,strategy:c="afterInteractive",onError:u,stylesheets:p,...h}=e,{updateScripts:g,scripts:y,getIsSsr:b,appDir:x,nonce:j}=(0,s.useContext)(i.HeadManagerContext),v=(0,s.useRef)(!1);(0,s.useEffect)(()=>{let e=t||r;v.current||(a&&e&&f.has(e)&&a(),v.current=!0)},[a,t,r]);let _=(0,s.useRef)(!1);if((0,s.useEffect)(()=>{if(!_.current){if("afterInteractive"===c)m(e);else if("lazyOnload"===c)"complete"===document.readyState?(0,d.requestIdleCallback)(()=>m(e)):window.addEventListener("load",()=>{(0,d.requestIdleCallback)(()=>m(e))});_.current=!0}},[e,c]),("beforeInteractive"===c||"worker"===c)&&(g?(y[c]=(y[c]||[]).concat([{id:t,src:r,onLoad:n,onReady:a,onError:u,...h}]),g(y)):b&&b()?f.add(t||r):b&&!b()&&m(e)),x){if(p&&p.forEach(e=>{o.default.preinit(e,{as:"style"})}),"beforeInteractive"===c)return r?(o.default.preload(r,h.integrity?{as:"script",integrity:h.integrity,nonce:j,crossOrigin:h.crossOrigin}:{as:"script",nonce:j,crossOrigin:h.crossOrigin}),(0,l.jsx)("script",{nonce:j,dangerouslySetInnerHTML:{__html:"(self.__next_s=self.__next_s||[]).push("+JSON.stringify([r,{...h,id:t}])+")"}})):(h.dangerouslySetInnerHTML&&(h.children=h.dangerouslySetInnerHTML.__html,delete h.dangerouslySetInnerHTML),(0,l.jsx)("script",{nonce:j,dangerouslySetInnerHTML:{__html:"(self.__next_s=self.__next_s||[]).push("+JSON.stringify([0,{...h,id:t}])+")"}}));"afterInteractive"===c&&r&&o.default.preload(r,h.integrity?{as:"script",integrity:h.integrity,nonce:j,crossOrigin:h.crossOrigin}:{as:"script",nonce:j,crossOrigin:h.crossOrigin})}return null}Object.defineProperty(y,"__nextScript",{value:!0});let b=y;("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)}},e=>{var t=t=>e(e.s=t);e.O(0,[441,684,358],()=>t(3773)),_N_E=e.O()}]);