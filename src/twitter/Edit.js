import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { produce } from 'immer';
import { useBlockProps } from '@wordpress/block-editor';
// Settings Components
import { tabController } from '../../../bpl-tools/utils/functions';
import { withSelect } from "@wordpress/data";
import Settings from './Settings';
import Style from './Style';
import { Placeholder } from '@wordpress/components';
import Timeline from './Components/Common/Timeline';
import FollowButton from './Components/Common/FollowButton';
import TweetButton from './Components/Common/TweetButton';
import { twitterIcon } from './utils/icons';
import { types } from './utils/options';
import { BtnGroupPro } from '../../../bpl-tools/ProControls';
import VideoPost from './Components/Common/VideoPost';
import Hastag from './Components/Common/Hastag';
import ClipBoard from '../ClipBoard';

const Edit = props => {
	const isPremium = Boolean(msfbppipecheck ?? false);
	const { className, attributes, setAttributes, clientId, isSelected, currentPostId, CPTType } = props;
	const { type } = attributes;

	useEffect(() => { clientId && setAttributes({ cId: clientId.substring(0, 10) }); }, [clientId]); // Set & Update clientId to cId

	const [aboutProOpen, setAboutProOpen] = useState(false);

	useEffect(() => tabController(), [isSelected]);
	const shortcode = `[msfbp-social-feeds id=${currentPostId}]`;

	const updateObj = (object, property, val, childProp = false) => {
		const newObj = produce(attributes[object], draft => {
			if (false !== childProp) {
				draft[property][childProp] = val;
			} else {
				draft[property] = val;
			}
		});
		setAttributes({ [object]: newObj });
	}

	const premiumProps = {
		isPremium,
		setOpen: setAboutProOpen
	};

	const id = `etfTwitterFeed-${clientId}`

	return <>
		<Settings clientId={clientId} attributes={attributes} setAttributes={setAttributes} updateObj={updateObj} aboutProOpen={aboutProOpen} setAboutProOpen={setAboutProOpen} premiumProps={premiumProps} />

		<div {...useBlockProps()} id={id}>
			<Style attributes={attributes} id={id} />

			<div className={`etfTwitterFeed`}>
				{CPTType === "msfbp" && <ClipBoard shortcode={shortcode} />}
				{type ? <>
					{type == "timeline" && <div className="twitter_iframe">
						<Timeline attributes={attributes} />
					</div>}
					{type == "follow" && <FollowButton attributes={attributes} />}
					{type == "tweet" && <TweetButton attributes={attributes} />}
					{type == "tag" && <Hastag attributes={attributes} />}
					{['video', 'post'].includes(type) && <VideoPost attributes={attributes} />}
				</> :
					<Placeholder icon={twitterIcon('#03A9F4')} instructions={__("Choose a Feed type to get started.", "my-social-feeds")} label={__("Choose a Feed Type", "my-social-feeds")}>
						<BtnGroupPro value={type} onChange={val => setAttributes({ type: val })} options={types} proValues={['video', 'post', 'tag']} {...premiumProps} setIsProModalOpen={setAboutProOpen} />
					</Placeholder>}
			</div>
		</div>
	</>;
};
export default withSelect((select) => {
	const currentPostId = select('core/editor').getCurrentPostId();
	const CPTType = select('core/editor').getCurrentPostType?.();
	return {
		currentPostId,
		CPTType
	};
})(Edit);


