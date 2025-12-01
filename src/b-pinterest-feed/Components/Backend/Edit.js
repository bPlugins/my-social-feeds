import { useState, useEffect } from 'react';
// import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
// import { RichText } from '@wordpress/block-editor';
import { produce } from 'immer';

// import { BplMediaPlaceholder } from '../../../../Components';
// import { tabController } from '../../../../Components/utils/functions';

import '../../editor.scss';
import Settings from './Settings/Settings';
import Layout from '../Common/Layout';
import Style from '../Common/Style';

const Edit = props => {
	const { attributes, setAttributes, clientId, isSelected } = props;
	const { accountInfo } = attributes;
	const { userName, boardName } = accountInfo;
	const [pins, setPins] = useState([]);
	const [status, setStatus] = useState();
	const [loading, setLoading] = useState(false);

	const updateObject = (obj, key, val, otherKey = null) => {
		const newObj = produce(attributes[obj], draft => {
			if (null !== otherKey) {
				draft[key][otherKey] = val;
			} else {
				draft[key] = val;
			}
		});
		setAttributes({ [obj]: newObj });
	}

	const fetchPins = async () => {
		setLoading(true);
		const res = await fetch(`${bPinterestData?.ajaxUrl}?action=bPinterestAjaxRequest&userName=${userName}&boardName=${boardName}&nonce=${bPinterestData?.nonce}`);
		const response = await res.json();

		setPins(response.data?.data);
		setStatus(response.data);
		setLoading(false);
	}

	useEffect(() => {
		fetchPins();
	}, []);

	const id = `b-pinterest-feed-${clientId}`;

	// if(status === 40){
	// 	return <div>Board name not found</div>;
	// }

	return <>
		<Settings clientId={clientId} attributes={attributes} setAttributes={setAttributes} fetchPins={fetchPins} updateObject={updateObject} />

		<div {...useBlockProps()} id={id}>
			<Style attributes={attributes} eleId={id} />
			<Layout attributes={attributes} pins={pins} elId={id} status={status} loading={loading} />
		</div>
	</>;
}
export default Edit;