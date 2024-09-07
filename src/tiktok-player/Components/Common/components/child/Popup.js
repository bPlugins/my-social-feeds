

import LeftSideContent from './PopupContent/LeftSideContent';
import RightSideContent from './PopupContent/RightSideContent';

const Popup = ({ index, attributes,elId, userInfo, id, share_url, title, comment_count, like_count, createTime }) => {
    const {  isPopupContent } = attributes;
    return <div id={`ttp-dialog-content-${elId}${index}`} className={`modal_content_masonry ttp_modal_content dialog-content-${elId}`} >
        <div className="feedPopUpArea" >
            <LeftSideContent id={id} />
            {isPopupContent?.rightContent &&
                <RightSideContent attributes={attributes} index={index} userInfo={userInfo} share_url={share_url} title={title} comment_count={comment_count} like_count={like_count} createTime={createTime} />}
        </div>
    </div>
}
export default Popup;