
import { comment, heart } from '../../../../utils/icons';
const TwoIcon = ({ isComment, isLike, overlyIconColor, overlyIcon, comment_count, like_count }) => {
    return <>
        {isComment &&
            <p>{comment(overlyIconColor, overlyIcon?.size)}<span>{comment_count}</span></p>
        }
        {isLike &&
            <p> {heart(overlyIconColor, overlyIcon?.size)}<span>{like_count}</span> </p>
        }
    </>
}
export default TwoIcon;