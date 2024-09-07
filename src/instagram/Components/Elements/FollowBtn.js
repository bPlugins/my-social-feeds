const FollowBtn = ({ attributes, username }) => {
	const { isFollowBtn } = attributes;

	const link = `https://www.instagram.com/${username}`;

	return isFollowBtn && <a className='followBtn' href={link} target='_blank' rel='noreferrer'>Follow On Instagram</a>
}
export default FollowBtn;