
import { __ } from '@wordpress/i18n';

import Profile from './components/Profile';
import getTimeFromString from '../../utils/getTimeFromString';
import { btnTiktok, contentPreloader } from '../../utils/icons';
import Masonry from './components/layout/Masonry';
import Slider from './components/layout/Slider';
import Default from './components/layout/Default';

const Feeds = (props) => {
	const { attributes,elId, directory, isBackend = false, react: { useEffect, useState } } = props
	const {  isVideos, isProfile, videosLists, columns, isProfileImg, isDisplayName, isShareBtn, isFollowing, isFollowers, isTotalLike, pLayoutStyle, feedLayoutStyle, shareBtn, isBio, isBtn, loadMoreBtn, loadMoreBtnColors, viewLoadBtnIcon, authorized, clearCache, videoCacheT, profileCacheT } = attributes;

	const [videos, setVideos] = useState([]);
	// const [filterVideos, setFilterVideos] = useState([]);
	const [userInfo, setUserInfo] = useState({});
	const [info, setInfo] = useState({});
	const [loading, setLoading] = useState(false);

	const screenSize = window?.innerWidth;
	const device = screenSize <= 576 ? 'mobile' || videosLists : (screenSize <= 768 ? 'tablet' || videosLists : 'desktop' || videosLists);

	const count = videosLists?.[device];

	// Fatch VideoList
	const fetchData = (cursor, clearCache = false) => {

		setLoading(true);
		const newCursor = cursor ? `&cursor=${cursor}` : '';

		fetch(`${ttpData?.ajaxUrl}?action=ttp_tiktok_videos&nonce=${ttpData?.nonce}&device=${device}&max_count=${count}${newCursor}&key=${elId}&profileCacheTime=${getTimeFromString(profileCacheT)}&videoCacheTime=${getTimeFromString(videoCacheT)}`).then(res => res.json()).then(res => {
			setLoading(false)
			const { accessToken, user_info } = res;

			setInfo({
				...info,
				cursor: res.videos?.cursor || '',
				accessToken: accessToken || '',
				hasMore: res.videos.has_more || ''
			});

			clearCache ? setVideos(res.videos?.videos) : setVideos([...videos, ...res.videos?.videos]);
			setUserInfo(user_info?.user || {});
		}).catch(error => console.log('error from fetchDAta', error));
	}

	useEffect(() => {
		if (isBackend) {
			fetchData(false, true);
		} else {
			const data = JSON.parse(directory.dataset.data || '{}');
			directory?.removeAttribute('data-data');
			if (!data?.videos?.videos || !data?.user_info?.user) {
				fetchData(false, true);
			} else {
				setVideos(data?.videos?.videos || []);
				setUserInfo(data?.user_info?.user || {});
				setInfo({ ...info, hasMore: data.videos?.has_more, cursor: data.videos?.cursor });
			}
		}
	}, [clearCache, videosLists]);

	useEffect(() => {
		Fancybox.bind(`[data-fancybox='ttp-dialog-${elId}']`, {
		});
	}, []);

	const handleLoadMore = () => {
		fetchData(info.cursor);
	}

	if (!authorized) {
		if (isBackend) {
			return <div className='ttpUnAuthor'><h2>{__("Authorization Required", "tiktok")}</h2></div>;
		}
		return <span></span>;
	}

	const dataProps = {attributes,elId,userInfo,videos}


	return <div className='ttptiktok'>
		{/* User Profile  */}
		{isProfile &&
			<Profile pLayoutStyle={pLayoutStyle} isProfileImg={isProfileImg} userInfo={userInfo} isDisplayName={isDisplayName} isShareBtn={isShareBtn} shareBtn={shareBtn} isFollowing={isFollowing} isFollowers={isFollowers} isTotalLike={isTotalLike} isBio={isBio} />
		}

		{/* TikTok Videos  */}
		{isVideos && <>
			{(videos?.length === 0 || !videos) && !loading && <div className="ttpEmptyVideo">
				<h3>{__('Videos Not Found', 'tiktok')}</h3>
			</div>}
			<>
				<div className={`ttpfeedItemArea ${feedLayoutStyle} columns-${columns.desktop} columns-tablet-${columns.tablet} columns-mobile-${columns.mobile}`}>

					{feedLayoutStyle === "slider" ?
						<Slider {...dataProps} /> :
							feedLayoutStyle === "masonry" ?
								<Masonry {...dataProps} /> :
									<Default {...dataProps} />
					}
				</div>

				{loading ?
					<div className="contentPreloader">
						{contentPreloader}
					</div>
					:
					<div className='ttpHasMore'>{isBtn?.viewOn && <a target='_blank' rel="noreferrer" href={userInfo?.profile_deep_link}>{btnTiktok(loadMoreBtnColors?.color, viewLoadBtnIcon?.size)}View on TikTok</a>} {info?.hasMore && <div className='ttpHasMore'>
						{isBtn?.loadMore && <button onClick={handleLoadMore}>{loadMoreBtn}</button>}
					</div>}
					</div>}
			</>
		</>
		}
	</div >
}
export default Feeds;