/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../bpl-tools/utils/data.js":
/*!**********************************!*\
  !*** ../bpl-tools/utils/data.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deskBreakpoint: () => (/* binding */ deskBreakpoint),
/* harmony export */   mobileBreakpoint: () => (/* binding */ mobileBreakpoint),
/* harmony export */   tabBreakpoint: () => (/* binding */ tabBreakpoint)
/* harmony export */ });
const deskBreakpoint = '@media only screen and (min-width: 1025px)';
const tabBreakpoint = '@media only screen and (min-width: 641px) and (max-width: 1024px)';
const mobileBreakpoint = '@media only screen and (max-width: 640px)';

/***/ }),

/***/ "../bpl-tools/utils/functions.js":
/*!***************************************!*\
  !*** ../bpl-tools/utils/functions.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debounce: () => (/* binding */ debounce),
/* harmony export */   getBoxValue: () => (/* binding */ getBoxValue),
/* harmony export */   getImageSizes: () => (/* binding */ getImageSizes),
/* harmony export */   isExist: () => (/* binding */ isExist),
/* harmony export */   tabController: () => (/* binding */ tabController),
/* harmony export */   updateData: () => (/* binding */ updateData)
/* harmony export */ });
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immer */ "../bpl-tools/node_modules/immer/dist/immer.mjs");

const getBoxValue = object => Object.values(object).join(' ');
const getImageSizes = (image, imageSizes) => {
  if (!image) return [];
  let options = [];
  const sizes = image.media_details.sizes;
  for (const key in sizes) {
    const imageSize = imageSizes.find(s => s.slug === key);
    if (imageSize) {
      options.push({
        label: imageSize.name,
        value: sizes[key].source_url
      });
    }
  }
  return options;
};
const tabController = () => {
  setTimeout(() => {
    const panelBodies = document.querySelectorAll('.bPlPanelBody:not(.itemPanelBody) > h2 > button');
    panelBodies.forEach(item => {
      item.addEventListener('click', clickEveryItem);
    });
    function clickEveryItem() {
      this.removeEventListener('click', clickEveryItem);
      panelBodies.forEach(item => {
        if (item.getAttribute('aria-expanded') === 'true' && !item.isEqualNode(this)) {
          item.click();
        }
      });
      setTimeout(() => {
        this.addEventListener('click', clickEveryItem);
      }, 500);
    }
  }, 500);
};
const updateData = (attr, value, ...props) => {
  if (props.length === 0) {
    return value;
  }
  const [currentProp, ...remainingProps] = props;
  if (remainingProps.length === 0) {
    return (0,immer__WEBPACK_IMPORTED_MODULE_0__.produce)(attr, draft => {
      if (Array.isArray(draft[currentProp]) && (draft === null || draft === undefined)) {
        draft = {};
      }
      draft[currentProp] = value;
    });
  }
  return (0,immer__WEBPACK_IMPORTED_MODULE_0__.produce)(attr, draft => {
    if (draft === null || draft === undefined) {
      draft = {};
    }
    if (!Object.prototype.hasOwnProperty.call(draft, currentProp)) {
      draft[currentProp] = {};
    }
    draft[currentProp] = updateData(draft[currentProp], value, ...remainingProps);
  });
};
const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
const isExist = value => {
  if (value === undefined || value === null || value === '') {
    return false;
  }
  if (Array.isArray(value) && value.length === 0) {
    return false;
  }
  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return false;
  }
  if (typeof value === 'string' && value.trim() === '') {
    return false;
  }
  if (typeof value === 'number' && value === 0) {
    return false;
  }
  return true;
};

/***/ }),

/***/ "../bpl-tools/utils/getCSS.js":
/*!************************************!*\
  !*** ../bpl-tools/utils/getCSS.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAdvBGCSS: () => (/* binding */ getAdvBGCSS),
/* harmony export */   getBackgroundCSS: () => (/* binding */ getBackgroundCSS),
/* harmony export */   getBorderBoxCSS: () => (/* binding */ getBorderBoxCSS),
/* harmony export */   getBorderCSS: () => (/* binding */ getBorderCSS),
/* harmony export */   getBoxCSS: () => (/* binding */ getBoxCSS),
/* harmony export */   getColorsCSS: () => (/* binding */ getColorsCSS),
/* harmony export */   getGradientCSS: () => (/* binding */ getGradientCSS),
/* harmony export */   getIconCSS: () => (/* binding */ getIconCSS),
/* harmony export */   getMultiShadowCSS: () => (/* binding */ getMultiShadowCSS),
/* harmony export */   getOverlayCSS: () => (/* binding */ getOverlayCSS),
/* harmony export */   getSeparatorCSS: () => (/* binding */ getSeparatorCSS),
/* harmony export */   getShadowCSS: () => (/* binding */ getShadowCSS),
/* harmony export */   getSpaceCSS: () => (/* binding */ getSpaceCSS),
/* harmony export */   getTypoCSS: () => (/* binding */ getTypoCSS),
/* harmony export */   isValidCSS: () => (/* binding */ isValidCSS)
/* harmony export */ });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "../bpl-tools/utils/data.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions */ "../bpl-tools/utils/functions.js");


const isValidCSS = (p, v) => (0,_functions__WEBPACK_IMPORTED_MODULE_1__.isExist)(v) ? `${p}: ${v};` : '';
const getBackgroundCSS = (bg, isSolid = true, isGradient = true, isImage = true) => {
  const {
    type = 'solid',
    color = '',
    gradient = '',
    image = {},
    position = '',
    attachment = '',
    repeat = '',
    size = '',
    overlayColor = ''
  } = bg || {};
  const styles = 'gradient' === type && isGradient ? isValidCSS('background', gradient) : 'image' === type && isImage ? `background: url(${image?.url});
				${isValidCSS('background-color', overlayColor)}
				${isValidCSS('background-position', position)}
				${isValidCSS('background-size', size)}
				${isValidCSS('background-repeat', repeat)}
				${isValidCSS('background-attachment', attachment)}
				${isValidCSS('background-repeat', repeat)}
				background-blend-mode: overlay;` : isSolid && isValidCSS('background', color);
  return styles;
}; // PHP version in Stepped Content

