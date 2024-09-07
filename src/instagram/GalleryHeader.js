import Profile from './Components/Elements/Profile';
import FollowBtn from './Components/Elements/FollowBtn';

const GalleryHeader = ({ user, attributes }) => {
	const { username } = user || {};
	const { isProfile, isFollowBtn, isFollowBtnInFooter } = attributes;

	return isProfile || (isFollowBtn && !isFollowBtnInFooter) ? <div className='galleryHeader'>
		<Profile attributes={attributes} user={user} />

		{!isFollowBtnInFooter && <FollowBtn attributes={attributes} username={username} />}
	</div> : null;
}
export default GalleryHeader;