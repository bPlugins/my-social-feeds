
import { useState, useEffect, useRef } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
// Settings Components
import Settings from './Settings/Settings';
import Style from '../Common/Style';
import Feeds from '../Common/Feeds';
import { tabController } from '../../utils/functions';

const Edit = props => {
	const { className, attributes, setAttributes, clientId, isSelected } = props;

	useEffect(() => tabController(), [isSelected]);

	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		setAttributes({ authorized: !!ttpData.tiktokAuthorized });
	}, []);

	const id = `ttpTiktok-${clientId}`;

	return <>
		<Settings attributes={attributes} elId={id} setAttributes={setAttributes} clientId={clientId} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

		<div {...useBlockProps()} id={id}>
			<Style attributes={attributes} elId={id} />
			<Feeds attributes={attributes} elId={id} isBackend={true} react={{ useState, useEffect, useRef }} />
		</div>
	</>;
};
export default Edit;