const getBorderCSS = border => {
  const {
    width = '0px',
    style = 'solid',
    color = '',
    side = 'all',
    radius = '0px'
  } = border || {};
  const borderSideCheck = s => {
    const bSide = side?.toLowerCase();
    return bSide?.includes('all') || bSide?.includes(s);
  };
  const noWidth = width === '0px' || !width;
  const borderCSS = `${width} ${style} ${color}`;
  const styles = `
		${noWidth ? '' : ['top', 'right', 'bottom', 'left'].map(side => borderSideCheck(side) ? `border-${side}: ${borderCSS};` : '').join('')}
		${!radius ? '' : `border-radius: ${radius};`}
	`;
  return styles;
};
const getBorderBoxCSS = border => {
  if (!border) return '';
  const generateBorderCSS = borderObj => {
    const {
      color = '#000000',
      style = 'solid',
      width = '0px'
    } = borderObj;
    return `${width} ${style} ${color}`;
  };
  if ('object' === typeof border && !Array.isArray(border)) {
    if (border.hasOwnProperty('top') || border.hasOwnProperty('right') || border.hasOwnProperty('bottom') || border.hasOwnProperty('left')) {
      const sides = ['top', 'right', 'bottom', 'left'];
      return sides.map(side => border[side] ? `border-${side}: ${generateBorderCSS(border[side])};` : '').join(' ').trim();
    } else {
      return isValidCSS('border', generateBorderCSS(border));
    }
  }
  return '';
};
const getColorsCSS = colors => {
  const {
    color = '#333',
    bgType = 'solid',
    bg = '',
    gradient = 'linear-gradient(135deg, #4527a4, #8344c5)'
  } = colors || {};
  const styles = `
		${color ? `color: ${color};` : ''}
		${gradient || bg ? isValidCSS('background', 'gradient' === bgType ? gradient : bg) : ''}
	`;
  return styles;
};
const getIconCSS = (icon, isSize = true, isColor = true) => {
  const {
    fontSize = 16,
    colorType = 'solid',
    color = 'inherit',
    gradient = 'linear-gradient(135deg, #4527a4, #8344c5)'
  } = icon || {};
  const colorCSS = 'gradient' === colorType ? `color: transparent; background-image: ${gradient}; -webkit-background-clip: text; background-clip: text;` : isValidCSS('color', color);
  const styles = `
		${!fontSize || !isSize ? '' : isValidCSS('font-size', fontSize ? `${fontSize}px` : '')}
		${isColor ? colorCSS : ''}
	`;
  return styles;
};
const getMultiShadowCSS = (value, type = 'box') => {
  let styles = '';
  value?.map((item, index) => {
    const {
      hOffset = '0px',
      vOffset = '0px',
      blur = '0px',
      spreed = '0px',
      color = '#7090b0',
      isInset = false
    } = item || {};
    const inset = isInset ? 'inset' : '';
    const offsetBlur = `${hOffset} ${vOffset} ${blur}`;
    const isComa = index + 1 >= value.length ? '' : ', ';
    styles += 'text' === type ? `${offsetBlur} ${color}${isComa}` : `${offsetBlur} ${spreed} ${color} ${inset}${isComa}`;
  });
  return styles || 'none';
};
const getSeparatorCSS = separator => {
  const {
    width = '50%',
    height = '2px',
    style = 'solid',
    color = '#bbb'
  } = separator || {};
  const styles = `
		width: ${width};
		${'0px' === height && '0em' === height && '0rem' === height ? '' : `border-top: ${height} ${style} ${color};`}
	`;
  return styles;
};
const getShadowCSS = (shadow, type = 'box') => {
  const {
    hOffset = '0px',
    vOffset = '0px',
    blur = '0px',
    spreed = '0px',
    color = '#7090b0',
    isInset = false
  } = shadow || {};
  const inset = isInset ? 'inset' : '';
  const offsetBlur = `${hOffset} ${vOffset} ${blur}`;
  const styles = 'text' === type ? `${offsetBlur} ${color}` : `${offsetBlur} ${spreed} ${color} ${inset}`;
  return styles || 'none';
};
const getSpaceCSS = space => {
  const {
    side = 2,
    vertical = '0px',
    horizontal = '0px',
    top = '0px',
    right = '0px',
    bottom = '0px',
    left = '0px'
  } = space || {};
  const styles = 2 === side ? `${vertical} ${horizontal}` : `${top} ${right} ${bottom} ${left}`;
  return styles;
};
const getTypoCSS = (selector, typo, isFamily = true) => {
  const {
    fontFamily = 'Default',
    fontCategory = 'sans-serif',
    fontVariant = 400,
    fontWeight = 400,
    isUploadFont = true,
    fontSize = {
      desktop: 15,
      tablet: 15,
      mobile: 15
    },
    fontStyle = 'normal',
    textTransform = 'none',
    textDecoration = 'auto',
    lineHeight = '135%',
    letterSpace = '0px'
  } = typo || {};
  const isEmptyFamily = !isFamily || !fontFamily || 'Default' === fontFamily;
  const desktopFontSize = fontSize?.desktop || fontSize;
  const tabletFontSize = fontSize?.tablet || desktopFontSize;
  const mobileFontSize = fontSize?.mobile || tabletFontSize;
  const styles = `
		${isEmptyFamily ? '' : `font-family: '${fontFamily}', ${fontCategory};`}
		${isValidCSS('font-weight', fontWeight)}
		${isValidCSS('font-size', desktopFontSize ? `${desktopFontSize}px` : '')}
		${isValidCSS('font-style', fontStyle)}
		${isValidCSS('text-transform', textTransform)}
		${isValidCSS('text-decoration', textDecoration)}
		${isValidCSS('line-height', lineHeight)}
		${isValidCSS('letter-spacing', letterSpace)}
	`;

  // Google font link
  const linkQuery = !fontVariant || 400 === fontVariant ? '' : '400i' === fontVariant ? ':ital@1' : fontVariant?.includes('00i') ? `: ital, wght@1, ${fontVariant?.replace('00i', '00')} ` : `: wght@${fontVariant} `;
  const link = isEmptyFamily ? '' : `https://fonts.googleapis.com/css2?family=${fontFamily?.split(' ').join('+')}${linkQuery.replace(/ /g, '')}&display=swap`;
  return {
    googleFontLink: !isUploadFont || isEmptyFamily ? '' : `@import url(${link});`,
    styles: `${selector}{
			${styles}
		}
		${_data__WEBPACK_IMPORTED_MODULE_0__.tabBreakpoint} {
			${selector}{
				${isValidCSS('font-size', tabletFontSize ? `${tabletFontSize}px` : '')}
			}
		}
		${_data__WEBPACK_IMPORTED_MODULE_0__.mobileBreakpoint} {
			${selector}{
				${isValidCSS('font-size', mobileFontSize ? `${mobileFontSize}px` : '')}
			}
		}`.replace(/\s+/g, ' ').trim()
  };
};
const getBoxCSS = val => {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object' && !Array.isArray(val)) {
    const order = ['top', 'right', 'bottom', 'left'];
    const values = order.map(side => val[side] || '');
    const allEmpty = values.every(value => !value);
    return allEmpty ? '' : order.map(side => val[side] || '0').join(' ');
  }
  return '';
};

// Murad Wahid
const getGradientCSS = gradient => {
  const {
    type,
    radialType,
    colors,
    centerPositions,
    angel
  } = gradient || {};
  if (gradient) {
    const gradientColors = colors?.map(({
      color,
      position
    }) => `${color} ${position}%`);
    const liner = `linear-gradient(${angel}deg, ${gradientColors})`;
    const radial = `radial-gradient(${radialType} at ${centerPositions?.x}% ${centerPositions?.y}%,${gradientColors})`;
    return isValidCSS('background', type === 'linear' ? liner : radial);
  }
  return '';
};
const getImagePosition = img => {
  const {
    position = 'center center',
    xPosition = 0,
    yPosition = 0,
    attachment = '',
    repeat = 'no-repeat',
    size = 'cover',
    customSize = '0px'
  } = img || {};
  const cd = v => 'initial' !== v || (0,_functions__WEBPACK_IMPORTED_MODULE_1__.isExist)(v);
  return `
		${cd(position) ? `background-position: ${'custom' === position ? `${xPosition} ${yPosition}` : position};` : ''}
		${attachment && cd(attachment) ? `background-attachment: ${attachment};` : ''}
		${cd(repeat) ? `background-repeat: ${repeat};` : ''}
		${cd(size) ? `background-size: ${'custom' === size ? `${customSize} auto` : size};` : ''}
	`;
};
const getImageCSS = (img = {}) => {
  if (img) {
    return {
      desktop: (0,_functions__WEBPACK_IMPORTED_MODULE_1__.isExist)(img.url) ? `background-image: url(${img.url}); ${getImagePosition(img?.desktop)}` : '',
      tablet: (0,_functions__WEBPACK_IMPORTED_MODULE_1__.isExist)(img.url) ? getImagePosition(img?.tablet) : '',
      mobile: (0,_functions__WEBPACK_IMPORTED_MODULE_1__.isExist)(img.url) ? getImagePosition(img?.mobile) : ''
    };
  }
  return '';
};
const getVideoCSS = (video, selector) => {
  const {
    url,
    loop
  } = video || {};
  const parentEl = document.querySelector(selector);
  const el = parentEl?.querySelector('.bPlVideo');
  const videoEl = document.createElement('video');
  videoEl.muted = true;
  videoEl.autoplay = true;
  videoEl.classList.add('bPlVideo');
  if (!el) {
    if (parentEl && url) {
      videoEl.innerHTML = `<source src=${url}></source>`;
      parentEl.appendChild(videoEl);
    }
  }
  videoEl.loop = loop;
  videoEl.play();
  return `${selector} .bPlVideo{
		left: 0;
		min-height: 100%;
		min-width: 100%;
		position: absolute;
		width: -webkit-fill-available;
		top: 0;
		z-index: 0;
	}`;
};
const getAdvBGCSS = (background, selector, isHover = false) => {
  const {
    type = 'color',
    color,
    gradient,
    img,
    video
  } = background || {};
  const bgCSS = type === 'color' ? isValidCSS('background', color) : type === 'gradient' ? getGradientCSS(gradient) : type === 'image' ? getImageCSS(img).desktop : '';
  const tablet = type === 'image' ? getImageCSS(img).tablet : '';
  const mobile = type === 'image' ? getImageCSS(img).mobile : '';
  const sl = isHover ? `${selector}:hover` : selector;
  return `
		${type === 'video' ? getVideoCSS(video, selector) : ''}

		${sl}{
			${bgCSS}
		}

		${_data__WEBPACK_IMPORTED_MODULE_0__.tabBreakpoint} {
			${sl}{
				${tablet}
			}
		}
		${_data__WEBPACK_IMPORTED_MODULE_0__.mobileBreakpoint} {
			${sl}{
				${mobile}
			}
		}
	`.replace(/\s+/g, ' ').trim();
};
const getOverlayCSS = (overlay, selector, isHover = false) => {
  const {
    isEnabled,
    colors,
    opacity = 1,
    blend,
    filter = '',
    blur = 0,
    brightness = 100,
    contrast = 100,
    saturation = 100,
    hue = 0
  } = overlay || {};
  const filterCSSValue = `${100 !== brightness ? `brightness(${brightness}%)` : ''} ${100 !== contrast ? `contrast(${contrast}%)` : ''} ${100 !== saturation ? `saturate(${saturation}%)` : ''} ${0 !== blur ? `blur(${blur}px)` : ''} ${0 !== hue ? `hue-rotate(${hue}deg)` : ''}`;
  const filterCSS = `${filter}: ${filter ? filterCSSValue : ''}; -webkit-${filter}: ${filter ? filterCSSValue : ''};`;
  const sl = isHover ? `${selector}:hover::after` : `${selector}::after`;
  return isEnabled ? `
		${selector}::after{
			content: '';
			position: absolute;
			inset: 0;
		}
		${getAdvBGCSS(colors, sl, false)}
		${sl}{
			${isValidCSS('opacity', opacity)}
			${isValidCSS('mix-blend-mode', blend)}
			${filterCSS}
		}
	`.replace(/\s+/g, ' ').trim() : '';
};

/***/ }),

/***/ "./src/instagram/Components/Common/Style.js":
/*!**************************************************!*\
  !*** ./src/instagram/Components/Common/Style.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bpl_tools_utils_getCSS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../bpl-tools/utils/getCSS */ "../bpl-tools/utils/getCSS.js");


