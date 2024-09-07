
import { contentComment, contentHeart } from '../../../../utils/icons';
import { dateTimeConvert } from '../../../../utils/functions';
import TwoIcon from '../child/TwoIcon';
import PlayIcon from '../child/PlayIcon';
import Image from '../child/Image';
import Popup from '../child/Popup';

const Masonry = ({ videos, attributes,elId, userInfo }) => {
    const {  isLike, isComment, isView, overlyIconColor, overlyIcon, layoutColors, icon, videosInfo } = attributes;

    return videos?.map((feed, index) => {
        const { cover_image_url, id, title, create_time, comment_count, like_count, view_count, share_url } = feed || {};

        const createTime = dateTimeConvert(create_time);

        return cover_image_url && <div key={index} className='feedMainArea'>
            <Popup index={index} attributes={attributes} elId={elId} userInfo={userInfo} id={id} share_url={share_url} title={title} comment_count={comment_count} like_count={like_count} createTime={createTime} />

            <div data-fancybox={`ttp-dialog-${elId}`} data-src={`#ttp-dialog-content-${elId}${index}`} className="feedItem">
                <div className="feedItemImg">
                    <Image cover_image_url={cover_image_url} />

                    <div className="feedInfoArea">
                        <div className="feedItemInfo">
                            <TwoIcon isComment={isComment} isLike={isLike} overlyIconColor={overlyIconColor} overlyIcon={overlyIcon} comment_count={comment_count} like_count={like_count} />
                        </div>

                        <div className="feedPlayCount">
                            <PlayIcon isView={isView} overlyIcon={overlyIcon} overlyIconColor={overlyIconColor} view_count={view_count} />
                        </div>
                    </div>
                </div>


                <div className="footerInfo">
                    <div className="top">
                        {videosInfo?.date && <div className="time">{createTime}</div>}
                        <div className="info">
                            {videosInfo?.comment && <p> {contentComment(layoutColors?.color, icon?.size)}<span>{comment_count}</span></p>}
                            {videosInfo?.like && <p>{contentHeart(layoutColors?.color, icon?.size)}<span>{like_count}</span></p>}
                        </div>
                    </div>
                </div>
                <div className="title">
                    {videosInfo?.title && <p>{title}</p>}
                </div>

            </div>
        </div >

    })
}
export default Masonry;