/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Edit.js":
/*!*********************!*\
  !*** ./src/Edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/icons */ "./src/utils/icons.js");




const Edit = ({
  clientId
}) => {
  const innerBlocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => select("core/block-editor").getBlock(clientId).innerBlocks);
  const insertBlockType = type => {
    const block = wp.blocks.createBlock(type);
    return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.dispatch)("core/block-editor").insertBlock(block, 0, clientId);
  };
  if (!innerBlocks?.length) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)()
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "msfb-my-social-feeds"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Select Your Social Feed Block"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, " Choose from the following social feed blocks to get started "), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "items-list"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "item instagram-feed",
      onClick: () => {
        insertBlockType("bpifb/my-social-feeds");
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "Instagram Feed"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, " Display instagram feeds, media and profile "), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "icon"
    }, _utils_icons__WEBPACK_IMPORTED_MODULE_3__.instagram)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "item tiktok-feed",
      onClick: () => {
        insertBlockType("ttp/tiktok-player");
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "TikTok Player"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, " Display instagram feeds, media and profile "), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "icon"
    }, _utils_icons__WEBPACK_IMPORTED_MODULE_3__.tiktok)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "item pinterest-feed",
      onClick: () => {
        insertBlockType("bpf/b-pinterest-feed");
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "Pinterest Feed"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, " Display instagram feeds, media and profile "), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "icon"
    }, _utils_icons__WEBPACK_IMPORTED_MODULE_3__.pinterest)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
      templateLock: false,
      allowedBlocks: ["bpifb/my-social-feeds", "ttp/tiktok-player", "bpf/b-pinterest-feed"],
      renderAppender: () => false
    }));
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)()
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
    templateLock: false,
    allowedBlocks: ["bpifb/my-social-feeds", "ttp/tiktok-player", "bpf/b-pinterest-feed"]
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Edit);

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"msfbp/my-social-feeds","title":"my social feeds","description":"Display your social media feeds in a beautiful way.","category":"widgets","keywords":["my social feeds","feeds"],"textdomain":"my-social-feeds","attributes":{"align":{"type":"string","default":""}},"supports":{"align":["wide","full"],"html":false},"example":{"attributes":{"preview":true,"columns":{"desktop":1,"tablet":1,"mobile":1}}},"editorScript":["file:./index.js"],"editorStyle":"file:./index.css","style":[],"render":"file:./render.php","viewScript":[]}');

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/utils/icons.js":
/*!****************************!*\
  !*** ./src/utils/icons.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockIcon: () => (/* binding */ blockIcon),
/* harmony export */   instagram: () => (/* binding */ instagram),
/* harmony export */   pinterest: () => (/* binding */ pinterest),
/* harmony export */   tiktok: () => (/* binding */ tiktok)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const blockIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 24 24"><path d="M8.5,17H5.91406l.293-.293A.99989.99989,0,0,0,4.793,15.293l-1.9997,1.99969a1.00354,1.00354,0,0,0,0,1.41468L4.793,20.707A.99989.99989,0,0,0,6.207,19.293L5.91406,19H8.5a1,1,0,0,0,0-2Zm12.70673.29266L19.207,15.293A.99989.99989,0,0,0,17.793,16.707l.293.293H15.5a1,1,0,0,0,0,2h2.58594l-.293.293A.99989.99989,0,1,0,19.207,20.707l1.9997-1.99969a1.00354,1.00354,0,0,0,0-1.41468Zm-.56647-7.52087A3.46849,3.46849,0,0,0,21.5,7.5a3.5,3.5,0,0,0-7,0,3.46849,3.46849,0,0,0,.85974,2.27179A4.98821,4.98821,0,0,0,13,14a1,1,0,0,0,2,0,3,3,0,0,1,6,0,1,1,0,0,0,2,0A4.98821,4.98821,0,0,0,20.64026,9.77179ZM18,9a1.5,1.5,0,1,1,1.5-1.5A1.50164,1.50164,0,0,1,18,9Zm-9.35974.77179A3.46849,3.46849,0,0,0,9.5,7.5a3.5,3.5,0,0,0-7,0,3.46849,3.46849,0,0,0,.85974,2.27179A4.98821,4.98821,0,0,0,1,14a1,1,0,0,0,2,0,3,3,0,0,1,6,0,1,1,0,0,0,2,0A4.98821,4.98821,0,0,0,8.64026,9.77179ZM6,9A1.5,1.5,0,1,1,7.5,7.5,1.50164,1.50164,0,0,1,6,9Z"/></svg>';
const instagram = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "25px",
  height: "25px",
  viewBox: "0 0 15 15",
  fill: "none"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M11 3.5H12M4.5 0.5H10.5C12.7091 0.5 14.5 2.29086 14.5 4.5V10.5C14.5 12.7091 12.7091 14.5 10.5 14.5H4.5C2.29086 14.5 0.5 12.7091 0.5 10.5V4.5C0.5 2.29086 2.29086 0.5 4.5 0.5ZM7.5 10.5C5.84315 10.5 4.5 9.15685 4.5 7.5C4.5 5.84315 5.84315 4.5 7.5 4.5C9.15685 4.5 10.5 5.84315 10.5 7.5C10.5 9.15685 9.15685 10.5 7.5 10.5Z",
  stroke: "#e72c84"
}));
const tiktok = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  width: "27px",
  height: "27px",
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z",
  stroke: "#e72c84",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M10 12C8.34315 12 7 13.3431 7 15C7 16.6569 8.34315 18 10 18C11.6569 18 13 16.6569 13 15V6C13.3333 7 14.6 9 17 9",
  stroke: "#e72c84",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));
const pinterest = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  fill: "#e72c84",
  width: "27px",
  height: "27px",
  viewBox: "-2 -2 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  preserveAspectRatio: "xMinYMin"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M9.355 11.614C9.1 12.99 8.79 14.31 7.866 15c-.284-2.08.419-3.644.745-5.303-.556-.964.067-2.906 1.24-2.427 1.445.588-1.25 3.586.56 3.96 1.888.392 2.66-3.374 1.488-4.6-1.692-1.768-4.927-.04-4.529 2.492.097.62.718.807.248 1.661-1.083-.247-1.406-1.127-1.365-2.3.067-1.92 1.675-3.263 3.289-3.45 2.04-.235 3.954.772 4.219 2.748.297 2.23-.921 4.646-3.103 4.472-.59-.047-.84-.35-1.303-.64z"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
}));

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_icons_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/icons.js */ "./src/utils/icons.js");
/* harmony import */ var _Edit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Edit */ "./src/Edit.js");








// block register 
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_2__, {
  icon: {
    src: _utils_icons_js__WEBPACK_IMPORTED_MODULE_5__.blockIcon
  },
  edit: _Edit__WEBPACK_IMPORTED_MODULE_6__["default"],
  save: () => {
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.useBlockProps.save();
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ...blockProps
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.InnerBlocks.Content, null));
  }
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map