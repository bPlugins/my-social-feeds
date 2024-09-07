
import { dateTimeConvert } from '../../../../utils/functions';
import Image from '../child/Image';
import PlayIcon from '../child/PlayIcon';
import Popup from '../child/Popup';
import TwoIcon from '../child/TwoIcon';
const Default = ({ videos, attributes,elId ,userInfo }) => {
    const {  isLightbox, isLike, isComment, isView, overlyIconColor, overlyIcon } = attributes;

    return videos?.map((feed, index) => {
        const { cover_image_url, id, create_time, title, comment_count, like_count, view_count, share_url } = feed || {};
        const createTime = dateTimeConvert(create_time);
        return (cover_image_url && isLightbox) ? <div key={index} className='feedMainArea'>

            <Popup index={index} attributes={attributes} elId={elId} userInfo={userInfo} id={id} share_url={share_url} title={title} comment_count={comment_count} like_count={like_count} createTime={createTime} />

            <div data-fancybox={`ttp-dialog-${elId}`} data-src={`#ttp-dialog-content-${elId}${index}`} className="feedItem">
                <div className="feedItemImg square" >
                    <Image cover_image_url={cover_image_url} />
                </div>
                <div className="feedInfoArea">
                    <div className="feedItemInfo">
                        <TwoIcon isComment={isComment} isLike={isLike} overlyIconColor={overlyIconColor} overlyIcon={overlyIcon} comment_count={comment_count} like_count={like_count} />
                    </div>

                    <div className="feedPlayCount">
                        <PlayIcon isView={isView} overlyIcon={overlyIcon} overlyIconColor={overlyIconColor} view_count={view_count} />
                    </div>
                </div>
            </div>
        </div> : cover_image_url && <div key={index} className='feedMainArea'>

            <div className="feedItem">
                <Image cover_image_url={cover_image_url} />
                <div className="feedInfoArea">
                    <div className="feedItemInfo">
                        <TwoIcon isComment={isComment} isLike={isLike} overlyIconColor={overlyIconColor} overlyIcon={overlyIcon} comment_count={comment_count} like_count={like_count} />
                    </div>

                    <a href={share_url} target="_blank" rel="noreferrer"><div className="feedPlayCount">
                        <PlayIcon isView={isView} overlyIcon={overlyIcon} overlyIconColor={overlyIconColor} view_count={view_count} />
                    </div> </a>
                </div>
            </div>
        </div>
    })
}
export default Default;