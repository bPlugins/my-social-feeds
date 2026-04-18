import { __ } from '@wordpress/i18n';

import Profile from './components/Profile';
import getTimeFromString from '../../utils/getTimeFromString';
import { btnTiktok, contentPreloader } from '../../utils/icons';
import Masonry from './components/layout/Masonry';
import Slider from './components/layout/Slider';
import Default from './components/layout/Default';
import Authorization from '../../../Components/Authorization';

const Feeds = (props) => {

	const { attributes, elId, directory, isBackend = false, react: { useEffect, useState }, accounts = [], isPremium, setAttributes } = props;

	const { isVideos, isProfile, videosLists, selectedAccountId, columns, isProfileImg, isDisplayName, isShareBtn, isFollowing, isFollowers, isTotalLike, pLayoutStyle, feedLayoutStyle, shareBtn, isBio, isBtn, loadMoreBtn, loadMoreBtnColors, viewLoadBtnIcon, clearCache, videoCacheT, profileCacheT, authorized } = attributes;

	const [videos, setVideos] = useState([]);
	const [userInfo, setUserInfo] = useState({});
	const [info, setInfo] = useState({ cursor: '', hasMore: false });
	const [loading, setLoading] = useState(false);

	// ✅ Frontend fallback selected account (for old users)
	const [fallbackAccountId, setFallbackAccountId] = useState('');

	const screenSize = window?.innerWidth;
	const device = screenSize <= 576 ? 'mobile' : screenSize <= 768 ? 'tablet' : 'desktop';
	const count = videosLists?.[device] || 12;


	// effective account id: attribute first, otherwise fallback
	const effectiveAccountId = selectedAccountId || fallbackAccountId;

	/* =====================================================
	 * FRONTEND: If no selectedAccountId (old blocks), fetch accounts and pick first
	 * ===================================================== */
	useEffect(() => {
		const ensureAccount = async () => {
			if (isBackend) return;
			if (selectedAccountId) return;

			// already have accounts prop? use it
			if (accounts?.length) {
				setFallbackAccountId(accounts[0]?.account_id || '');
				return;
			}

			try {
				const res = await fetch(`${ttpData.ajaxUrl}?action=ttp_get_accounts&nonce=${ttpData.nonce}`);
				const json = await res.json();
				const list = json?.data || [];
				if (list.length) setFallbackAccountId(list[0].account_id);
			} catch (e) {
				// ignore
			}
		};

		ensureAccount();
	}, [isBackend, selectedAccountId, accounts]);

	/* =====================================================
	 * FETCH DATA
	 * ===================================================== */
	const fetchData = (cursor = false, isClear = false) => {

		if (!effectiveAccountId) {
			setVideos([]);
			setUserInfo({});
			return;
		}

		setLoading(true);
		const newCursor = cursor ? `&cursor=${cursor}` : '';

		fetch(
			`${ttpData.ajaxUrl}?action=ttp_tiktok_videos&nonce=${ttpData.nonce} &account_id=${effectiveAccountId} &device=${device}&max_count=${count}${newCursor}&key=${elId}&profileCacheTime=${getTimeFromString(profileCacheT)}&videoCacheTime=${getTimeFromString(videoCacheT)}`
		)
			.then(res => res.json())
			.then(res => {
				setLoading(false);

				// wp_send_json_success compatibility
				const payload = res?.data ? res.data : res;

				const videosData = payload?.videos || {};
				const userData = payload?.user_info?.user || {};

				setInfo({
					cursor: videosData.cursor || '',
					hasMore: !!videosData.has_more,
				});

				if (isClear) {
					setVideos(videosData.videos || []);
				} else {
					setVideos(prev => [...prev, ...(videosData.videos || [])]);
				}

				// ✅ FIX: userData already user object
				setUserInfo(userData);
			})
			.catch(() => setLoading(false));
	};

	useEffect(() => {
		if (!effectiveAccountId) return;

		// ✅ Always live fetch. This fixes plugin update cache issues.
		fetchData(false, true);

	}, [effectiveAccountId, clearCache, videosLists]);

	useEffect(() => {
		// Fancybox only if exists
		if (typeof Fancybox !== 'undefined') {
			Fancybox.bind(`[data-fancybox='ttp-dialog-${elId}']`, {});
		}
	}, []);

	const handleLoadMore = () => {
		fetchData(info.cursor);
	};

	const authorizationProps = {
		"title": __("Authorization Required", "my-social-feeds"),
		"description": __("Please connect a TikTok account to display the feed.", "my-social-feeds"),
		"button": __("Connect New Account", "my-social-feeds"),
		"selectControlLabel": __("Choose Connected Account", "my-social-feeds")
	};

	const options = [
		{ label: __('Choose Account', 'my-social-feeds'), value: '' },
		...accounts.map(acc => ({
			label: acc.display_name || acc.account_id,
			value: acc.account_id,
		}))]

	const onChangeAccount = (val) => {
		setAttributes({ selectedAccountId: val });
	}

	const authorizationMeinProps = { options, onChangeAccount, authorizationProps, isPremium, attributes, setAttributes };

	if (!selectedAccountId && !fallbackAccountId) {
		if (isBackend) {
			return <Authorization {...authorizationMeinProps} />
		}
		return <span></span>;
	}

	const dataProps = { attributes, elId, userInfo, videos };

	return (
		<div className="ttptiktok">

			{/* PROFILE */}
			{isProfile && (
				<Profile pLayoutStyle={pLayoutStyle} isProfileImg={isProfileImg} userInfo={userInfo} isDisplayName={isDisplayName} isShareBtn={isShareBtn} shareBtn={shareBtn} isFollowing={isFollowing} isFollowers={isFollowers} isTotalLike={isTotalLike} isBio={isBio} />
			)}

			{/* VIDEOS */}
			{isVideos && (
				<>
					{videos.length === 0 && !loading && (
						<div className="ttpEmptyVideo">
							<h3>{__('Videos Not Found', 'my-social-feeds')}</h3>
						</div>
					)}

					<div className={`ttpfeedItemArea ${feedLayoutStyle} columns-${columns.desktop} columns-tablet-${columns.tablet} columns-mobile-${columns.mobile}`}>
						{feedLayoutStyle === 'slider' ? (
							<Slider {...dataProps} />
						) : feedLayoutStyle === 'masonry' ? (
							<Masonry {...dataProps} />
						) : (
							<Default {...dataProps} />
						)}
					</div>

					{loading ? (
						<div className="contentPreloader">{contentPreloader}</div>
					) : (
						<div className="ttpHasMore">
							{isBtn?.viewOn && (
								<a target="_blank" rel="noreferrer" href={userInfo?.profile_deep_link}>
									{btnTiktok(loadMoreBtnColors?.color, viewLoadBtnIcon?.size)}
									View on TikTok
								</a>
							)}

							{info.hasMore && isBtn?.loadMore && (
								<button onClick={handleLoadMore}>{loadMoreBtn}</button>
							)}
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Feeds;