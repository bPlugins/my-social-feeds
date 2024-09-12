import { useEffect, useRef } from 'react';
 
import Profile from '../Elements/Profile';
import { addHashtagLinks, remHashtag, truncate } from '../../utils/functions';
import { instagramIcon, carouselIcon, playIcon } from '../../utils/icons';

const Item = ({ attributes, user, feed, index }) => {
	const { cId, isPopup, isLink, isLinkNewTab, isCaption, isRemCaptionHash, captionLength, imgHoverEffect, captionStyle } = attributes;
	const { id, media_type, media_url, thumbnail_url = '', caption, permalink } = feed; // timestamp present in data

	// FancyBox
	useEffect(() => {
		Fancybox.bind(`[data-fancybox='ifbPopup-${cId}']`, {
			Toolbar: {
				display: [
					'slideshow',
					'counter',
					'zoomIn',
					'zoomOut',
					'fullscreen',
					'thumbs',
					'close',
				],
			},
			Thumbs: {
				autoStart: true,
			}
		});
	}, []);

	// Components
	const LinkCheck = ({ children }) => isLink ? <a href={permalink} target={isLinkNewTab ? '_blank' : '_self'} rel='noreferrer'>{children}</a> : children;

	const Image = () => <img src={'VIDEO' === media_type ? thumbnail_url : media_url} alt={caption} />

	const Caption = () => isCaption && <div className={`caption ${captionStyle}`}>
		<p dangerouslySetInnerHTML={{ __html: isRemCaptionHash ? truncate(remHashtag(caption), captionLength) : addHashtagLinks(truncate(caption, captionLength)) }} />
	</div>

	const Figure = () => <figure className={imgHoverEffect}>
		<Image />

		{'IMAGE' !== media_type && <span className='typeIcon'>{'VIDEO' === media_type ? playIcon : carouselIcon}</span>}

		{captionStyle.includes('overlay') && <Caption />}
	</figure>

	const ItemInner = () => <>
		<Figure />

		{'bottom' === captionStyle && <Caption />}
	</>

	return <div key={id} className='galleryItem' id={`galleryItem-${index}`}>
		{isPopup ? <div id={`ifbPopupContent-${cId}-${id}`} className={`ifbPopupContent-${cId} ifbPopupContent`}>
			<div className='contentArea'>
				<div className='media'>
					{'IMAGE' === media_type && <img src={media_url} alt={caption} />}

					{'VIDEO' === media_type && <video controls poster={thumbnail_url}>
						<source src={media_url} />
					</video>}

					{'CAROUSEL_ALBUM' === media_type && <CarouselItem feed={feed} />}
				</div>

				<div className='text'>
					<Profile attributes={attributes} user={user} />

					<div className='caption' dangerouslySetInnerHTML={{ __html: addHashtagLinks(caption) }} />

					<div className='info'>
						<a className='link' href={permalink} target='_blank' rel='noreferrer nofollow noopener'> {instagramIcon('#fff', 18)} View on Instagram</a>
					</div>
				</div>
			</div>
		</div> : null}


		{isPopup ? <a href={'VIDEO' === media_type ? thumbnail_url : media_url} data-fancybox={`ifbPopup-${cId}`} data-src={`#ifbPopupContent-${cId}-${id}`} data-caption={caption}>
			<ItemInner />
		</a> : <LinkCheck><ItemInner /></LinkCheck>}
	</div>;
}
export default Item;


const CarouselItem = ({ feed }) => {
	const { caption, children = {} } = feed;

	const carousel = useRef(null);
	const slidePrev = useRef(null);
	const slideNext = useRef(null);

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

	const Slide = ({ child }) => {
		const { media_url, thumbnail_url = '' } = child;

		return <div className='swiper-slide'>
			{thumbnail_url ?
				<video controls poster={thumbnail_url}>
					<source src={media_url} />
				</video> :
				<img src={media_url} alt={caption?.split(' ').slice(0, 12).join(' ')} />}
		</div>
	}

	return <div className='ifbCarousel' ref={carousel}>
		<div className='swiper-wrapper'>
			{children?.data.map(child => <Slide key={child.id} child={child} />)}
		</div>

		<div className='swiper-button-prev' ref={slidePrev}>
			<svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 24 24'><path d='M14.71 15.88L10.83 12l3.88-3.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z' /></svg>
		</div>
		<div className='swiper-button-next' ref={slideNext}>
			<svg xmlns='http://www.w3.org/2000/svg' width='24px' height='24px' viewBox='0 0 24 24'><path d='M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z' /></svg>
		</div>
	</div>;
}