const Profile = ({ attributes, user }) => {

	const { isProfile, profileImg, profileInfo } = attributes;
	const { isFollowers, isFollows, isName, name: nameText, isBio, bio } = profileInfo || {};
	const { username, profile_picture_url, name, biography, followers_count, follows_count } = user;

	const link = `https://www.instagram.com/${username}`;

	return isProfile && <div className='ifbProfile'>
		<a className='profileImg' href={link} target='_blank' rel='noreferrer'>
			<img src={profile_picture_url || profileImg} alt={username} />
		</a>

		<div className='profileText'>
			<a className='userName' href={link} target='_blank' rel='noreferrer'>@{username}</a>

			{/* {isFollowers || isFollows ? <div className='follow'>
				{isFollowers && <p className='followers'>{followers_count} followers</p>}
				{isFollows && <p className='following'>{follows_count} following</p>}
			</div> : ''} */}

			{isName && <p className='name'>{name ? name : nameText}</p>}

			{isBio && <p className='biography'>{biography ? biography : bio}</p>}
		</div>
	</div>
}
export default Profile;