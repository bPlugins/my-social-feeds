import useInstagram from './hooks/useInstagram';
import { hasObjProperty, isEmptyObject } from './utils/functions';
import GalleryLoading from './Components/GalleryLoading';
import GalleryHeader from './GalleryHeader';
import Gallery from './Gallery';
import FollowBtn from './Components/Elements/FollowBtn';

const Feeds = ({ attributes, pageNumber, setPageNumber }) => {
	const { itemVisible, isFollowBtn, isFollowBtnInFooter, isLoadMore } = attributes;
	const { users, usersData, loading } = useInstagram(attributes);
	if (loading) {
		return <GalleryLoading />
	}

	const user = users?.[0] || {};
	const { username } = user;
	const userData = username && usersData && hasObjProperty(usersData, username) ? usersData[username] : {};
	const { media } = userData || {};

	return <div className='ifbInstagramFeed'>
		{!isEmptyObject(userData) ? <>
			<GalleryHeader user={user} attributes={attributes} />
			<Gallery attributes={attributes} user={user} feeds={media} pageNumber={pageNumber} />
			{isLoadMore || (isFollowBtn && isFollowBtnInFooter) ? <div className='galleyFooter'>
				<button className={`loadMoreBtn ${media?.length > itemVisible * pageNumber ? 'visible' : 'hidden'}`} onClick={() => setPageNumber(pageNumber + 1)}>Load More</button>
				{isFollowBtnInFooter && <FollowBtn attributes={attributes} username={username} />}
			</div> : null}
		</> : ''}
	</div>;
}
export default Feeds;