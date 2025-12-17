
import { createRoot } from 'react-dom/client';
import './style.scss';
import Style from './Style';
import Timeline from './Components/Common/Timeline';
import FollowButton from './Components/Common/FollowButton';
import TweetButton from './Components/Common/TweetButton';
import VideoPost from './Components/Common/VideoPost';
import Hastag from './Components/Common/Hastag';

// Block Name
document.addEventListener('DOMContentLoaded', () => {
	const blockEls = document.querySelectorAll('.wp-block-etf-twitter-feed');
	blockEls.forEach(blockEl => {
		const attributes = JSON.parse(blockEl.dataset.attributes);

		createRoot(blockEl).render(<>
			<Style attributes={attributes} id={blockEl?.id} />
			<TwitterFeed attributes={attributes} />
		</>);

		blockEl?.removeAttribute('data-attributes');
	});
});

const TwitterFeed = ({ attributes }) => {
	const { type } = attributes;

	return <div className={`etfTwitterFeed`}>
		{type == "timeline" && <Timeline attributes={attributes} />}
		{type == "follow" && <FollowButton attributes={attributes} />}
		{type == "tweet" && <TweetButton attributes={attributes} />}
		{type == "tag" && <Hastag attributes={attributes} />}
		{['video', 'post'].includes(type) && <VideoPost attributes={attributes} />}
	</div>
}