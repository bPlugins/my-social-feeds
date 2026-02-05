import { useState, useEffect } from 'react';
// import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
// import { RichText } from '@wordpress/block-editor';
import { produce } from 'immer';
import { withSelect } from "@wordpress/data";

// import { BplMediaPlaceholder } from '../../../../Components';
// import { tabController } from '../../../../Components/utils/functions';

import '../../editor.scss';
import Settings from './Settings/Settings';
import Layout from '../Common/Layout';
import Style from '../Common/Style';
import ClipBoard from '../../../ClipBoard';

const Edit = props => {
	const isPremium = Boolean(msfbppipecheck ?? false);
	const { attributes, setAttributes, clientId, isSelected, currentPostId, CPTType } = props;
	const { accountInfo } = attributes;
	const { userName, boardName } = accountInfo;
	const [pins, setPins] = useState([]);
	const [status, setStatus] = useState();
	const [loading, setLoading] = useState(false);
	const [allNames, setAllNames] = useState([]);

	const shortcode = `[msfbp-social-feeds id=${currentPostId}]`;

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

	const fetchAccountNames = async () => {
		try {
			const res = await fetch(
				`${msfAuthorization?.ajaxUrl}?action=msfbp-get-pinterest-credentials&nonce=${msfAuthorization?.nonce}`
			);
			const data = await res.json();
			setAllNames(data?.data);
		} catch (e) {
			console.error(e);
		} finally {
			// setLoading(false);
		}
	};

	useEffect(() => {
		fetchAccountNames();
	}, []);

	return <>
		<Settings allNames={allNames} clientId={clientId} attributes={attributes} setAttributes={setAttributes} fetchPins={fetchPins} updateObject={updateObject} isPremium={isPremium} />

		<div {...useBlockProps()} id={id}>
			{CPTType === "msfbp" && <ClipBoard shortcode={shortcode} />}

			<Style attributes={attributes} eleId={id} />
			<Layout isBackEnd={true} allNames={allNames} attributes={attributes} pins={pins} elId={id} status={status} loading={loading} setAttributes={setAttributes} fetchPins={fetchPins} isPremium={isPremium} />
		</div>
	</>;
}
export default withSelect((select) => {
	const currentPostId = select('core/editor').getCurrentPostId();
	const CPTType = select('core/editor').getCurrentPostType?.();
	return {
		currentPostId,
		CPTType
	};
})(Edit);