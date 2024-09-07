

import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
import { dateTimeConvert } from '../../../../utils/functions';
import TwoIcon from '../child/TwoIcon';
import PlayIcon from '../child/PlayIcon';
import Image from '../child/Image';
import Popup from '../child/Popup';

const Slider = ({ attributes, elId, videos, userInfo }) => {
    const {  isLike, isComment, isView, overlyIconColor, overlyIcon } = attributes;

    return <Swiper modules={[Navigation, A11y]} spaceBetween={10} slidesPerView={3} navigation pagination={{ clickable: true }} scrollbar={{ draggable: true }}>
        {videos?.map((feed, index) => {
            const { cover_image_url, id, comment_count, create_time, like_count, view_count, share_url, title } = feed || {};
            const createTime = dateTimeConvert(create_time);
            return <SwiperSlide key={index}>
                <div key={index} className='feedMainArea'>
                    <Popup index={index} attributes={attributes} elId={elId} userInfo={userInfo} id={id} share_url={share_url} title={title} comment_count={comment_count} like_count={like_count} createTime={createTime} />

                    <div data-fancybox={`ttp-dialog-${elId}`} data-src={`#ttp-dialog-content-${elId}${index}`} className="feedItem">
                        <div className="feedItemImg square">
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
                </div>
            </SwiperSlide>
        })}
    </Swiper>

}
export default Slider