const Style = ({
  attributes,
  clientId
}) => {
  const {
    cId,
    columnGap,
    rowGap,
    profileInfo,
    background,
    padding,
    border,
    followBtnColors,
    followBtnHovColors,
    captionBG,
    captionTypo,
    captionColor
  } = attributes;
  const {
    photoSize = '55px',
    popupPhotoSize = '40px',
    userNameColor = '#4527a4',
    followersColor,
    followsColor,
    nameColor,
    bioColor
  } = profileInfo || {};
  const feedSl = `#ifbInstagramFeed-${clientId} .ifbInstagramFeed`;
  const galleryItemSl = `${feedSl} .galleryItem`;
  const profileSl = `${feedSl} .ifbProfile`;
  const popupSl = `.ifbPopupContent-${cId}`;
  const popupProfileSl = `${popupSl} .ifbProfile`;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", {
    dangerouslySetInnerHTML: {
      __html: `
		${(0,_bpl_tools_utils_getCSS__WEBPACK_IMPORTED_MODULE_1__.getTypoCSS)('', captionTypo)?.googleFontLink}
		${(0,_bpl_tools_utils_getCSS__WEBPACK_IMPORTED_MODULE_1__.getTypoCSS)(`${galleryItemSl} .caption p`, captionTypo)?.styles}

		${feedSl}{
			${(0,_bpl_tools_utils_getCSS__WEBPACK_IMPORTED_MODULE_1__.getBackgroundCSS)(background)}
			padding: ${(0,_bpl_tools_utils_getCSS__WEBPACK_IMPORTED_MODULE_1__.getSpaceCSS)(padding)};
			${(0,_bpl_tools_utils_getCSS__WEBPACK_IMPORTED_MODULE_1__.getBorderCSS)(border)}
		}
		${popupSl}{
			${(0,_bpl_tools_utils_getCSS__WEBPACK_IMPORTED_MODULE_1__.getBackgroundCSS)(background)}
		}
		${feedSl} .galleryHeader{
			margin-bottom: ${rowGap};
		}

		${profileSl} .profileImg  {
			width: ${photoSize};
			min-width: ${photoSize};
			height: ${photoSize};
		}
		${popupProfileSl} .profileImg{
			width: ${popupPhotoSize};
			min-width: ${popupPhotoSize};
			height: ${popupPhotoSize};
		}
		${profileSl} .userName, ${popupProfileSl} .userName {
			color: ${userNameColor};
		}
		${profileSl} .follow .followers, ${popupProfileSl} .follow .followers {
			color: ${followersColor};
		}
		${profileSl} .follow .following, ${popupProfileSl} .follow .following {
			color: ${followsColor};
		}
		${profileSl} .name, ${popupProfileSl} .name {
			color: ${nameColor};
		}
		${profileSl} .biography, ${popupProfileSl} .biography {
			color: ${bioColor};
		}

		${feedSl} .followBtn{
			${(0,_bpl_tools_utils_getCSS__WEBPACK_IMPORTED_MODULE_1__.getColorsCSS)(followBtnColors || {
        color: '#fff',
        bg: '#4527a4'
      })}
		}
		${feedSl} .followBtn:hover{
			${(0,_bpl_tools_utils_getCSS__WEBPACK_IMPORTED_MODULE_1__.getColorsCSS)(followBtnHovColors || {
        color: '#fff',
        bg: '#8344c5'
      })}
		}

		${feedSl} .ifbGallery{
			grid-gap: ${rowGap} ${columnGap};
		}
		${galleryItemSl} figure .caption{
			${(0,_bpl_tools_utils_getCSS__WEBPACK_IMPORTED_MODULE_1__.getBackgroundCSS)(captionBG)}
		}
		${galleryItemSl} .caption p{
			color: ${captionColor};
		}
		`.replace(/\s+/g, ' ')
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Style);

/***/ }),

/***/ "./src/instagram/Components/Elements/FollowBtn.js":
/*!********************************************************!*\
  !*** ./src/instagram/Components/Elements/FollowBtn.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const FollowBtn = ({
  attributes,
  username
}) => {
  const {
    isFollowBtn
  } = attributes;
  const link = `https://www.instagram.com/${username}`;
  return isFollowBtn && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "followBtn",
    href: link,
    target: "_blank",
    rel: "noreferrer"
  }, "Follow On Instagram");
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FollowBtn);

/***/ }),

/***/ "./src/instagram/Components/Elements/Profile.js":
/*!******************************************************!*\
  !*** ./src/instagram/Components/Elements/Profile.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const Profile = ({
  attributes,
  user
}) => {
  console.log(user);
  const {
    isProfile,
    profileImg,
    profileInfo
  } = attributes;
  const {
    isFollowers,
    isFollows,
    isName,
    name: nameText,
    isBio,
    bio
  } = profileInfo || {};
  const {
    username,
    profile_picture_url,
    name,
    biography,
    followers_count,
    follows_count
  } = user;
  const link = `https://www.instagram.com/${username}`;
  return isProfile && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ifbProfile"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "profileImg",
    href: link,
    target: "_blank",
    rel: "noreferrer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: profile_picture_url || profileImg,
    alt: username
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "profileText"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "userName",
    href: link,
    target: "_blank",
    rel: "noreferrer"
  }, "@", username), isName && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "name"
  }, name ? name : nameText), isBio && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "biography"
  }, biography ? biography : bio)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Profile);

/***/ }),

/***/ "./src/instagram/Components/GalleryLoading.js":
/*!****************************************************!*\
  !*** ./src/instagram/Components/GalleryLoading.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GalleryLoading: () => (/* binding */ GalleryLoading),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const GalleryLoading = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "galleryLoading"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "galleryLoadingItem"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "galleryLoadingItem"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "galleryLoadingItem"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "galleryLoadingItem"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "galleryLoadingItem"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "galleryLoadingItem"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "galleryLoadingItem"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "galleryLoadingItem"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "galleryLoadingItem"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "galleryLoadingItem"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "galleryLoadingItem"
}), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
  className: "galleryLoadingItem"
}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GalleryLoading);

/***/ }),

/***/ "./src/instagram/Components/Gallery/Item.js":
/*!**************************************************!*\
  !*** ./src/instagram/Components/Gallery/Item.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Elements_Profile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Elements/Profile */ "./src/instagram/Components/Elements/Profile.js");
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/functions */ "./src/instagram/utils/functions.js");
/* harmony import */ var _utils_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/icons */ "./src/instagram/utils/icons.js");





const Item = ({
  attributes,
  user,
  feed,
  index
}) => {
  const {
    cId,
    isPopup,
    isLink,
    isLinkNewTab,
    isCaption,
    isRemCaptionHash,
    captionLength,
    imgHoverEffect,
    captionStyle
  } = attributes;
  const {
    id,
    media_type,
    media_url,
    thumbnail_url = '',
    caption,
    permalink
  } = feed; // timestamp present in data

  // FancyBox
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    Fancybox.bind(`[data-fancybox='ifbPopup-${cId}']`, {
      Toolbar: {
        display: ['slideshow', 'counter', 'zoomIn', 'zoomOut', 'fullscreen', 'thumbs', 'close']
      },
      Thumbs: {
        autoStart: true
      }
    });
  }, []);

  // Components
  const LinkCheck = ({
    children
  }) => isLink ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: permalink,
    target: isLinkNewTab ? '_blank' : '_self',
    rel: "noreferrer"
  }, children) : children;
  const Image = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: 'VIDEO' === media_type ? thumbnail_url : media_url,
    alt: caption
  });
  const Caption = () => isCaption && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `caption ${captionStyle}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    dangerouslySetInnerHTML: {
      __html: isRemCaptionHash ? (0,_utils_functions__WEBPACK_IMPORTED_MODULE_2__.truncate)((0,_utils_functions__WEBPACK_IMPORTED_MODULE_2__.remHashtag)(caption), captionLength) : (0,_utils_functions__WEBPACK_IMPORTED_MODULE_2__.addHashtagLinks)((0,_utils_functions__WEBPACK_IMPORTED_MODULE_2__.truncate)(caption, captionLength))
    }
  }));
  const Figure = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("figure", {
    className: imgHoverEffect
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Image, null), 'IMAGE' !== media_type && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "typeIcon"
  }, 'VIDEO' === media_type ? _utils_icons__WEBPACK_IMPORTED_MODULE_3__.playIcon : _utils_icons__WEBPACK_IMPORTED_MODULE_3__.carouselIcon), captionStyle.includes('overlay') && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Caption, null));
  const ItemInner = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Figure, null), 'bottom' === captionStyle && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Caption, null));
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: id,
    className: "galleryItem",
    id: `galleryItem-${index}`
  }, isPopup ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: `ifbPopupContent-${cId}-${id}`,
    className: `ifbPopupContent-${cId} ifbPopupContent`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "contentArea"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "media"
  }, 'IMAGE' === media_type && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: media_url,
    alt: caption
  }), 'VIDEO' === media_type && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("video", {
    controls: true,
    poster: thumbnail_url
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("source", {
    src: media_url
  })), 'CAROUSEL_ALBUM' === media_type && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(CarouselItem, {
    feed: feed
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "text"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Elements_Profile__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    user: user
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "caption",
    dangerouslySetInnerHTML: {
      __html: (0,_utils_functions__WEBPACK_IMPORTED_MODULE_2__.addHashtagLinks)(caption)
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "info"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "link",
    href: permalink,
    target: "_blank",
    rel: "noreferrer nofollow noopener"
  }, " ", (0,_utils_icons__WEBPACK_IMPORTED_MODULE_3__.instagramIcon)('#fff', 18), " View on Instagram"))))) : null, isPopup ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: 'VIDEO' === media_type ? thumbnail_url : media_url,
    "data-fancybox": `ifbPopup-${cId}`,
    "data-src": `#ifbPopupContent-${cId}-${id}`,
    "data-caption": caption
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ItemInner, null)) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(LinkCheck, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ItemInner, null)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Item);
const CarouselItem = ({
  feed
}) => {
  const {
    caption,
    children = {}
  } = feed;
  const carousel = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const slidePrev = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const slideNext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // useEffect(() => {
  // 	if (carousel?.current && slidePrev?.current && slideNext?.current) {
  // 		new Swiper(carousel?.current, {
  // 			speed: 400,
  // 			slidesPerView: 1,
  // 			spaceBetween: 0,
  // 			navigation: {
  // 				prevEl: slidePrev?.current,
  // 				nextEl: slideNext?.current,
  // 			}
  // 		});
  // 	}
  // }, [carousel?.current, slidePrev?.current, slideNext?.current]);

  const Slide = ({
    child
  }) => {
    const {
      media_url,
      thumbnail_url = ''
    } = child;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "swiper-slide"
    }, thumbnail_url ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("video", {
      controls: true,
      poster: thumbnail_url
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("source", {
      src: media_url
    })) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: media_url,
      alt: caption?.split(' ').slice(0, 12).join(' ')
    }));
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ifbCarousel",
    ref: carousel
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "swiper-wrapper"
  }, children?.data.map(child => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Slide, {
    key: child.id,
    child: child
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "swiper-button-prev",
    ref: slidePrev
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24px",
    height: "24px",
    viewBox: "0 0 24 24"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M14.71 15.88L10.83 12l3.88-3.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "swiper-button-next",
    ref: slideNext
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24px",
    height: "24px",
    viewBox: "0 0 24 24"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"
  }))));
};

