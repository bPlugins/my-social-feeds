
const Profile = ({attributes, pins}) => {
    
    const {elements} = attributes;
    const {isImage, isName, isDesc, isFollower, isPin, isBtn} = elements;
    const {image_small_url, full_name, profile_url, follower_count, pin_count, about } = pins?.user || {};
    
    return <div className='profile'>
        {isImage && <div className="profile_image">
            <a href={profile_url}>
                <img src={image_small_url} alt="full_name" />
            </a>
        </div>}
        {isName && <div className="name">
            <a href={profile_url}>
                <span>@</span>
                <span>{full_name}</span>
            </a>
        </div>}
        {isDesc && <div className="about">
            <p>{about}</p>
        </div>}
        <div className="count-area">
            {isFollower && <div className="follower">
                <span>Follower: {follower_count}</span>
            </div>}
            {isPin && <div className="pin">
                <span>Pin: {pin_count}</span>
            </div>}
        </div>
        {isBtn && <div className="followBtn">
            <a target="__blank" href={profile_url}>Follow Us On Pinterest</a>
        </div>}
    </div>
}
export default Profile;