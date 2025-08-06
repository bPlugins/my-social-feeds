/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin-help.scss":
/*!*****************************!*\
  !*** ./src/admin-help.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../plugin-slug/node_modules/react-dom/client.js":
/*!*******************************************************!*\
  !*** ../plugin-slug/node_modules/react-dom/client.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var m = __webpack_require__(/*! react-dom */ "react-dom");
if (false) {} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

module.exports = window["ReactDOM"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/admin-help.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "../plugin-slug/node_modules/react-dom/client.js");
/* harmony import */ var _admin_help_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./admin-help.scss */ "./src/admin-help.scss");



document.addEventListener('DOMContentLoaded', () => {
  const adminEl = document.querySelector('.msfAdminHelpPage');
  const features = [{
    title: 'Need any Assistance?',
    description: 'Our Expert Support Team is always ready to help you out promptly.',
    iconClass: 'fa fa-life-ring',
    link: 'https://bplugins.com/support',
    linkText: 'Contact Support'
  }, {
    title: 'Looking for Documentation?',
    description: 'We have detailed documentation on every aspects of the plugin.',
    iconClass: 'fa fa-file-text',
    link: 'https://bplugins.com/docs/my-social-feeds/',
    linkText: 'Documentation'
  }
  // {
  // 	title: 'Liked This Plugin?',
  // 	description: 'Glad to know that, you can support us by leaving a 5 &#11088; rating.',
  // 	iconClass: 'fa fa-thumbs-up',
  // 	link: 'https://wordpress.org/support/plugin/lightbox-block/reviews/#new-post',
  // 	linkText: 'Rate the Plugin'
  // }
  ];
  (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(adminEl).render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bplContainer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "header box"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    className: "heading"
  }, "Helpful Links")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "features col-3 col-tab-2 col-mob-1"
  }, features.map((feature, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Feature, {
    key: index,
    feature: feature
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "feature box"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa fa-thumbs-up"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "Liked This Plugin?"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Glad to know that, you can support us by leaving a 5 \u2B50 rating."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "buttonArea"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://wordpress.org/support/plugin/b-tiktok-feed/reviews/#new-post",
    target: "_blank",
    rel: "noreferrer",
    className: "button button-primary"
  }, "B TikTok Feed"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://wordpress.org/support/plugin/social-feed-block/reviews/#new-post",
    target: "_blank",
    rel: "noreferrer",
    className: "button button-primary"
  }, "Instagram Feed"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://wordpress.org/support/plugin/b-pinterest-feed/reviews/#new-post",
    target: "_blank",
    rel: "noreferrer",
    className: "button button-primary"
  }, "B Pinterest Feed")))))));
});
const Feature = ({
  feature
}) => {
  const {
    title,
    description,
    iconClass,
    link,
    linkText
  } = feature;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "feature box"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: iconClass
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    dangerouslySetInnerHTML: {
      __html: title
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    dangerouslySetInnerHTML: {
      __html: description
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: link,
    target: "_blank",
    rel: "noreferrer",
    className: "button button-primary",
    dangerouslySetInnerHTML: {
      __html: linkText
    }
  }));
};
/******/ })()
;
//# sourceMappingURL=admin-help.js.map