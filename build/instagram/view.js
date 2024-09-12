/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../Components/utils/getCSS.js":
/*!*************************************!*\
  !*** ../Components/utils/getCSS.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBackgroundCSS: () => (/* binding */ getBackgroundCSS),
/* harmony export */   getBorderCSS: () => (/* binding */ getBorderCSS),
/* harmony export */   getBoxCSS: () => (/* binding */ getBoxCSS),
/* harmony export */   getColorsCSS: () => (/* binding */ getColorsCSS),
/* harmony export */   getIconCSS: () => (/* binding */ getIconCSS),
/* harmony export */   getMultiShadowCSS: () => (/* binding */ getMultiShadowCSS),
/* harmony export */   getSeparatorCSS: () => (/* binding */ getSeparatorCSS),
/* harmony export */   getShadowCSS: () => (/* binding */ getShadowCSS),
/* harmony export */   getSpaceCSS: () => (/* binding */ getSpaceCSS),
/* harmony export */   getTypoCSS: () => (/* binding */ getTypoCSS)
/* harmony export */ });
const getBackgroundCSS = (bg, isSolid = true, isGradient = true, isImage = true) => {
  const {
    type = 'solid',
    color = '#000000b3',
    gradient = 'linear-gradient(135deg, #4527a4, #8344c5)',
    image = {},
    position = 'center center',
    attachment = 'initial',
    repeat = 'no-repeat',
    size = 'cover',
    overlayColor = '#000000b3'
  } = bg || {};
  const styles = 'gradient' === type && isGradient ? `background: ${gradient};` : 'image' === type && isImage ? `background: url(${image?.url});
				background-color: ${overlayColor};
				background-position: ${position};
				background-size: ${size};
				background-repeat: ${repeat};
				background-attachment: ${attachment};
				background-blend-mode: overlay;` : isSolid && `background: ${color};`;
  return styles;
}; // PHP version in Stepped Content

const getBorderCSS = border => {
  const {
    width = '0px',
    style = 'solid',
    color = '#0000',
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
const getColorsCSS = colors => {
  const {
    color = '#333',
    bgType = 'solid',
    bg = '#0000',
    gradient = 'linear-gradient(135deg, #4527a4, #8344c5)'
  } = colors || {};
  const styles = `
		${color ? `color: ${color};` : ''}
		${gradient || bg ? `background: ${'gradient' === bgType ? gradient : bg};` : ''}
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
  const colorCSS = 'gradient' === colorType ? `color: transparent; background-image: ${gradient}; -webkit-background-clip: text; background-clip: text;` : `color: ${color};`;
  const styles = `
		${!fontSize || !isSize ? '' : `font-size: ${fontSize}px;`}
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
const getShadowCSS = shadow => {
  const {
    type = 'box',
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
  const generateCss = (value, cssProperty) => !value ? '' : `${cssProperty}: ${value};`;
  const isEmptyFamily = !isFamily || !fontFamily || 'Default' === fontFamily;
  const desktopFontSize = fontSize?.desktop || fontSize;
  const tabletFontSize = fontSize?.tablet || desktopFontSize;
  const mobileFontSize = fontSize?.mobile || tabletFontSize;
  const styles = `
		${isEmptyFamily ? '' : `font-family: '${fontFamily}', ${fontCategory};`}
		${generateCss(fontWeight, 'font-weight')}
		${`font-size: ${desktopFontSize}px;`}
		${generateCss(fontStyle, 'font-style')}
		${generateCss(textTransform, 'text-transform')}
		${generateCss(textDecoration, 'text-decoration')}
		${generateCss(lineHeight, 'line-height')}
		${generateCss(letterSpace, 'letter-spacing')}
	`;

  // Google font link
  const linkQuery = !fontVariant || 400 === fontVariant ? '' : '400i' === fontVariant ? ':ital@1' : fontVariant?.includes('00i') ? `: ital, wght@1, ${fontVariant?.replace('00i', '00')} ` : `: wght@${fontVariant} `;
  const link = isEmptyFamily ? '' : `https://fonts.googleapis.com/css2?family=${fontFamily?.split(' ').join('+')}${linkQuery.replace(/ /g, '')}&display=swap`;
  return {
    googleFontLink: !isUploadFont || isEmptyFamily ? '' : `@import url(${link});`,
    styles: `${selector}{
			${styles}
		}
		@media (max-width: 768px) {
			${selector}{
				${`font-size: ${tabletFontSize}px;`}
			}
		}
		@media (max-width: 576px) {
			${selector}{
				${`font-size: ${mobileFontSize}px;`}
			}
		}`.replace(/\s+/g, ' ').trim()
  };
};
const getBoxCSS = (val = {}) => Object.values(val).join(' ');

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
/* harmony import */ var _Components_utils_getCSS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../Components/utils/getCSS */ "../Components/utils/getCSS.js");


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
		${(0,_Components_utils_getCSS__WEBPACK_IMPORTED_MODULE_1__.getTypoCSS)('', captionTypo)?.googleFontLink}
		${(0,_Components_utils_getCSS__WEBPACK_IMPORTED_MODULE_1__.getTypoCSS)(`${galleryItemSl} .caption p`, captionTypo)?.styles}

		${feedSl}{
			${(0,_Components_utils_getCSS__WEBPACK_IMPORTED_MODULE_1__.getBackgroundCSS)(background)}
			padding: ${(0,_Components_utils_getCSS__WEBPACK_IMPORTED_MODULE_1__.getSpaceCSS)(padding)};
			${(0,_Components_utils_getCSS__WEBPACK_IMPORTED_MODULE_1__.getBorderCSS)(border)}
		}
		${popupSl}{
			${(0,_Components_utils_getCSS__WEBPACK_IMPORTED_MODULE_1__.getBackgroundCSS)(background)}
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
			${(0,_Components_utils_getCSS__WEBPACK_IMPORTED_MODULE_1__.getColorsCSS)(followBtnColors || {
        color: '#fff',
        bg: '#4527a4'
      })}
		}
		${feedSl} .followBtn:hover{
			${(0,_Components_utils_getCSS__WEBPACK_IMPORTED_MODULE_1__.getColorsCSS)(followBtnHovColors || {
        color: '#fff',
        bg: '#8344c5'
      })}
		}

		${feedSl} .ifbGallery{
			grid-gap: ${rowGap} ${columnGap};
		}
		${galleryItemSl} figure .caption{
			${(0,_Components_utils_getCSS__WEBPACK_IMPORTED_MODULE_1__.getBackgroundCSS)(captionBG)}
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