/***/ }),

/***/ "./src/instagram/Feeds.js":
/*!********************************!*\
  !*** ./src/instagram/Feeds.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_useInstagram__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hooks/useInstagram */ "./src/instagram/hooks/useInstagram.js");
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/functions */ "./src/instagram/utils/functions.js");
/* harmony import */ var _Components_GalleryLoading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Components/GalleryLoading */ "./src/instagram/Components/GalleryLoading.js");
/* harmony import */ var _GalleryHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GalleryHeader */ "./src/instagram/GalleryHeader.js");
/* harmony import */ var _Gallery__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Gallery */ "./src/instagram/Gallery.js");
/* harmony import */ var _Components_Elements_FollowBtn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Components/Elements/FollowBtn */ "./src/instagram/Components/Elements/FollowBtn.js");







const Feeds = ({
  attributes,
  pageNumber,
  setPageNumber
}) => {
  const {
    itemVisible,
    isFollowBtn,
    isFollowBtnInFooter,
    isLoadMore
  } = attributes;
  const {
    users,
    usersData,
    loading
  } = (0,_hooks_useInstagram__WEBPACK_IMPORTED_MODULE_1__["default"])(attributes);
  if (loading) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_GalleryLoading__WEBPACK_IMPORTED_MODULE_3__["default"], null);
  }
  const user = users?.[0] || {};
  const {
    username
  } = user;
  const userData = username && usersData && (0,_utils_functions__WEBPACK_IMPORTED_MODULE_2__.hasObjProperty)(usersData, username) ? usersData[username] : {};
  const {
    media
  } = userData || {};
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "ifbInstagramFeed"
  }, !(0,_utils_functions__WEBPACK_IMPORTED_MODULE_2__.isEmptyObject)(userData) ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_GalleryHeader__WEBPACK_IMPORTED_MODULE_4__["default"], {
    user: user,
    attributes: attributes
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Gallery__WEBPACK_IMPORTED_MODULE_5__["default"], {
    attributes: attributes,
    user: user,
    feeds: media,
    pageNumber: pageNumber
  }), isLoadMore || isFollowBtn && isFollowBtnInFooter ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "galleyFooter"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: `loadMoreBtn ${media?.length > itemVisible * pageNumber ? 'visible' : 'hidden'}`,
    onClick: () => setPageNumber(pageNumber + 1)
  }, "Load More"), isFollowBtnInFooter && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Elements_FollowBtn__WEBPACK_IMPORTED_MODULE_6__["default"], {
    attributes: attributes,
    username: username
  })) : null) : '');
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Feeds);

/***/ }),

/***/ "./src/instagram/Gallery.js":
/*!**********************************!*\
  !*** ./src/instagram/Gallery.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_Gallery_Item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Components/Gallery/Item */ "./src/instagram/Components/Gallery/Item.js");


const Gallery = ({
  attributes,
  user,
  feeds,
  pageNumber
}) => {
  const {
    columns
  } = attributes;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `ifbGallery columns-${columns.desktop} columns-tablet-${columns.tablet} columns-mobile-${columns.mobile}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Items, {
    attributes: attributes,
    user: user,
    feeds: feeds,
    pageNumber: pageNumber
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gallery);
const Items = ({
  attributes,
  user,
  feeds,
  pageNumber
}) => {
  const {
    itemVisible
  } = attributes;
  return feeds?.length && feeds?.slice(0, itemVisible * pageNumber)?.map((feed, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Gallery_Item__WEBPACK_IMPORTED_MODULE_1__["default"], {
    key: feed.id,
    attributes: attributes,
    user: user,
    feed: feed,
    index: index
  }));
};

/***/ }),

/***/ "./src/instagram/GalleryHeader.js":
/*!****************************************!*\
  !*** ./src/instagram/GalleryHeader.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_Elements_Profile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Components/Elements/Profile */ "./src/instagram/Components/Elements/Profile.js");
/* harmony import */ var _Components_Elements_FollowBtn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Components/Elements/FollowBtn */ "./src/instagram/Components/Elements/FollowBtn.js");



const GalleryHeader = ({
  user,
  attributes
}) => {
  const {
    username
  } = user || {};
  const {
    isProfile,
    isFollowBtn,
    isFollowBtnInFooter
  } = attributes;
  return isProfile || isFollowBtn && !isFollowBtnInFooter ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "galleryHeader"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Elements_Profile__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    user: user
  }), !isFollowBtnInFooter && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Elements_FollowBtn__WEBPACK_IMPORTED_MODULE_2__["default"], {
    attributes: attributes,
    username: username
  })) : null;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GalleryHeader);

/***/ }),

/***/ "./src/instagram/hooks/useInstagram.js":
/*!*********************************************!*\
  !*** ./src/instagram/hooks/useInstagram.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/fetch */ "./src/instagram/utils/fetch.js");


const useInstagram = attributes => {
  const {
    accounts,
    accessToken
  } = attributes;
  const [users, setUsers] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [usersData, setUsersData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const fetchData = async () => {
      console.log("Fetch Data");
      try {
        setLoading(true);
        const data = await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_1__.fetchTransientData)();
        const {
          users = [],
          usersData = {}
        } = data;
        const fUsers = users.filter(u => accounts.some(a => a.user_id == parseInt(u.id)));
        const fUsersData = Object.fromEntries(Object.entries(usersData).filter(([key]) => fUsers.some(user => user.username === key)));
        if (fUsers?.length) {
          setUsers(fUsers);
          setUsersData(fUsersData);
        } else {
          if (accessToken?.[0]) {
            (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_1__.fetchUserWithData)(accessToken[0]).then(data => {
              const {
                user,
                userData
              } = data || {};
              setUsers([user]);
              setUsersData(userData);
            });
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [accounts, accessToken]);
  return {
    users,
    usersData,
    loading
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useInstagram);

/***/ }),

/***/ "./src/instagram/utils/fetch.js":
/*!**************************************!*\
  !*** ./src/instagram/utils/fetch.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearCache: () => (/* binding */ clearCache),
/* harmony export */   fetchTransientData: () => (/* binding */ fetchTransientData),
/* harmony export */   fetchUserWithData: () => (/* binding */ fetchUserWithData)
/* harmony export */ });
const $ = jQuery;
const fetchTransientData = () => new Promise((resolve, reject) => {
  $.ajax({
    url: ifbLocal?.ajaxURL,
    type: 'POST',
    data: {
      action: 'ifbAjaxRequest'
    },
    success: res => resolve(res?.data),
    error: err => reject(err)
  });
});
const clearCache = () => {
  $.ajax({
    url: ifbLocal?.ajaxURL,
    type: 'POST',
    data: {
      action: 'ifbDeleteTransient'
    },
    success: () => {
      // eslint-disable-next-line no-console
      console.log('Cached cleared!');
    },
    error: error => {
      // eslint-disable-next-line no-console
      console.error('Error on clear cache:', error);
    }
  });
};
const fetchUserWithData = async token => {
  const user = await fetch(`https://graph.instagram.com/me?fields=id,username,media_count,account_type&access_token=${token}`).then(res => res?.json());
  const data = await fetch(`https://graph.instagram.com/me/media?fields=id,username,media_type,media_url,thumbnail_url,caption,permalink,timestamp,children{id,media_type,media_url,thumbnail_url,permalink,timestamp}&access_token=${token}&limit=100`).then(res => res?.json());
  // const data = await fetch(`https://graph.instagram.com/me/media?fields=id,username,media_type,media_url,thumbnail_url,caption,permalink,timestamp,comments_count,like_count,children{id,media_type,media_url,thumbnail_url,permalink,timestamp}&access_token=${token}&limit=100`).then(res => res?.json());

  console.log(data);
  return {
    user,
    userData: {
      [user?.username]: {
        media: data?.data,
        page: data?.paging?.cursors
      }
    }
  };
};

/***/ }),

/***/ "./src/instagram/utils/functions.js":
/*!******************************************!*\
  !*** ./src/instagram/utils/functions.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addHashtagLinks: () => (/* binding */ addHashtagLinks),
