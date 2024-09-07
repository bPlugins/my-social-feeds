import { getBoxValue } from '../../../../../Components/utils/functions';
import { getBackgroundCSS, getBorderCSS, getColorsCSS, getTypoCSS } from '../../../../../Components/utils/getCSS';
import { ratioCheck } from '../../utils/functions';

const Style = ({ attributes, eleId }) => {
	const { profileWrapper, name, about, countArea, button, columnGap, rowGap, pinCoverImage, image } = attributes;
	const {background} = profileWrapper;

	const mainSl = `#${eleId}`;
	return <style dangerouslySetInnerHTML={{
		__html: `

			${getTypoCSS('', button?.typo)?.googleFontLink}
			${getTypoCSS('', countArea?.typo)?.googleFontLink}
			${getTypoCSS('', about?.typo)?.googleFontLink}
			${getTypoCSS('', name?.typo)?.googleFontLink}
			${getTypoCSS(`${mainSl} .profile .followBtn a`, button?.typo)?.styles}
			${getTypoCSS(`${mainSl} .profile .count-area span`, countArea?.typo)?.styles}
			${getTypoCSS(`${mainSl} .profile .about p`, about?.typo)?.styles}
			${getTypoCSS(`${mainSl} .profile .name a span`, name?.typo)?.styles}

		    ${mainSl} .profile {
                ${getBackgroundCSS(background)}; 
            }

			${mainSl} .profile .name a span {
				color:${name?.color};
			}

			${mainSl} .profile .about p {
				color:${about?.color};
			}

			${mainSl} .profile .count-area span {
				color:${countArea?.color};
			}

			${mainSl} .profile .followBtn a {
				${getColorsCSS(button?.colors)};
				padding:${getBoxValue(button?.padding?.desktop)};
				${getBorderCSS(button?.border)};
			}

			${mainSl} .profile .followBtn a:hover {
				${getColorsCSS(button?.hoverColors)};
			}

			@media (max-width: 768px) {
				${mainSl} .profile .followBtn a {
					padding:${getBoxValue(button?.padding?.tablet)};
				}
			}

			@media (max-width: 576px) { 
				${mainSl} .profile .followBtn a {
					padding:${getBoxValue(button?.padding?.mobile)};
				}
			}

			${mainSl} .layout {
				grid-gap: ${rowGap} ${columnGap};
			}

			${mainSl} .default .imgArea, ${mainSl} .slider .imgArea{
				padding-top: ${ratioCheck(pinCoverImage?.ratio)}%;
			}
			
			${mainSl} .layout .single-pin .imgArea::after {
				background:${image.overlyColor};
			}

			${mainSl} .layout .single-pin .imgArea:hover::after {
				opacity: ${image.isOverly == true ? 1 : 0};
			}

			${mainSl} .layout .single-pin .imgArea {
				${getBorderCSS(image?.border)};
			}

			${mainSl} .layout .single-pin .imgArea:hover img {
				transform: scale(${image?.isTransform == true ? 1.05 : 1});
			}

	`}} />;
}
export default Style;