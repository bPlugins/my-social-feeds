import { getBackgroundCSS, getBorderCSS, getColorsCSS, getSpaceCSS, getTypoCSS } from '../../../../../bpl-tools/utils/getCSS';

const Style = ({ attributes, clientId }) => {
	const { cId, columnGap, rowGap, profileInfo, background, padding, border, followBtnColors, followBtnHovColors, loadMoreBtnColors, loadMoreBtnHovColors, loadMoreBtnTypo, captionBG, captionTypo, captionColor } = attributes;
	const { photoSize = '55px', popupPhotoSize = '40px', userNameColor = '#4527a4', followersColor, followsColor, nameColor, bioColor } = profileInfo || {};

	const feedSl = `#ifbInstagramFeed-${clientId} .ifbInstagramFeed`;
	const galleryItemSl = `${feedSl} .galleryItem`;
	const profileSl = `${feedSl} .ifbProfile`;
	const popupSl = `.ifbPopupContent-${cId}`;
	const popupProfileSl = `${popupSl} .ifbProfile`;

	return <style dangerouslySetInnerHTML={{
		__html: `
		${getTypoCSS('', captionTypo)?.googleFontLink}
		${getTypoCSS(`${galleryItemSl} .caption p`, captionTypo)?.styles}

		${getTypoCSS('', loadMoreBtnTypo)?.googleFontLink}
		${getTypoCSS(`${feedSl} .loadMoreBtn`, loadMoreBtnTypo)?.styles}

		${feedSl}{
			${getBackgroundCSS(background)}
			padding: ${getSpaceCSS(padding)};
			${getBorderCSS(border)}
		}
		${popupSl}{
			${getBackgroundCSS(background)}
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
			${getColorsCSS(followBtnColors || { color: '#fff', bg: '#4527a4' })}
		}
		${feedSl} .followBtn:hover{
			${getColorsCSS(followBtnHovColors || { color: '#fff', bg: '#8344c5' })}
		}

		${feedSl} .loadMoreBtn{
			${getColorsCSS(loadMoreBtnColors || { color: '#fff', bg: '#4527a4' })}
		}
		${feedSl} .loadMoreBtn:hover{
			${getColorsCSS(loadMoreBtnHovColors || { color: '#fff', bg: '#8344c5' })}
		}

		${feedSl} .ifbGallery{
			grid-gap: ${rowGap} ${columnGap};
		}
		${galleryItemSl} figure .caption{
			${getBackgroundCSS(captionBG)}
		}
		${galleryItemSl} .caption p{
			color: ${captionColor};
		}
		`.replace(/\s+/g, ' ')
	}} />
}
export default Style;