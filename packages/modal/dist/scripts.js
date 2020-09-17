function t(){return(t=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])}return t}).apply(this,arguments)}var e=function(t,e){e&&document.querySelectorAll(e).forEach(function(e){t?(e.inert=!0,e.setAttribute("aria-hidden",!0)):(e.inert=null,e.removeAttribute("aria-hidden"))})},n=function(t,e){e&&document.querySelectorAll(e).forEach(function(e){t?e.style.overflow="hidden":e.style.removeProperty("overflow")})},s=function(t){void 0===t&&(t=null),t&&t.memory&&t.memory.trigger&&(t.memory.trigger.focus(),t.memory.trigger=null)},i=function(){function t(){this.target=null,this.__handlerFocusTrap=this.handlerFocusTrap.bind(this)}var e=t.prototype;return e.init=function(t){this.target=t,this.inner=this.target.querySelector('[tabindex="-1"]'),this.focusable=this.getFocusable(),this.focusable.length?(this.focusableFirst=this.focusable[0],this.focusableLast=this.focusable[this.focusable.length-1],this.target.addEventListener("keydown",this.__handlerFocusTrap)):this.target.addEventListener("keydown",this.handlerFocusLock)},e.destroy=function(){this.target&&(this.inner=null,this.focusable=null,this.focusableFirst=null,this.focusableLast=null,this.target.removeEventListener("keydown",this.__handlerFocusTrap),this.target.removeEventListener("keydown",this.handlerFocusLock),this.target=null)},e.handlerFocusTrap=function(t){("Tab"===t.key||9===t.keyCode)&&(t.shiftKey?document.activeElement!==this.focusableFirst&&document.activeElement!==this.inner||(this.focusableLast.focus(),t.preventDefault()):document.activeElement!==this.focusableLast&&document.activeElement!==this.inner||(this.focusableFirst.focus(),t.preventDefault()))},e.handlerFocusLock=function(t){("Tab"===t.key||9===t.keyCode)&&t.preventDefault()},e.getFocusable=function(){var t=[],e=document.activeElement,n=this.inner?this.inner.scrollTop:0;return this.target.querySelectorAll('a[href]:not([disabled]),button:not([disabled]),textarea:not([disabled]),input[type="text"]:not([disabled]),input[type="radio"]:not([disabled]),input[type="checkbox"]:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])').forEach(function(e){e.focus(),e===document.activeElement&&t.push(e)}),this.inner&&(this.inner.scrollTop=n),e.focus(),t},t}(),o=function(t,e){return void 0===e&&(e=0),"string"!=typeof t?t:e?document.querySelector(t):document.querySelectorAll(t)},r={autoInit:!1,dataModal:"modal",dataDialog:"modal-dialog",dataOpen:"modal-open",dataClose:"modal-close",dataFocus:"modal-focus",dataRequired:"modal-required",stateOpened:"is-opened",stateOpening:"is-opening",stateClosing:"is-closing",stateClosed:"is-closed",selectorInert:null,selectorOverflow:"body",customEventPrefix:"modal:",moveModals:{ref:null,type:null},setTabindex:!0,transition:!0},a=function(t){try{var e,n=this;function s(s){return e?s:t.target.closest("[data-"+n.settings.dataClose+"]")?(t.preventDefault(),void n.close()):void(t.target.hasAttribute("data-"+n.settings.dataModal)&&!t.target.hasAttribute("data-"+n.settings.dataRequired)&&n.close())}if(n.working)return Promise.resolve();var i=t.target.closest("[data-"+n.settings.dataOpen+"]"),o=function(){if(i){t.preventDefault();var s=i.getAttribute("data-"+n.settings.dataOpen),o=t.target.closest("[data-"+n.settings.dataModal+"]");return o||(n.memory.trigger=i),Promise.resolve(n.close(!o)).then(function(){n.open(s),e=1})}}();return Promise.resolve(o&&o.then?o.then(s):s(o))}catch(t){return Promise.reject(t)}};function l(t){if(!this.working&&("Escape"===t.key||27===t.keyCode)){var e=document.querySelector("[data-"+this.settings.dataModal+"]."+this.settings.stateOpened);e&&!e.hasAttribute("data-"+this.settings.dataRequired)&&this.close()}}module.exports=function(){function c(e){this.defaults=r,this.settings=t({},this.defaults,e),this.working=!1,this.memory={},this.focusTrap=new i,this.__handlerClick=a.bind(this),this.__handlerKeyup=l.bind(this),this.settings.autoInit&&this.init()}var d=c.prototype;return d.init=function(e){void 0===e&&(e=null),e&&(this.settings=t({},this.settings,e)),this.moveModals(),this.setTabindex(this.settings.setTabindex),this.setInitialState(),document.addEventListener("click",this.__handlerClick,!1),document.addEventListener("touchend",this.__handlerClick,!1),document.addEventListener("keyup",this.__handlerKeyup,!1)},d.destroy=function(){this.memory={},document.removeEventListener("click",this.__handlerClick,!1),document.removeEventListener("touchend",this.__handlerClick,!1),document.removeEventListener("keyup",this.__handlerKeyup,!1)},d.getModal=function(t){return"string"!=typeof t?t:document.querySelector("[data-"+this.settings.dataModal+'="'+t+'"]')},d.modalNotFound=function(t){return Promise.reject(new Error('Did not find modal with key: "'+t+'"'))},d.setTabindex=function(t){void 0===t&&(t=!0),function(t,e){e&&document.querySelectorAll(e).forEach(function(e){t?e.setAttribute("tabindex","-1"):e.removeAttribute("tabindex")})}(t,"\n      [data-"+this.settings.dataModal+"]\n      [data-"+this.settings.dataDialog+"]\n    ")},d.setInitialState=function(){var t;t=this,document.querySelectorAll("[data-"+t.settings.dataModal+"]").forEach(function(i){i.classList.contains(t.settings.stateOpened)&&(e(!1,t.settings.selectorInert),n(!1,t.settings.selectorOverflow),s(t),t.focusTrap.destroy()),function(t){var e=arguments;(t=t.forEach?t:[t]).forEach(function(t){var n;(n=t.classList).remove.apply(n,[].slice.call(e,1))})}(i,t.settings.stateOpened,t.settings.stateOpening,t.settings.stateClosing),function(t){var e=arguments;(t=t.forEach?t:[t]).forEach(function(t){var n;(n=t.classList).add.apply(n,[].slice.call(e,1))})}(i,t.settings.stateClosed)})},d.moveModals=function(t,e){void 0===t&&(t=this.settings.moveModals.type),void 0===e&&(e=this.settings.moveModals.ref);var n=document.querySelectorAll("[data-"+this.settings.dataModal+"]");n.length&&function(t,e,n){if(void 0===n&&(n=!1),n){var s=o(t);if(!s.length)throw new Error('Move target element "'+t+'" not found!');var i=o(n,1);if(!i)throw new Error('Move reference element "'+n+'" not found!');s.forEach(function(t){switch(e){case"after":return i.after(t),{ref:i,el:t,type:e};case"before":return i.before(t),{ref:i,el:t,type:e};case"append":return i.append(t),{ref:i,el:t,type:e};case"prepend":return i.prepend(t),{ref:i,el:t,type:e};default:throw new Error('Move type "'+e+'" does not exist!')}})}}(n,t,e)},d.open=function(t){try{var s=this,i=s.getModal(t);return i?function(t){return t=[].slice.call(t=t.forEach?t:[t]),[].slice.call(arguments,1).some(function(e){return t.some(function(t){if(t.classList.contains(e))return!0})})}(i,s.settings.stateClosed)?(s.working=!0,n(!0,s.settings.selectorOverflow),Promise.resolve((o=i,r=s.settings,new Promise(function(t){r.transition?(o.classList.remove(r.stateClosed),o.classList.add(r.stateOpening),o.addEventListener("transitionend",function e(){o.classList.add(r.stateOpened),o.classList.remove(r.stateOpening),t(o),this.removeEventListener("transitionend",e)})):(o.classList.add(r.stateOpened),o.classList.remove(r.stateClosed),t(o))}))).then(function(){return s.focusTrap.init(i),function(t,e){var n=t.querySelector("[data-"+e.dataFocus+"]");if(n)n.focus();else{var s=t.querySelector('[tabindex="-1"]');s&&s.focus()}}(i,s.settings),e(!0,s.settings.selectorInert),i.dispatchEvent(new CustomEvent(s.settings.customEventPrefix+"opened",{bubbles:!0})),s.working=!1,i})):Promise.resolve(i):Promise.resolve(s.modalNotFound(t))}catch(t){return Promise.reject(t)}var o,r},d.close=function(t){void 0===t&&(t=!0);try{var i=this,o=document.querySelector("[data-"+i.settings.dataModal+"]."+i.settings.stateOpened);return o?(i.working=!0,e(!1,i.settings.selectorInert),n(!1,i.settings.selectorOverflow),Promise.resolve((r=o,a=i.settings,new Promise(function(t){a.transition?(r.classList.add(a.stateClosing),r.classList.remove(a.stateOpened),r.addEventListener("transitionend",function e(){r.classList.remove(a.stateClosing),r.classList.add(a.stateClosed),t(r),this.removeEventListener("transitionend",e)})):(r.classList.add(a.stateClosed),r.classList.remove(a.stateOpened),t(r))}))).then(function(){return t&&s(i),i.focusTrap.destroy(),o.dispatchEvent(new CustomEvent(i.settings.customEventPrefix+"closed",{bubbles:!0})),i.working=!1,o})):Promise.resolve(o)}catch(t){return Promise.reject(t)}var r,a},c}();
//# sourceMappingURL=scripts.js.map
