

import { playCount } from '../../../../utils/icons';
const PlayIcon = ({ isView, overlyIcon, overlyIconColor, view_count }) => {
    return isView && <p>{playCount(overlyIconColor, overlyIcon?.size)} <span>{view_count}</span></p>
}
export default PlayIcon;