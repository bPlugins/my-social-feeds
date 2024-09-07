

import { contentComment, contentHeart, tiktokPop } from '../../../../../utils/icons';
const RightSideContent = ({ attributes, index, userInfo, share_url, title, comment_count, like_count, createTime }) => {
    const { layoutColors, icon } = attributes;
    return <div className="feedInfo">
        <div className="profile">
            <div className="img"><img src={userInfo?.avatar_url} alt="" /></div>
            <div className="name">
                <h3>{userInfo?.display_name}</h3>
                <a href={userInfo?.profile_deep_link} target='_blank' rel='noreferrer'>@{userInfo?.display_name}</a>
            </div>
        </div>
        <div className="body">
            <div className="body_icons_title">
                <ul>
                    <li>{index + 1}/{userInfo?.video_count}</li>
                    <li><a href={share_url} target='_blank' rel='noreferrer'>{tiktokPop(layoutColors?.color)}TikTok</a></li>
                </ul>
                <div className="title">
                    {title}
                </div>
            </div>
        </div>
        <div className="footer">
            <div className="icons">
                <p>{contentComment(layoutColors?.color, icon?.size)}<span>{comment_count}</span></p>
                <p> {contentHeart(layoutColors?.color, icon?.size)}<span>{like_count}</span></p>
            </div>
            <div className="time">
                {createTime}
            </div>
        </div>
    </div>
}
export default RightSideContent;