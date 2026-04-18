import { useEffect, useState, useRef } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { withSelect } from "@wordpress/data";

import Settings from './Settings/Settings';
import Style from '../Common/Style';
import Feeds from '../Common/Feeds';
import { tabController } from '../../utils/functions';
import ClipBoard from '../../../ClipBoard';

const Edit = (props) => {
	const { attributes, setAttributes, clientId, isSelected, currentPostId, CPTType } = props;
	const [accounts, setAccounts] = useState([]);
	useEffect(() => tabController(), [isSelected]);

	const isPremium = Boolean(msfbppipecheck ?? false);
	const shortcode = `[msfbp-social-feeds id=${currentPostId}]`;

	useEffect(() => {
		const fetchAccounts = async () => {
			try {
				const res = await fetch(`${ttpData.ajaxUrl}?action=ttp_get_accounts&nonce=${ttpData.nonce}`);
				const json = await res.json();
				const list = json?.data || [];

				setAccounts(list);

				if (!list.length) {
					setAttributes({
						authorized: false,
						selectedAccountId: '',
					});
					return;
				}

				// 🔥 old users: selectedAccountId missing -> set first account
				// if (list.length && !attributes.selectedAccountId) {
				// 	setAttributes({
				// 		selectedAccountId: list[0].account_id,
				// 		authorized: true,
				// 	});
				// }
			} catch (e) {
				console.error('Failed to fetch accounts', e);
			}
		};
		fetchAccounts();
	}, []);

	const id = `ttpTiktok-${clientId}`;

	return (
		<>
			<Settings attributes={attributes} elId={id} setAttributes={setAttributes} clientId={clientId} accounts={accounts} isPremium={isPremium} />

			<div {...useBlockProps()} id={id}>
				{CPTType === "msfbp" && <ClipBoard shortcode={shortcode} />}
				<Style attributes={attributes} elId={id} />

				<Feeds attributes={attributes} setAttributes={setAttributes} elId={id} isBackend={true} accounts={accounts} react={{ useState, useEffect, useRef }} isPremium={isPremium} />
			</div>
		</>
	);
};

export default withSelect((select) => {
	const currentPostId = select('core/editor').getCurrentPostId();
	const CPTType = select('core/editor').getCurrentPostType?.();
	return {
		currentPostId,
		CPTType
	};
})(Edit);
