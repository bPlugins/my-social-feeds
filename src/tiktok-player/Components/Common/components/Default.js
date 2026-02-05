

import { __ } from '@wordpress/i18n';
import { tiktokVerifyIcon } from '../../../utils/icons';
const Default = ({ isProfileImg, userInfo, isDisplayName, isShareBtn, shareBtn, isFollowing, isFollowers, isTotalLike, isBio }) => {
    return <div className="userProfileInfo ProfileCard">
        <div className="profileInfo">
            {isProfileImg &&
                <div className="profileImg">
                    <img src={userInfo.avatar_url} alt="" />
                </div>
            }

            <div className="displayNameShare">
                {isDisplayName &&
                    <a href={userInfo.profile_deep_link}>{userInfo.display_name}
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
        </div>
        <div className="social_count">
            <ul>
                {isFollowing &&
                    <li><span>{userInfo.following_count}</span>{__('Following', 'my-social-feeds')}</li>
                }
                {isFollowers &&
                    <li><span>{userInfo.follower_count}</span>{__('Followers', 'my-social-feeds')}</li>
                }
                {isTotalLike &&
                    <li><span>{userInfo.likes_count}</span>{__('Likes', 'my-social-feeds')}</li>
                }

            </ul>
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
export default Default;