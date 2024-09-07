import { __ } from '@wordpress/i18n';
import { tiktokVerifyIcon } from '../../../utils/icons';

const Card = ({ isProfileImg, userInfo, isDisplayName, isShareBtn, shareBtn, isFollowing, isFollowers, isTotalLike, isBio }) => {
    return <div className="CarduserProfileInfo ProfileCard">
        {isProfileImg &&
            <div className="profileImg">
                <img src={userInfo.avatar_url} alt={isDisplayName} />
            </div>
        }
        <div className="profileInfo">
            <div className="displayNameShare">
                {isDisplayName &&
                    <a href={userInfo.profile_deep_link}>
                        {userInfo.display_name}
                        {userInfo.is_verified && <>
                            {tiktokVerifyIcon}
                        </>
                        }
                    </a>
                }
                {isShareBtn &&
                    <a className="ttpShareBtn" href={userInfo.profile_deep_link}>{shareBtn}</a>
                }
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
        {isBio &&
            <div className="user_bio">
                <p>
                    {userInfo.bio_description}
                </p>
            </div>
        }
    </div>
}
export default Card;