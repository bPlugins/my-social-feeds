import { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { withSelect } from "@wordpress/data";

import Settings from './Settings/Settings';
import Style from '../Common/Style';
import Feeds from '../../Feeds';
import Loading from '../Loading';
import useAllAccounts from '../../hooks/useAllAccounts';
import Authorization from '../../../Components/Authorization';
import ClipBoard from '../../../ClipBoard';

const Edit = props => {
	const isPremium = Boolean(msfbppipecheck ?? false);

	const { attributes, setAttributes, clientId, currentPostId, CPTType } = props;
	const { accessToken } = attributes;
	const [pageNumber, setPageNumber] = useState(1);
	const [tokens, setTokens] = useState([]);
	const { loading } = useAllAccounts();
	const blockProps = useBlockProps();
	const shortcode = `[msfbp-social-feeds id=${currentPostId}]`;

	const fetchTokens = async () => {
		try {
			const res = await fetch(
				`${msfAuthorization?.ajaxUrl}?action=msfbp-get-instagram-access-token&nonce=${msfAuthorization?.nonce}`
			);
			const data = await res.json();
			setTokens(data?.data);

		} catch (e) {
			console.error(e);
		} finally {
			// setLoading(false);
		}
	};

	useEffect(() => {
		fetchTokens();
	}, []);

	if (loading) {
		return <Loading />
	}

	const authorizationProps = {
		"title": __("Connect Your Instagram Account", "my-social-feeds"),
		"description": __("To continue, please connect your Instagram account.We only access basic profile and media data.", "my-social-feeds"),
		"button": __("Connect New Account", "my-social-feeds"),
		"bottomDes": __("🔒 Secure authorization via Instagram", "my-social-feeds"),
		"selectControlLabel": __("Choose Connected Account", "my-social-feeds")
	};

	const updatedData = tokens.map(item => ({
		...item,
		label: item.label && item.label.trim() !== "" ? item.label : item.value
	}));

	const options = [{ label: __('Select Account', 'my-social-feeds'), value: '' }, ...updatedData];
	const onChangeAccount = (val) => {
		setAttributes({ accessToken: [val] });
	}

	const authorizationMeinProps = { options, onChangeAccount, authorizationProps, isPremium, attributes, setAttributes };

	return <>
		<Settings tokens={updatedData} attributes={attributes} setAttributes={setAttributes} clientId={clientId} setPageNumber={setPageNumber} isPremium={isPremium} />

		<div {...blockProps} id={`ifbInstagramFeed-${clientId}`}>
			{CPTType === "msfbp" && <ClipBoard shortcode={shortcode} />}
			<Style attributes={attributes} clientId={clientId} />

			{accessToken[0] !== '' ? <Feeds attributes={attributes} pageNumber={pageNumber} setPageNumber={setPageNumber} /> : <Authorization {...authorizationMeinProps} />}
		</div>

		<InnerBlocks templateLock={false} allowedBlocks={["bpifb/my-social-feeds", "ttp/tiktok-player", "bpf/b-pinterest-feed", "etf/twitter-feed"]} />
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