/* harmony export */   generateString: () => (/* binding */ generateString),
/* harmony export */   hasIdInAccounts: () => (/* binding */ hasIdInAccounts),
/* harmony export */   hasObjProperty: () => (/* binding */ hasObjProperty),
/* harmony export */   isEmptyObject: () => (/* binding */ isEmptyObject),
/* harmony export */   isSameArray: () => (/* binding */ isSameArray),
/* harmony export */   popupOpen: () => (/* binding */ popupOpen),
/* harmony export */   remHashtag: () => (/* binding */ remHashtag),
/* harmony export */   truncate: () => (/* binding */ truncate)
/* harmony export */ });
// export const isEmptyObject = obj => obj && Object.keys(obj).length === 0 && obj.constructor === Object;

const hasObjProperty = (obj, property) => Object.prototype.hasOwnProperty.call(obj, property);
const isEmptyObject = obj => {
  for (var key in obj) {
    if (hasObjProperty(obj, key)) {
      return false;
    }
  }
  return true;
};
const truncate = (text = '', length) => text.length > length ? `${text.slice(0, length)}...` : text;
const popupOpen = (url, width, height, cb) => {
  const top = top || screen.height / 2 - height / 2;
  const left = left || screen.width / 2 - width / 2;
  const win = window.open(url, '', `location=1,status=1,resizable=yes,width=${width},height=${height},top=${top},left=${left}`);
  const check = () => {
    if (!win || win.closed != false) {
      cb();
    } else {
      setTimeout(check, 100);
    }
  };
  setTimeout(check, 100);
};
const generateString = length => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result.trim();
};
const isSameArray = (array1, array2, key) => {
  if (array1.length !== array2.length) {
    return false;
  }
  for (var i = 0; i < array1.length; i++) {
    if (array1[i][key] !== array2[i][key]) {
      return false;
    }
  }
  return true;
};
const hasIdInAccounts = (accounts = [], user_id) => accounts?.map(a => a.user_id)?.includes(user_id);
const addHashtagLinks = (caption = '') => {
  const hashtagRegex = /#[\w]+/g;
  const linkedText = caption?.replace(hashtagRegex, match => {
    const hashtag = match.slice(1);
    const link = `<a href='https://www.instagram.com/explore/tags/${hashtag}' target='_blank' rel='noreferrer nofollow noopener'>${match}</a>`;
    return link;
  });
  return linkedText;
};
const remHashtag = (caption = '') => {
  return caption.replace(/#[\w]+/g, '').trim().replace(/\s\s+/g, ' ');
};

/***/ }),

/***/ "./src/instagram/utils/icons.js":
/*!**************************************!*\
  !*** ./src/instagram/utils/icons.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   carouselIcon: () => (/* binding */ carouselIcon),
/* harmony export */   instagramIcon: () => (/* binding */ instagramIcon),
/* harmony export */   playIcon: () => (/* binding */ playIcon)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const instagramIcon = (color = '#4527a4', size = 24) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 448 512",
  width: size,
  height: size
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  fill: color,
  d: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
}));
const carouselIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 48 48",
  width: 22,
  height: 22,
  fill: "#fff"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z"
}));
const playIcon = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: 20,
  height: 20,
  fill: "#fff"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
  d: "M5.888 22.5a3.46 3.46 0 0 1-1.721-.46l-.003-.002a3.451 3.451 0 0 1-1.72-2.982V4.943a3.445 3.445 0 0 1 5.163-2.987l12.226 7.059a3.444 3.444 0 0 1-.001 5.967l-12.22 7.056a3.462 3.462 0 0 1-1.724.462Z"
}));

/***/ }),

/***/ "./src/instagram/style.scss":
/*!**********************************!*\
  !*** ./src/instagram/style.scss ***!
  \**********************************/
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

/***/ }),

/***/ "../bpl-tools/node_modules/immer/dist/immer.mjs":
/*!******************************************************!*\
  !*** ../bpl-tools/node_modules/immer/dist/immer.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Immer: () => (/* binding */ Immer2),
/* harmony export */   applyPatches: () => (/* binding */ applyPatches),
/* harmony export */   castDraft: () => (/* binding */ castDraft),
/* harmony export */   castImmutable: () => (/* binding */ castImmutable),
/* harmony export */   createDraft: () => (/* binding */ createDraft),
/* harmony export */   current: () => (/* binding */ current),
/* harmony export */   enableMapSet: () => (/* binding */ enableMapSet),
/* harmony export */   enablePatches: () => (/* binding */ enablePatches),
/* harmony export */   finishDraft: () => (/* binding */ finishDraft),
/* harmony export */   freeze: () => (/* binding */ freeze),
/* harmony export */   immerable: () => (/* binding */ DRAFTABLE),
/* harmony export */   isDraft: () => (/* binding */ isDraft),
/* harmony export */   isDraftable: () => (/* binding */ isDraftable),
/* harmony export */   nothing: () => (/* binding */ NOTHING),
/* harmony export */   original: () => (/* binding */ original),
/* harmony export */   produce: () => (/* binding */ produce),
/* harmony export */   produceWithPatches: () => (/* binding */ produceWithPatches),
/* harmony export */   setAutoFreeze: () => (/* binding */ setAutoFreeze),
/* harmony export */   setUseStrictShallowCopy: () => (/* binding */ setUseStrictShallowCopy)
/* harmony export */ });
// src/utils/env.ts
var NOTHING = Symbol.for("immer-nothing");
var DRAFTABLE = Symbol.for("immer-draftable");
var DRAFT_STATE = Symbol.for("immer-state");

