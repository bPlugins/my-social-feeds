
import Compact from './Compact';
import Card from './Card';
import Default from './Default';
const Profile = ({ pLayoutStyle, isProfileImg, userInfo, isDisplayName, isShareBtn, shareBtn, isFollowing, isFollowers, isTotalLike, isBio }) => {

    return <div className='ttpProfile'>
        {pLayoutStyle === 'default' &&
            <Default isProfileImg={isProfileImg} userInfo={userInfo} isDisplayName={isDisplayName} isShareBtn={isShareBtn} shareBtn={shareBtn} isFollowing={isFollowing} isFollowers={isFollowers} isTotalLike={isTotalLike} isBio={isBio} />
        }
        {
            pLayoutStyle === 'card' &&
            <Card isProfileImg={isProfileImg} userInfo={userInfo} isDisplayName={isDisplayName} isShareBtn={isShareBtn} shareBtn={shareBtn} isFollowing={isFollowing} isFollowers={isFollowers} isTotalLike={isTotalLike} isBio={isBio} />
        }
        {
            pLayoutStyle === 'compact' &&
            <Compact isProfileImg={isProfileImg} userInfo={userInfo} isDisplayName={isDisplayName} isShareBtn={isShareBtn} shareBtn={shareBtn} isFollowing={isFollowing} isFollowers={isFollowers} isTotalLike={isTotalLike} isBio={isBio} />
        }
    </div>
}
export default Profile;