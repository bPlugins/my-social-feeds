
import { getBoxValue, ratioCheck } from '../../utils/functions';
import { getColorsCSS, getTypoCSS } from '../../../../../Components/utils/getCSS';

const Style = ({ attributes, elId}) => {
	const { profilebgColor, profileAlignment, profilePadding, columnGap, rowGap,  profilebgCTop, profilebgCbottom, displayNameColor, nameTypo, btnPadding, shareBtnTypo, layoutColors, sharebtnColors, sharebtnHoverColors, countNumColor, TextColor, InfoTypo, borderColor, bioColor, bioTypo, overlyColor, overlyIconColor, btnTypo, loadMoreBtnColors, videoCoverImage, viewLoadBtnPadding, loadMoreBtnHoverColors, videosInfo } = attributes;

	const mainEl = `#${elId}`;
	console.log(mainEl);
	
	const modalMainEl = `.dialog-content-${elId}`;

	return <style dangerouslySetInnerHTML={{
		__html: `
		${getTypoCSS('', nameTypo)?.googleFontLink}
		${getTypoCSS('', shareBtnTypo)?.googleFontLink}
		${getTypoCSS('', bioTypo)?.googleFontLink}
		${getTypoCSS('', InfoTypo)?.googleFontLink}
		${getTypoCSS('', btnTypo)?.googleFontLink}

		${getTypoCSS(`${mainEl} .ttptiktok .ttpProfile .CompactuserProfileInfo .displayNameShare a:nth-child(1), ${mainEl} .ttptiktok .ttpProfile .userProfileInfo .displayNameShare a:nth-child(1),${mainEl} .ttptiktok .ttpProfile .CarduserProfileInfo .displayNameShare a:nth-child(1)`, nameTypo)?.styles}

		${getTypoCSS(`${mainEl} .ttptiktok .ttpProfile .userProfileInfo .profileInfo .displayNameShare .ttpShareBtn, ${mainEl} .ttptiktok .ttpProfile .CompactuserProfileInfo .displayNameShare .ttpShareBtn,${mainEl} .ttptiktok .ttpProfile .CarduserProfileInfo .profileInfo .displayNameShare .ttpShareBtn`, shareBtnTypo)?.styles}

		${getTypoCSS(`${mainEl} .ttptiktok .ttpProfile .userProfileInfo .user_bio p,
		${mainEl} .ttptiktok .ttpProfile .CarduserProfileInfo .user_bio p`, bioTypo)?.styles}
		${getTypoCSS(`${mainEl} .ttptiktok .ttpProfile .ProfileCard ul li`, InfoTypo)?.styles}
		${getTypoCSS(`${mainEl} .ttptiktok .ttpHasMore button, ${mainEl} .ttptiktok .ttpHasMore a`, btnTypo)?.styles}


		${mainEl} .ttptiktok .ttpfeedItemArea{
			grid-gap: ${rowGap} ${columnGap};
			${getColorsCSS(layoutColors)};
		}

		${mainEl} .ttptiktok .ttpfeedItemArea .swiper{
			background-color:${layoutColors?.bg}
		}

		${mainEl} .ttptiktok .masonry {
			column-gap:${columnGap};
		}

		${mainEl} .ttptiktok .masonry .feedItem .title {
			margin-bottom:${rowGap};
		}

		${mainEl} .ttptiktok .masonry .feedMainArea .footerInfo .top{
			${videosInfo?.line && `border-bottom: 1px solid #00000045`};
		}

		${mainEl} .feedInfoArea span {
			color: ${overlyIconColor};
		}

		${mainEl} .feedMainArea .footerInfo .info p span {
			color: ${layoutColors?.color};
		}
		
		${mainEl} .ttptiktok .ttpProfile .CompactuserProfileInfo .CompactuserProfileimgbtn {
			background:${profilebgCTop};
		}

		${mainEl} .ttptiktok .ttpProfile .CompactuserProfileInfo .social_share {
			background:${profilebgCbottom};
		}

		${mainEl} .ttptiktok .ttpProfile {
			background-color:${profilebgColor};
			padding: ${getBoxValue(profilePadding)};
		}

		${mainEl} .ttptiktok .ttpProfile .userProfileInfo {
			align-items: ${profileAlignment};
		}

		${mainEl} .ttptiktok .ttpProfile .CompactuserProfileInfo .displayNameShare a:nth-child(1), ${mainEl} .ttptiktok .ttpProfile .userProfileInfo .displayNameShare a:nth-child(1),${mainEl} .ttptiktok .ttpProfile .CarduserProfileInfo .displayNameShare a:nth-child(1) {
			color:${displayNameColor || '#fff'};
		}

		${mainEl} .ttptiktok .ttpProfile .userProfileInfo .profileInfo .displayNameShare .ttpShareBtn, ${mainEl} .ttptiktok .ttpProfile .CompactuserProfileInfo .displayNameShare .ttpShareBtn,
		${mainEl} .ttptiktok .ttpProfile .CarduserProfileInfo .profileInfo .displayNameShare .ttpShareBtn {
			${getColorsCSS(sharebtnColors)};
			padding:${getBoxValue(btnPadding)};
		}

		${mainEl} .ttptiktok .ttpProfile .userProfileInfo .profileInfo .displayNameShare .ttpShareBtn:hover,
		${mainEl} .ttptiktok .ttpProfile .CompactuserProfileInfo .displayNameShare .ttpShareBtn:hover,
		${mainEl} .ttptiktok .ttpProfile .CarduserProfileInfo .profileInfo .displayNameShare .ttpShareBtn:hover{
			${getColorsCSS(sharebtnHoverColors)};
		}
		
		${mainEl} .ttptiktok .ttpProfile .CompactuserProfileInfo .social_share ul li span, 
		${mainEl} .ttptiktok .ttpProfile .userProfileInfo .social_count ul li span, 
		${mainEl} .ttptiktok .ttpProfile .CarduserProfileInfo .social_share ul li span{
			color:${countNumColor};
		}

		${mainEl} .ttptiktok .ttpProfile .CompactuserProfileInfo .social_share ul li, 
		${mainEl} .ttptiktok .ttpProfile .userProfileInfo .social_count ul li, 
		${mainEl} .ttptiktok .ttpProfile .CarduserProfileInfo .social_share ul li {
			color:${TextColor};
			border-color:${borderColor};
		}

		${mainEl} .ttptiktok .ttpProfile .ProfileCard ul li {}

		${mainEl} .ttptiktok .ttpProfile .userProfileInfo .user_bio p,
		${mainEl} .ttptiktok .ttpProfile .CarduserProfileInfo .user_bio p {
			color:${bioColor}; 
		}

		${mainEl} .ttptiktok .mainCompactProfileInfo {
			text-align:${profileAlignment};
		}

		${mainEl} .ttptiktok .ttpfeedItemArea .feedMainArea .feedInfoArea {
			background:${overlyColor};
		}

		${mainEl} .ttptiktok .feedMainArea .feedItem .square {
			padding-top: ${ratioCheck(videoCoverImage?.ratio)}%;
		}

		${mainEl} .ttptiktok .ttpHasMore button,${mainEl} .ttptiktok .ttpHasMore a {
			${getColorsCSS(loadMoreBtnColors)};
			padding:${getBoxValue(viewLoadBtnPadding)};
		}

		${mainEl} .ttptiktok .ttpHasMore button:hover,
		${mainEl} .ttptiktok .ttpHasMore a:hover {
			${getColorsCSS(loadMoreBtnHoverColors)};
		}

		${modalMainEl} {
			${getColorsCSS(layoutColors)};
		}

		${mainEl} .ttptiktok .ttpHasMore a:hover svg {
		   fill:${loadMoreBtnHoverColors?.color};
		}

		`.replace(/\s+/g, ' ')
	}} />;
}
export default Style;