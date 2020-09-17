!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):((t=t||self).vrembem=t.vrembem||{},t.vrembem.Drawer=e())}(this,function(){function t(){return(t=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t}).apply(this,arguments)}var e=function(t,e){e&&document.querySelectorAll(e).forEach(function(e){t?(e.inert=!0,e.setAttribute("aria-hidden",!0)):(e.inert=null,e.removeAttribute("aria-hidden"))})},s=function(t,e){e&&document.querySelectorAll(e).forEach(function(e){t?e.style.overflow="hidden":e.style.removeProperty("overflow")})},n=function(t){var e=arguments;(t=t.forEach?t:[t]).forEach(function(t){var s;(s=t.classList).add.apply(s,[].slice.call(e,1))})},i=function(t,e){var s=t.querySelector("[data-"+e.dataFocus+"]");if(s)s.focus();else{var n=t.querySelector('[tabindex="-1"]');n&&n.focus()}},r=function(){function t(){this.target=null,this.__handlerFocusTrap=this.handlerFocusTrap.bind(this)}var e=t.prototype;return e.init=function(t){this.target=t,this.inner=this.target.querySelector('[tabindex="-1"]'),this.focusable=this.getFocusable(),this.focusable.length?(this.focusableFirst=this.focusable[0],this.focusableLast=this.focusable[this.focusable.length-1],this.target.addEventListener("keydown",this.__handlerFocusTrap)):this.target.addEventListener("keydown",this.handlerFocusLock)},e.destroy=function(){this.target&&(this.inner=null,this.focusable=null,this.focusableFirst=null,this.focusableLast=null,this.target.removeEventListener("keydown",this.__handlerFocusTrap),this.target.removeEventListener("keydown",this.handlerFocusLock),this.target=null)},e.handlerFocusTrap=function(t){("Tab"===t.key||9===t.keyCode)&&(t.shiftKey?document.activeElement!==this.focusableFirst&&document.activeElement!==this.inner||(this.focusableLast.focus(),t.preventDefault()):document.activeElement!==this.focusableLast&&document.activeElement!==this.inner||(this.focusableFirst.focus(),t.preventDefault()))},e.handlerFocusLock=function(t){("Tab"===t.key||9===t.keyCode)&&t.preventDefault()},e.getFocusable=function(){var t=[],e=document.activeElement,s=this.inner?this.inner.scrollTop:0;return this.target.querySelectorAll('a[href]:not([disabled]),button:not([disabled]),textarea:not([disabled]),input[type="text"]:not([disabled]),input[type="radio"]:not([disabled]),input[type="checkbox"]:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])').forEach(function(e){e.focus(),e===document.activeElement&&t.push(e)}),this.inner&&(this.inner.scrollTop=s),e.focus(),t},t}(),a=function(t){return t=[].slice.call(t=t.forEach?t:[t]),[].slice.call(arguments,1).some(function(e){return t.some(function(t){if(t.classList.contains(e))return!0})})},o=function(t){var e=arguments;(t=t.forEach?t:[t]).forEach(function(t){var s;(s=t.classList).remove.apply(s,[].slice.call(e,1))})},c={autoInit:!1,dataDrawer:"drawer",dataDialog:"drawer-dialog",dataToggle:"drawer-toggle",dataOpen:"drawer-open",dataClose:"drawer-close",dataBreakpoint:"drawer-breakpoint",dataFocus:"drawer-focus",stateOpened:"is-opened",stateOpening:"is-opening",stateClosing:"is-closing",stateClosed:"is-closed",classModal:"drawer_modal",selectorInert:null,selectorOverflow:null,breakpoints:{xs:"480px",sm:"620px",md:"760px",lg:"990px",xl:"1380px"},customEventPrefix:"drawer:",stateSave:!0,stateKey:"DrawerState",setTabindex:!0,transition:!0},l=function(t,i){try{var r=i.getDrawer(t);return r?a(r,i.settings.classModal)?(e(!1,i.settings.selectorInert),s(!1,i.settings.selectorOverflow),o(r,i.settings.classModal),i.focusTrap.destroy(),t=r.getAttribute("data-"+i.settings.dataDrawer),i.state[t]==i.settings.stateOpened&&(n(r,i.settings.stateOpened),o(r,i.settings.stateClosed)),r.dispatchEvent(new CustomEvent(i.settings.customEventPrefix+"toDefault",{bubbles:!0})),Promise.resolve(r)):Promise.resolve():Promise.resolve(i.drawerNotFound(t))}catch(t){return Promise.reject(t)}},d=function(t,e){try{var s=e.getDrawer(t);return s?a(s,e.settings.classModal)?Promise.resolve():(n(s,e.settings.classModal),n(s,e.settings.stateClosed),o(s,e.settings.stateOpened),s.dispatchEvent(new CustomEvent(e.settings.customEventPrefix+"toModal",{bubbles:!0})),Promise.resolve(s)):Promise.resolve(e.drawerNotFound(t))}catch(t){return Promise.reject(t)}},u=function(){function t(t){this.mediaQueryLists=[],this.parent=t,this.__check=this.check.bind(this)}var e=t.prototype;return e.init=function(){var t=this;document.querySelectorAll("[data-"+this.parent.settings.dataBreakpoint+"]").forEach(function(e){var s=e.getAttribute("data-"+t.parent.settings.dataDrawer),n=e.getAttribute("data-"+t.parent.settings.dataBreakpoint),i=window.matchMedia("(min-width:"+(t.parent.settings.breakpoints[n]?t.parent.settings.breakpoints[n]:n)+")");t.match(i,e),i.addListener(t.__check),t.mediaQueryLists.push({mql:i,drawer:s})})},e.destroy=function(){var t=this;this.mediaQueryLists&&this.mediaQueryLists.length&&this.mediaQueryLists.forEach(function(e){e.mql.removeListener(t.__check)}),this.mediaQueryLists=null},e.check=function(t){var e=this;void 0===t&&(t=null),this.mediaQueryLists&&this.mediaQueryLists.length&&(this.mediaQueryLists.forEach(function(s){if(!t||t.media==s.mql.media){var n=document.querySelector("[data-"+e.parent.settings.dataDrawer+'="'+s.drawer+'"]');n&&e.match(s.mql,n)}}),document.dispatchEvent(new CustomEvent(this.parent.settings.customEventPrefix+"breakpoint",{bubbles:!0})))},e.match=function(t,e){t.matches?l(e,this.parent):d(e,this.parent)},t}();function h(t){if(!this.working){var e=t.target.closest("[data-"+this.settings.dataToggle+"]");if(e){var s=e.getAttribute("data-"+this.settings.dataToggle);return this.memory.trigger=e,this.toggle(s),void t.preventDefault()}if(e=t.target.closest("[data-"+this.settings.dataOpen+"]")){var n=e.getAttribute("data-"+this.settings.dataOpen);return this.memory.trigger=e,this.open(n),void t.preventDefault()}if(e=t.target.closest("[data-"+this.settings.dataClose+"]")){var i=e.getAttribute("data-"+this.settings.dataClose);if(i)this.memory.trigger=e,this.close(i);else{var r=t.target.closest("[data-"+this.settings.dataDrawer+"]");r&&this.close(r)}t.preventDefault()}else t.target.hasAttribute("data-"+this.settings.dataDrawer)&&this.close(t.target)}}function f(t){if(!this.working&&27==t.keyCode){var e=document.querySelector("."+this.settings.classModal+"."+this.settings.stateOpened);e&&this.close(e)}}function g(t,e){if(!e.stateSave)return m(e);var s=localStorage.getItem(e.stateKey)?JSON.parse(localStorage.getItem(e.stateKey)):{};return(t?[t]:document.querySelectorAll("[data-"+e.dataDrawer+"]")).forEach(function(t){if(!a(t,e.classModal)){var n=t.getAttribute("data-"+e.dataDrawer);s[n]=a(t,e.stateOpened)?e.stateOpened:e.stateClosed}}),localStorage.setItem(e.stateKey,JSON.stringify(s)),s}function m(t){return localStorage.getItem(t.stateKey)&&localStorage.removeItem(t.stateKey),{}}return function(){function v(e){this.defaults=c,this.settings=t({},this.defaults,e),this.working=!1,this.memory={},this.state={},this.focusTrap=new r,this.breakpoint=new u(this),this.__handlerClick=h.bind(this),this.__handlerKeyup=f.bind(this),this.settings.autoInit&&this.init()}var p=v.prototype;return p.init=function(e){void 0===e&&(e=null),e&&(this.settings=t({},this.settings,e)),this.stateSet(),this.setTabindex(this.settings.setTabindex),this.breakpoint.init(),document.addEventListener("click",this.__handlerClick,!1),document.addEventListener("touchend",this.__handlerClick,!1),document.addEventListener("keyup",this.__handlerKeyup,!1)},p.destroy=function(){this.breakpoint.destroy(),this.memory={},this.state={},localStorage.removeItem(this.settings.stateKey),document.removeEventListener("click",this.__handlerClick,!1),document.removeEventListener("touchend",this.__handlerClick,!1),document.removeEventListener("keyup",this.__handlerKeyup,!1)},p.getDrawer=function(t){return"string"!=typeof t?t:document.querySelector("[data-"+this.settings.dataDrawer+'="'+t+'"]')},p.drawerNotFound=function(t){return Promise.reject(new Error('Did not find drawer with key: "'+t+'"'))},p.setTabindex=function(t){void 0===t&&(t=!0),function(t,e){e&&document.querySelectorAll(e).forEach(function(e){t?e.setAttribute("tabindex","-1"):e.removeAttribute("tabindex")})}(t,"\n      [data-"+this.settings.dataDrawer+"]\n      [data-"+this.settings.dataDialog+"]\n    ")},p.stateSet=function(){this.state=function(t){if(!t.stateSave)return m(t);if(!localStorage.getItem(t.stateKey))return g(null,t);var e=JSON.parse(localStorage.getItem(t.stateKey));return Object.keys(e).forEach(function(s){var i=document.querySelector("[data-"+t.dataDrawer+'="'+s+'"]');i&&(e[s]==t.stateOpened?n(i,t.stateOpened):o(i,t.stateOpened))}),e}(this.settings)},p.stateSave=function(t){void 0===t&&(t=null),this.state=g(t,this.settings)},p.stateClear=function(){this.state=m(this.settings)},p.switchToDefault=function(t){return l(t,this)},p.switchToModal=function(t){return d(t,this)},p.toggle=function(t){try{var e=this.getDrawer(t);if(!e)return Promise.resolve(this.drawerNotFound(t));var s=a(e,this.settings.stateOpened);return Promise.resolve(s?this.close(e):this.open(e))}catch(t){return Promise.reject(t)}},p.open=function(t){try{var n=this,r=n.getDrawer(t);if(!r)return Promise.resolve(n.drawerNotFound(t));if(a(r,n.settings.stateOpened))return i(r,n.settings),Promise.resolve(r);n.working=!0;var o=a(r,n.settings.classModal);return o&&s(!0,n.settings.selectorOverflow),Promise.resolve((c=r,l=n.settings,new Promise(function(t){l.transition?(c.classList.remove(l.stateClosed),c.classList.add(l.stateOpening),c.addEventListener("transitionend",function e(){c.classList.add(l.stateOpened),c.classList.remove(l.stateOpening),t(c),this.removeEventListener("transitionend",e)})):(c.classList.add(l.stateOpened),c.classList.remove(l.stateClosed),t(c))}))).then(function(){return n.stateSave(r),o&&(n.focusTrap.init(r),e(!0,n.settings.selectorInert)),i(r,n.settings),r.dispatchEvent(new CustomEvent(n.settings.customEventPrefix+"opened",{bubbles:!0})),n.working=!1,r})}catch(t){return Promise.reject(t)}var c,l},p.close=function(t){try{var n=this,i=n.getDrawer(t);return i?a(i,n.settings.stateOpened)?(n.working=!0,a(i,n.settings.classModal)&&(e(!1,n.settings.selectorInert),s(!1,n.settings.selectorOverflow)),Promise.resolve((r=i,o=n.settings,new Promise(function(t){o.transition?(r.classList.add(o.stateClosing),r.classList.remove(o.stateOpened),r.addEventListener("transitionend",function e(){r.classList.remove(o.stateClosing),r.classList.add(o.stateClosed),t(r),this.removeEventListener("transitionend",e)})):(r.classList.add(o.stateClosed),r.classList.remove(o.stateOpened),t(r))}))).then(function(){var t;return n.stateSave(i),void 0===(t=n)&&(t=null),t&&t.memory&&t.memory.trigger&&(t.memory.trigger.focus(),t.memory.trigger=null),n.focusTrap.destroy(),i.dispatchEvent(new CustomEvent(n.settings.customEventPrefix+"closed",{bubbles:!0})),n.working=!1,i})):Promise.resolve(i):Promise.resolve(n.drawerNotFound(t))}catch(t){return Promise.reject(t)}var r,o},v}()});
//# sourceMappingURL=scripts.umd.js.map
