import { __ } from '@wordpress/i18n';
import { tiktokVerifyIcon } from '../../../utils/icons';
const Compact = ({ isProfileImg, userInfo, isDisplayName, isShareBtn, shareBtn, isFollowing, isFollowers, isTotalLike }) => {
    return <div className="mainCompactProfileInfo ProfileCard">

        <div className="CompactuserProfileInfo">
            <div className="CompactuserProfileimgbtn ">
                {isProfileImg &&
                    <div className="profileImg">
                        <img src={userInfo.avatar_url} alt="" />
                    </div>
                }
                <div className="profileInfo">
                    <div className="displayNameShare">
                        {isDisplayName &&
                            <a href={userInfo.profile_deep_link}>{userInfo.display_name}
                                {userInfo.is_verified && <>
                                    {tiktokVerifyIcon}
                                </>
                                }</a>
                        }
                        {isShareBtn &&
                            <a className="ttpShareBtn" href={userInfo.profile_deep_link}>{shareBtn}</a>
                        }
                    </div>
                </div>
            </div>

            <div className="social_share">
                <ul>
                    {isFollowing &&
                        <li><span>{userInfo.following_count}</span>{__('Following', 'tiktok')}</li>
                    }
                    {isFollowers &&
                        <li><span>{userInfo.follower_count}</span>{__('Followers', 'tiktok')}</li>
                    }
                    {isTotalLike &&
                        <li><span>{userInfo.likes_count}</span>{__('Likes', 'tiktok')}</li>
                    }
                </ul>
            </div>
        </div>
    </div>
}
export default Compact;