// src/utils/errors.ts
var errors =  true ? [
  // All error codes, starting by 0:
  function(plugin) {
    return `The plugin for '${plugin}' has not been loaded into Immer. To enable the plugin, import and call \`enable${plugin}()\` when initializing your application.`;
  },
  function(thing) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${thing}'`;
  },
  "This object has been frozen and should not be mutated",
  function(data) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + data;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(thing) {
    return `'current' expects a draft, got: ${thing}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(thing) {
    return `'original' expects a draft, got: ${thing}`;
  }
  // Note: if more errors are added, the errorOffset in Patches.ts should be increased
  // See Patches.ts for additional errors
] : 0;
function die(error, ...args) {
  if (true) {
    const e = errors[error];
    const msg = typeof e === "function" ? e.apply(null, args) : e;
    throw new Error(`[Immer] ${msg}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`
  );
}

// src/utils/common.ts
var getPrototypeOf = Object.getPrototypeOf;
function isDraft(value) {
  return !!value && !!value[DRAFT_STATE];
}
function isDraftable(value) {
  if (!value)
    return false;
  return isPlainObject(value) || Array.isArray(value) || !!value[DRAFTABLE] || !!value.constructor?.[DRAFTABLE] || isMap(value) || isSet(value);
}
var objectCtorString = Object.prototype.constructor.toString();
function isPlainObject(value) {
  if (!value || typeof value !== "object")
    return false;
  const proto = getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  const Ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  if (Ctor === Object)
    return true;
  return typeof Ctor == "function" && Function.toString.call(Ctor) === objectCtorString;
}
function original(value) {
  if (!isDraft(value))
    die(15, value);
  return value[DRAFT_STATE].base_;
}
function each(obj, iter) {
  if (getArchtype(obj) === 0 /* Object */) {
    Reflect.ownKeys(obj).forEach((key) => {
      iter(key, obj[key], obj);
    });
  } else {
    obj.forEach((entry, index) => iter(index, entry, obj));
  }
}
function getArchtype(thing) {
  const state = thing[DRAFT_STATE];
  return state ? state.type_ : Array.isArray(thing) ? 1 /* Array */ : isMap(thing) ? 2 /* Map */ : isSet(thing) ? 3 /* Set */ : 0 /* Object */;
}
function has(thing, prop) {
  return getArchtype(thing) === 2 /* Map */ ? thing.has(prop) : Object.prototype.hasOwnProperty.call(thing, prop);
}
function get(thing, prop) {
  return getArchtype(thing) === 2 /* Map */ ? thing.get(prop) : thing[prop];
}
function set(thing, propOrOldValue, value) {
  const t = getArchtype(thing);
  if (t === 2 /* Map */)
    thing.set(propOrOldValue, value);
  else if (t === 3 /* Set */) {
    thing.add(value);
  } else
    thing[propOrOldValue] = value;
}
function is(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
function isMap(target) {
  return target instanceof Map;
}
function isSet(target) {
  return target instanceof Set;
}
function latest(state) {
  return state.copy_ || state.base_;
}
function shallowCopy(base, strict) {
  if (isMap(base)) {
    return new Map(base);
  }
  if (isSet(base)) {
    return new Set(base);
  }
  if (Array.isArray(base))
    return Array.prototype.slice.call(base);
  const isPlain = isPlainObject(base);
  if (strict === true || strict === "class_only" && !isPlain) {
    const descriptors = Object.getOwnPropertyDescriptors(base);
    delete descriptors[DRAFT_STATE];
    let keys = Reflect.ownKeys(descriptors);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const desc = descriptors[key];
      if (desc.writable === false) {
        desc.writable = true;
        desc.configurable = true;
      }
      if (desc.get || desc.set)
        descriptors[key] = {
          configurable: true,
          writable: true,
          // could live with !!desc.set as well here...
          enumerable: desc.enumerable,
          value: base[key]
        };
    }
    return Object.create(getPrototypeOf(base), descriptors);
  } else {
    const proto = getPrototypeOf(base);
    if (proto !== null && isPlain) {
      return { ...base };
    }
    const obj = Object.create(proto);
    return Object.assign(obj, base);
  }
}
function freeze(obj, deep = false) {
  if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj))
    return obj;
  if (getArchtype(obj) > 1) {
    obj.set = obj.add = obj.clear = obj.delete = dontMutateFrozenCollections;
  }
  Object.freeze(obj);
  if (deep)
    Object.entries(obj).forEach(([key, value]) => freeze(value, true));
  return obj;
}
function dontMutateFrozenCollections() {
  die(2);
}
function isFrozen(obj) {
  return Object.isFrozen(obj);
}

// src/utils/plugins.ts
var plugins = {};
function getPlugin(pluginKey) {
  const plugin = plugins[pluginKey];
  if (!plugin) {
    die(0, pluginKey);
  }
  return plugin;
}
function loadPlugin(pluginKey, implementation) {
  if (!plugins[pluginKey])
    plugins[pluginKey] = implementation;
}

// src/core/scope.ts
var currentScope;
function getCurrentScope() {
  return currentScope;
}
function createScope(parent_, immer_) {
  return {
    drafts_: [],
    parent_,
    immer_,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: true,
    unfinalizedDrafts_: 0
  };
}
function usePatchesInScope(scope, patchListener) {
  if (patchListener) {
    getPlugin("Patches");
    scope.patches_ = [];
    scope.inversePatches_ = [];
    scope.patchListener_ = patchListener;
  }
}
function revokeScope(scope) {
  leaveScope(scope);
  scope.drafts_.forEach(revokeDraft);
  scope.drafts_ = null;
}
function leaveScope(scope) {
  if (scope === currentScope) {
    currentScope = scope.parent_;
  }
}
function enterScope(immer2) {
  return currentScope = createScope(currentScope, immer2);
}
function revokeDraft(draft) {
  const state = draft[DRAFT_STATE];
  if (state.type_ === 0 /* Object */ || state.type_ === 1 /* Array */)
    state.revoke_();
  else
    state.revoked_ = true;
}

// src/core/finalize.ts
function processResult(result, scope) {
  scope.unfinalizedDrafts_ = scope.drafts_.length;
  const baseDraft = scope.drafts_[0];
  const isReplaced = result !== void 0 && result !== baseDraft;
  if (isReplaced) {
    if (baseDraft[DRAFT_STATE].modified_) {
      revokeScope(scope);
      die(4);
    }
    if (isDraftable(result)) {
      result = finalize(scope, result);
      if (!scope.parent_)
        maybeFreeze(scope, result);
    }
    if (scope.patches_) {
      getPlugin("Patches").generateReplacementPatches_(
        baseDraft[DRAFT_STATE].base_,
        result,
        scope.patches_,
        scope.inversePatches_
      );
    }
  } else {
    result = finalize(scope, baseDraft, []);
  }
  revokeScope(scope);
  if (scope.patches_) {
    scope.patchListener_(scope.patches_, scope.inversePatches_);
  }
  return result !== NOTHING ? result : void 0;
}
function finalize(rootScope, value, path) {
  if (isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  if (!state) {
    each(
      value,
      (key, childValue) => finalizeProperty(rootScope, state, value, key, childValue, path)
    );
    return value;
  }
  if (state.scope_ !== rootScope)
    return value;
  if (!state.modified_) {
    maybeFreeze(rootScope, state.base_, true);
    return state.base_;
  }
  if (!state.finalized_) {
    state.finalized_ = true;
    state.scope_.unfinalizedDrafts_--;
    const result = state.copy_;
    let resultEach = result;
    let isSet2 = false;
    if (state.type_ === 3 /* Set */) {
      resultEach = new Set(result);
      result.clear();
      isSet2 = true;
    }
    each(
      resultEach,
      (key, childValue) => finalizeProperty(rootScope, state, result, key, childValue, path, isSet2)
    );
    maybeFreeze(rootScope, result, false);
    if (path && rootScope.patches_) {
      getPlugin("Patches").generatePatches_(
        state,
        path,
        rootScope.patches_,
        rootScope.inversePatches_
      );
    }
  }
  return state.copy_;
}
function finalizeProperty(rootScope, parentState, targetObject, prop, childValue, rootPath, targetIsSet) {
  if ( true && childValue === targetObject)
    die(5);
  if (isDraft(childValue)) {
    const path = rootPath && parentState && parentState.type_ !== 3 /* Set */ && // Set objects are atomic since they have no keys.
    !has(parentState.assigned_, prop) ? rootPath.concat(prop) : void 0;
    const res = finalize(rootScope, childValue, path);
    set(targetObject, prop, res);
    if (isDraft(res)) {
      rootScope.canAutoFreeze_ = false;
    } else
      return;
  } else if (targetIsSet) {
    targetObject.add(childValue);
  }
  if (isDraftable(childValue) && !isFrozen(childValue)) {
    if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
      return;
    }
    finalize(rootScope, childValue);
    if ((!parentState || !parentState.scope_.parent_) && typeof prop !== "symbol" && Object.prototype.propertyIsEnumerable.call(targetObject, prop))
      maybeFreeze(rootScope, childValue);
  }
}
function maybeFreeze(scope, value, deep = false) {
  if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
    freeze(value, deep);
  }
}

// src/core/proxy.ts
function createProxyProxy(base, parent) {
  const isArray = Array.isArray(base);
  const state = {
    type_: isArray ? 1 /* Array */ : 0 /* Object */,
    // Track which produce call this is associated with.
    scope_: parent ? parent.scope_ : getCurrentScope(),
    // True for both shallow and deep changes.
    modified_: false,
    // Used during finalization.
    finalized_: false,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: parent,
    // The base state.
    base_: base,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: false
  };
  let target = state;
  let traps = objectTraps;
  if (isArray) {
    target = [state];
    traps = arrayTraps;
  }
  const { revoke, proxy } = Proxy.revocable(target, traps);
  state.draft_ = proxy;
  state.revoke_ = revoke;
  return proxy;
}
var objectTraps = {
  get(state, prop) {
    if (prop === DRAFT_STATE)
      return state;
    const source = latest(state);
    if (!has(source, prop)) {
      return readPropFromProto(state, source, prop);
    }
    const value = source[prop];
    if (state.finalized_ || !isDraftable(value)) {
      return value;
    }
    if (value === peek(state.base_, prop)) {
      prepareCopy(state);
      return state.copy_[prop] = createProxy(value, state);
    }
    return value;
  },
  has(state, prop) {
    return prop in latest(state);
  },
  ownKeys(state) {
    return Reflect.ownKeys(latest(state));
  },
  set(state, prop, value) {
    const desc = getDescriptorFromProto(latest(state), prop);
    if (desc?.set) {
      desc.set.call(state.draft_, value);
      return true;
    }
    if (!state.modified_) {
      const current2 = peek(latest(state), prop);
      const currentState = current2?.[DRAFT_STATE];
      if (currentState && currentState.base_ === value) {
        state.copy_[prop] = value;
        state.assigned_[prop] = false;
        return true;
      }
      if (is(value, current2) && (value !== void 0 || has(state.base_, prop)))
        return true;
      prepareCopy(state);
      markChanged(state);
    }
    if (state.copy_[prop] === value && // special case: handle new props with value 'undefined'
    (value !== void 0 || prop in state.copy_) || // special case: NaN
    Number.isNaN(value) && Number.isNaN(state.copy_[prop]))
      return true;
    state.copy_[prop] = value;
    state.assigned_[prop] = true;
    return true;
  },
  deleteProperty(state, prop) {
    if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
      state.assigned_[prop] = false;
      prepareCopy(state);
      markChanged(state);
    } else {
      delete state.assigned_[prop];
    }
    if (state.copy_) {
      delete state.copy_[prop];
    }
    return true;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(state, prop) {
    const owner = latest(state);
    const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (!desc)
      return desc;
    return {
      writable: true,
      configurable: state.type_ !== 1 /* Array */ || prop !== "length",
      enumerable: desc.enumerable,
      value: owner[prop]
    };
  },
  defineProperty() {
    die(11);
  },
  getPrototypeOf(state) {
    return getPrototypeOf(state.base_);
  },
  setPrototypeOf() {
    die(12);
  }
};
var arrayTraps = {};
each(objectTraps, (key, fn) => {
  arrayTraps[key] = function() {
    arguments[0] = arguments[0][0];
    return fn.apply(this, arguments);
  };
});
arrayTraps.deleteProperty = function(state, prop) {
  if ( true && isNaN(parseInt(prop)))
    die(13);
  return arrayTraps.set.call(this, state, prop, void 0);
};
arrayTraps.set = function(state, prop, value) {
  if ( true && prop !== "length" && isNaN(parseInt(prop)))
    die(14);
  return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
function peek(draft, prop) {
  const state = draft[DRAFT_STATE];
  const source = state ? latest(state) : draft;
  return source[prop];
}
function readPropFromProto(state, source, prop) {
  const desc = getDescriptorFromProto(source, prop);
  return desc ? `value` in desc ? desc.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    desc.get?.call(state.draft_)
  ) : void 0;
}
function getDescriptorFromProto(source, prop) {
  if (!(prop in source))
    return void 0;
  let proto = getPrototypeOf(source);
  while (proto) {
    const desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (desc)
      return desc;
    proto = getPrototypeOf(proto);
  }
  return void 0;
}
function markChanged(state) {
  if (!state.modified_) {
    state.modified_ = true;
    if (state.parent_) {
      markChanged(state.parent_);
    }
  }
}
function prepareCopy(state) {
  if (!state.copy_) {
    state.copy_ = shallowCopy(
      state.base_,
      state.scope_.immer_.useStrictShallowCopy_
    );
  }
}

// src/core/immerClass.ts
var Immer2 = class {
  constructor(config) {
    this.autoFreeze_ = true;
    this.useStrictShallowCopy_ = false;
    /**
     * The `produce` function takes a value and a "recipe function" (whose
     * return value often depends on the base state). The recipe function is
     * free to mutate its first argument however it wants. All mutations are
     * only ever applied to a __copy__ of the base state.
     *
     * Pass only a function to create a "curried producer" which relieves you
     * from passing the recipe function every time.
     *
     * Only plain objects and arrays are made mutable. All other objects are
     * considered uncopyable.
     *
     * Note: This function is __bound__ to its `Immer` instance.
     *
     * @param {any} base - the initial state
     * @param {Function} recipe - function that receives a proxy of the base state as first argument and which can be freely modified
     * @param {Function} patchListener - optional function that will be called with all the patches produced here
     * @returns {any} a new state, or the initial state if nothing was modified
     */
    this.produce = (base, recipe, patchListener) => {
      if (typeof base === "function" && typeof recipe !== "function") {
        const defaultBase = recipe;
        recipe = base;
        const self = this;
        return function curriedProduce(base2 = defaultBase, ...args) {
          return self.produce(base2, (draft) => recipe.call(this, draft, ...args));
        };
      }
      if (typeof recipe !== "function")
        die(6);
      if (patchListener !== void 0 && typeof patchListener !== "function")
        die(7);
      let result;
      if (isDraftable(base)) {
        const scope = enterScope(this);
        const proxy = createProxy(base, void 0);
        let hasError = true;
        try {
          result = recipe(proxy);
          hasError = false;
        } finally {
          if (hasError)
            revokeScope(scope);
          else
            leaveScope(scope);
        }
        usePatchesInScope(scope, patchListener);
        return processResult(result, scope);
      } else if (!base || typeof base !== "object") {
        result = recipe(base);
        if (result === void 0)
          result = base;
        if (result === NOTHING)
          result = void 0;
        if (this.autoFreeze_)
          freeze(result, true);
        if (patchListener) {
          const p = [];
          const ip = [];
          getPlugin("Patches").generateReplacementPatches_(base, result, p, ip);
          patchListener(p, ip);
        }
        return result;
      } else
        die(1, base);
    };
    this.produceWithPatches = (base, recipe) => {
      if (typeof base === "function") {
        return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
      }
      let patches, inversePatches;
      const result = this.produce(base, recipe, (p, ip) => {
        patches = p;
        inversePatches = ip;
      });
      return [result, patches, inversePatches];
    };
    if (typeof config?.autoFreeze === "boolean")
      this.setAutoFreeze(config.autoFreeze);
    if (typeof config?.useStrictShallowCopy === "boolean")
      this.setUseStrictShallowCopy(config.useStrictShallowCopy);
  }
  createDraft(base) {
    if (!isDraftable(base))
      die(8);
    if (isDraft(base))
      base = current(base);
    const scope = enterScope(this);
    const proxy = createProxy(base, void 0);
    proxy[DRAFT_STATE].isManual_ = true;
    leaveScope(scope);
    return proxy;
  }
  finishDraft(draft, patchListener) {
    const state = draft && draft[DRAFT_STATE];
    if (!state || !state.isManual_)
      die(9);
    const { scope_: scope } = state;
    usePatchesInScope(scope, patchListener);
    return processResult(void 0, scope);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(value) {
    this.autoFreeze_ = value;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(value) {
    this.useStrictShallowCopy_ = value;
  }
  applyPatches(base, patches) {
    let i;
    for (i = patches.length - 1; i >= 0; i--) {
      const patch = patches[i];
      if (patch.path.length === 0 && patch.op === "replace") {
        base = patch.value;
        break;
      }
    }
    if (i > -1) {
      patches = patches.slice(i + 1);
    }
    const applyPatchesImpl = getPlugin("Patches").applyPatches_;
    if (isDraft(base)) {
      return applyPatchesImpl(base, patches);
    }
    return this.produce(
      base,
      (draft) => applyPatchesImpl(draft, patches)
    );
  }
};
function createProxy(value, parent) {
  const draft = isMap(value) ? getPlugin("MapSet").proxyMap_(value, parent) : isSet(value) ? getPlugin("MapSet").proxySet_(value, parent) : createProxyProxy(value, parent);
  const scope = parent ? parent.scope_ : getCurrentScope();
  scope.drafts_.push(draft);
  return draft;
}

// src/core/current.ts
function current(value) {
  if (!isDraft(value))
    die(10, value);
  return currentImpl(value);
}
function currentImpl(value) {
  if (!isDraftable(value) || isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  let copy;
  if (state) {
    if (!state.modified_)
      return state.base_;
    state.finalized_ = true;
    copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
  } else {
    copy = shallowCopy(value, true);
  }
  each(copy, (key, childValue) => {
    set(copy, key, currentImpl(childValue));
  });
  if (state) {
    state.finalized_ = false;
  }
  return copy;
}

// src/plugins/patches.ts
function enablePatches() {
  const errorOffset = 16;
  if (true) {
    errors.push(
      'Sets cannot have "replace" patches.',
      function(op) {
        return "Unsupported patch operation: " + op;
      },
      function(path) {
        return "Cannot apply patch, path doesn't resolve: " + path;
      },
      "Patching reserved attributes like __proto__, prototype and constructor is not allowed"
    );
  }
  const REPLACE = "replace";
  const ADD = "add";
  const REMOVE = "remove";
  function generatePatches_(state, basePath, patches, inversePatches) {
    switch (state.type_) {
      case 0 /* Object */:
      case 2 /* Map */:
        return generatePatchesFromAssigned(
          state,
          basePath,
          patches,
          inversePatches
        );
      case 1 /* Array */:
        return generateArrayPatches(state, basePath, patches, inversePatches);
      case 3 /* Set */:
        return generateSetPatches(
          state,
          basePath,
          patches,
          inversePatches
        );
    }
  }
  function generateArrayPatches(state, basePath, patches, inversePatches) {
    let { base_, assigned_ } = state;
    let copy_ = state.copy_;
    if (copy_.length < base_.length) {
      ;
      [base_, copy_] = [copy_, base_];
      [patches, inversePatches] = [inversePatches, patches];
    }
    for (let i = 0; i < base_.length; i++) {
      if (assigned_[i] && copy_[i] !== base_[i]) {
        const path = basePath.concat([i]);
        patches.push({
          op: REPLACE,
          path,
          // Need to maybe clone it, as it can in fact be the original value
          // due to the base/copy inversion at the start of this function
          value: clonePatchValueIfNeeded(copy_[i])
        });
        inversePatches.push({
          op: REPLACE,
          path,
          value: clonePatchValueIfNeeded(base_[i])
        });
      }
    }
    for (let i = base_.length; i < copy_.length; i++) {
      const path = basePath.concat([i]);
      patches.push({
        op: ADD,
        path,
        // Need to maybe clone it, as it can in fact be the original value
        // due to the base/copy inversion at the start of this function
        value: clonePatchValueIfNeeded(copy_[i])
      });
    }
    for (let i = copy_.length - 1; base_.length <= i; --i) {
      const path = basePath.concat([i]);
      inversePatches.push({
        op: REMOVE,
        path
      });
    }
  }
  function generatePatchesFromAssigned(state, basePath, patches, inversePatches) {
    const { base_, copy_ } = state;
    each(state.assigned_, (key, assignedValue) => {
      const origValue = get(base_, key);
      const value = get(copy_, key);
      const op = !assignedValue ? REMOVE : has(base_, key) ? REPLACE : ADD;
      if (origValue === value && op === REPLACE)
        return;
      const path = basePath.concat(key);
      patches.push(op === REMOVE ? { op, path } : { op, path, value });
      inversePatches.push(
        op === ADD ? { op: REMOVE, path } : op === REMOVE ? { op: ADD, path, value: clonePatchValueIfNeeded(origValue) } : { op: REPLACE, path, value: clonePatchValueIfNeeded(origValue) }
      );
    });
  }
  function generateSetPatches(state, basePath, patches, inversePatches) {
    let { base_, copy_ } = state;
    let i = 0;
    base_.forEach((value) => {
      if (!copy_.has(value)) {
        const path = basePath.concat([i]);
        patches.push({
          op: REMOVE,
          path,
          value
        });
        inversePatches.unshift({
          op: ADD,
          path,
          value
        });
      }
      i++;
    });
    i = 0;
    copy_.forEach((value) => {
      if (!base_.has(value)) {
        const path = basePath.concat([i]);
        patches.push({
          op: ADD,
          path,
          value
        });
        inversePatches.unshift({
          op: REMOVE,
          path,
          value
        });
      }
      i++;
    });
  }
  function generateReplacementPatches_(baseValue, replacement, patches, inversePatches) {
    patches.push({
      op: REPLACE,
      path: [],
      value: replacement === NOTHING ? void 0 : replacement
    });
    inversePatches.push({
      op: REPLACE,
      path: [],
      value: baseValue
    });
  }
  function applyPatches_(draft, patches) {
    patches.forEach((patch) => {
      const { path, op } = patch;
      let base = draft;
      for (let i = 0; i < path.length - 1; i++) {
        const parentType = getArchtype(base);
        let p = path[i];
        if (typeof p !== "string" && typeof p !== "number") {
          p = "" + p;
        }
        if ((parentType === 0 /* Object */ || parentType === 1 /* Array */) && (p === "__proto__" || p === "constructor"))
          die(errorOffset + 3);
        if (typeof base === "function" && p === "prototype")
          die(errorOffset + 3);
        base = get(base, p);
        if (typeof base !== "object")
          die(errorOffset + 2, path.join("/"));
      }
      const type = getArchtype(base);
      const value = deepClonePatchValue(patch.value);
      const key = path[path.length - 1];
      switch (op) {
        case REPLACE:
          switch (type) {
            case 2 /* Map */:
              return base.set(key, value);
            case 3 /* Set */:
              die(errorOffset);
            default:
              return base[key] = value;
          }
        case ADD:
          switch (type) {
            case 1 /* Array */:
              return key === "-" ? base.push(value) : base.splice(key, 0, value);
            case 2 /* Map */:
              return base.set(key, value);
            case 3 /* Set */:
              return base.add(value);
            default:
              return base[key] = value;
          }
        case REMOVE:
          switch (type) {
            case 1 /* Array */:
              return base.splice(key, 1);
            case 2 /* Map */:
              return base.delete(key);
            case 3 /* Set */:
              return base.delete(patch.value);
            default:
              return delete base[key];
          }
        default:
          die(errorOffset + 1, op);
      }
    });
    return draft;
  }
  function deepClonePatchValue(obj) {
    if (!isDraftable(obj))
      return obj;
    if (Array.isArray(obj))
      return obj.map(deepClonePatchValue);
    if (isMap(obj))
      return new Map(
        Array.from(obj.entries()).map(([k, v]) => [k, deepClonePatchValue(v)])
      );
    if (isSet(obj))
      return new Set(Array.from(obj).map(deepClonePatchValue));
    const cloned = Object.create(getPrototypeOf(obj));
    for (const key in obj)
      cloned[key] = deepClonePatchValue(obj[key]);
    if (has(obj, DRAFTABLE))
      cloned[DRAFTABLE] = obj[DRAFTABLE];
    return cloned;
  }
  function clonePatchValueIfNeeded(obj) {
    if (isDraft(obj)) {
      return deepClonePatchValue(obj);
    } else
      return obj;
  }
  loadPlugin("Patches", {
    applyPatches_,
    generatePatches_,
    generateReplacementPatches_
  });
}

// src/plugins/mapset.ts
function enableMapSet() {
  class DraftMap extends Map {
    constructor(target, parent) {
      super();
      this[DRAFT_STATE] = {
        type_: 2 /* Map */,
        parent_: parent,
        scope_: parent ? parent.scope_ : getCurrentScope(),
        modified_: false,
        finalized_: false,
        copy_: void 0,
        assigned_: void 0,
        base_: target,
        draft_: this,
        isManual_: false,
        revoked_: false
      };
    }
    get size() {
      return latest(this[DRAFT_STATE]).size;
    }
    has(key) {
      return latest(this[DRAFT_STATE]).has(key);
    }
    set(key, value) {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (!latest(state).has(key) || latest(state).get(key) !== value) {
        prepareMapCopy(state);
        markChanged(state);
        state.assigned_.set(key, true);
        state.copy_.set(key, value);
        state.assigned_.set(key, true);
      }
      return this;
    }
    delete(key) {
      if (!this.has(key)) {
        return false;
      }
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      prepareMapCopy(state);
      markChanged(state);
      if (state.base_.has(key)) {
        state.assigned_.set(key, false);
      } else {
        state.assigned_.delete(key);
      }
      state.copy_.delete(key);
      return true;
    }
    clear() {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (latest(state).size) {
        prepareMapCopy(state);
        markChanged(state);
        state.assigned_ = /* @__PURE__ */ new Map();
        each(state.base_, (key) => {
          state.assigned_.set(key, false);
        });
        state.copy_.clear();
      }
    }
    forEach(cb, thisArg) {
      const state = this[DRAFT_STATE];
      latest(state).forEach((_value, key, _map) => {
        cb.call(thisArg, this.get(key), key, this);
      });
    }
    get(key) {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      const value = latest(state).get(key);
      if (state.finalized_ || !isDraftable(value)) {
        return value;
      }
      if (value !== state.base_.get(key)) {
        return value;
      }
      const draft = createProxy(value, state);
      prepareMapCopy(state);
      state.copy_.set(key, draft);
      return draft;
    }
    keys() {
      return latest(this[DRAFT_STATE]).keys();
    }
    values() {
      const iterator = this.keys();
      return {
        [Symbol.iterator]: () => this.values(),
        next: () => {
          const r = iterator.next();
          if (r.done)
            return r;
          const value = this.get(r.value);
          return {
            done: false,
            value
          };
        }
      };
    }
    entries() {
      const iterator = this.keys();
      return {
        [Symbol.iterator]: () => this.entries(),
        next: () => {
          const r = iterator.next();
          if (r.done)
            return r;
          const value = this.get(r.value);
          return {
            done: false,
            value: [r.value, value]
          };
        }
      };
    }
    [(DRAFT_STATE, Symbol.iterator)]() {
      return this.entries();
    }
  }
  function proxyMap_(target, parent) {
    return new DraftMap(target, parent);
  }
  function prepareMapCopy(state) {
    if (!state.copy_) {
      state.assigned_ = /* @__PURE__ */ new Map();
      state.copy_ = new Map(state.base_);
    }
  }
  class DraftSet extends Set {
    constructor(target, parent) {
      super();
      this[DRAFT_STATE] = {
        type_: 3 /* Set */,
        parent_: parent,
        scope_: parent ? parent.scope_ : getCurrentScope(),
        modified_: false,
        finalized_: false,
        copy_: void 0,
        base_: target,
        draft_: this,
        drafts_: /* @__PURE__ */ new Map(),
        revoked_: false,
        isManual_: false
      };
    }
    get size() {
      return latest(this[DRAFT_STATE]).size;
    }
    has(value) {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (!state.copy_) {
        return state.base_.has(value);
      }
      if (state.copy_.has(value))
        return true;
      if (state.drafts_.has(value) && state.copy_.has(state.drafts_.get(value)))
        return true;
      return false;
    }
    add(value) {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (!this.has(value)) {
        prepareSetCopy(state);
        markChanged(state);
        state.copy_.add(value);
      }
      return this;
    }
    delete(value) {
      if (!this.has(value)) {
        return false;
      }
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      prepareSetCopy(state);
      markChanged(state);
      return state.copy_.delete(value) || (state.drafts_.has(value) ? state.copy_.delete(state.drafts_.get(value)) : (
        /* istanbul ignore next */
        false
      ));
    }
    clear() {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      if (latest(state).size) {
        prepareSetCopy(state);
        markChanged(state);
        state.copy_.clear();
      }
    }
    values() {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      prepareSetCopy(state);
      return state.copy_.values();
    }
    entries() {
      const state = this[DRAFT_STATE];
      assertUnrevoked(state);
      prepareSetCopy(state);
      return state.copy_.entries();
    }
    keys() {
      return this.values();
    }
    [(DRAFT_STATE, Symbol.iterator)]() {
      return this.values();
    }
    forEach(cb, thisArg) {
      const iterator = this.values();
      let result = iterator.next();
      while (!result.done) {
        cb.call(thisArg, result.value, result.value, this);
        result = iterator.next();
      }
    }
  }
  function proxySet_(target, parent) {
    return new DraftSet(target, parent);
  }
  function prepareSetCopy(state) {
    if (!state.copy_) {
      state.copy_ = /* @__PURE__ */ new Set();
      state.base_.forEach((value) => {
        if (isDraftable(value)) {
          const draft = createProxy(value, state);
          state.drafts_.set(value, draft);
          state.copy_.add(draft);
        } else {
          state.copy_.add(value);
        }
      });
    }
  }
  function assertUnrevoked(state) {
    if (state.revoked_)
      die(3, JSON.stringify(latest(state)));
  }
  loadPlugin("MapSet", { proxyMap_, proxySet_ });
}

// src/immer.ts
var immer = new Immer2();
var produce = immer.produce;
var produceWithPatches = immer.produceWithPatches.bind(
  immer
);
var setAutoFreeze = immer.setAutoFreeze.bind(immer);
var setUseStrictShallowCopy = immer.setUseStrictShallowCopy.bind(immer);
var applyPatches = immer.applyPatches.bind(immer);
var createDraft = immer.createDraft.bind(immer);
var finishDraft = immer.finishDraft.bind(immer);
function castDraft(value) {
  return value;
}
function castImmutable(value) {
  return value;
}

//# sourceMappingURL=immer.mjs.map

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
/*!*******************************!*\
  !*** ./src/instagram/view.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "../plugin-slug/node_modules/react-dom/client.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "./src/instagram/style.scss");
/* harmony import */ var _Components_Common_Style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Components/Common/Style */ "./src/instagram/Components/Common/Style.js");
/* harmony import */ var _Feeds__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Feeds */ "./src/instagram/Feeds.js");







// All Instagram Feed
document.addEventListener('DOMContentLoaded', () => {
  const ifbEls = document.querySelectorAll('.wp-block-ifb-instagram');
  ifbEls.forEach(ifbEl => {
    const attributes = JSON.parse(ifbEl.dataset.attributes);
    // const accounts = JSON.parse(ifbEl.dataset.accounts);
    const {
      cId
    } = attributes;
    (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(ifbEl).render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Common_Style__WEBPACK_IMPORTED_MODULE_3__["default"], {
      attributes: attributes,
      clientId: cId
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(RenderGallery, {
      attributes: attributes
    })));
    ifbEl?.removeAttribute('data-attributes');
  });
});
const RenderGallery = ({
  attributes
}) => {
  const [pageNumber, setPageNumber] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Feeds__WEBPACK_IMPORTED_MODULE_4__["default"], {
    attributes: attributes,
    pageNumber: pageNumber,
    setPageNumber: setPageNumber
  });
};
/******/ })()
;
//# sourceMappingURL=view.js.map