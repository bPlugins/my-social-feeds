const FollowBtn = ({ attributes, username }) => {
	const { isFollowBtn, profileInfo } = attributes;
	const { followBtnText } = profileInfo;

	const link = `https://www.instagram.com/${username}`;

	return isFollowBtn && <a className='followBtn' href={link} target='_blank' rel='noreferrer'>{followBtnText}</a>
}
export default FollowBtn;