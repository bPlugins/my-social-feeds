import { __ } from '@wordpress/i18n';
import { useState, useEffect } from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { TabPanel } from '@wordpress/components';

import { tabController } from '../../../../../../bpl-tools/utils/functions';
// Settings Components
import Loading from '../../Loading';
import useAllAccounts from '../../../hooks/useAllAccounts';
import useBlockAccounts from '../../../hooks/useBlockAccounts';
import { isSameArray } from '../../../utils/functions';
import { generalStyleTabs } from '../../../utils/options';
import General from './General/General';
import Elements from './Elements/Elements';
import Style from './Style/Style';
import { AboutProModal } from '../../../../../../bpl-tools/ProControls';
import { adminUrl } from '../../../../twitter/utils/functions';

const Settings = ({ attributes, setAttributes, setPageNumber, clientId, tokens, isPremium }) => {
	const { accounts, accessToken, } = attributes;

	const { allAccounts, loading: allAccLoading } = useAllAccounts(accessToken);
	const { accounts: blockAccounts, loading } = useBlockAccounts(allAccounts, attributes);


	const [proModalOpen, setProModalOpen] = useState(false);

	useEffect(() => {
		window.addEventListener('ifbEvent', () => {
			if (!allAccLoading) {
				const allAccountsIds = allAccounts?.map(a => a?.user_id);
				const filtered = accounts?.filter(bA => allAccountsIds?.includes(bA?.user_id));
				if (!isSameArray(accounts, filtered, 'user_id')) {
					setAttributes({ accounts: filtered });
				}
			}
		});
	}, [allAccounts]);

	const updateObj = (obj, prop, val) => setAttributes({ [obj]: { ...attributes[obj], [prop]: val } });

	if (loading) {
		return <Loading />
	}

	const isBusiness = 'business' === blockAccounts[0]?.connectType;
	const globalAttr = { attributes, setAttributes, isPremium, setProModalOpen, clientId, tokens };

	return <><InspectorControls>
		<TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>{tab => <>
			{'general' === tab.name && <General {...globalAttr} setPageNumber={setPageNumber} />}

			{'elements' === tab.name && <>
				<Elements {...globalAttr} isBusiness={isBusiness} updateObj={updateObj} />
			</>}

			{'style' === tab.name && <>
				<Style {...globalAttr} updateObj={updateObj} />
			</>}
		</>}</TabPanel>
	</InspectorControls>

		<AboutProModal isProModalOpen={proModalOpen} setIsProModalOpen={setProModalOpen} link={adminUrl()}>
			<li>&emsp;<strong>{__('Popup: ', 'my-social-feeds')}</strong>{__('Show feed details in the popup modal.', 'my-social-feeds')}</li>
			<li>&emsp;<strong>{__('Name: ', 'my-social-feeds')}</strong>{__('Show Name in profile area.', 'my-social-feeds')}</li>
			<li>&emsp;<strong>{__('Biography: ', 'my-social-feeds')}</strong>{__('Show Biography in profile area.', 'my-social-feeds')}</li>
			<li>&emsp;<strong>{__('Profile Photo: ', 'my-social-feeds')}</strong>{__('Set different Profile Photo size in popup area.', 'my-social-feeds')}</li>
			<li>&emsp;<strong>{__('Caption: ', 'my-social-feeds')}</strong>{__('Remove Caption hashtag', 'my-social-feeds')}</li>
			<li>&emsp;<strong>{__('Name: ', 'my-social-feeds')}</strong>{__('Change name color', 'my-social-feeds')}</li>
			<li>&emsp;<strong>{__('Biography: ', 'my-social-feeds')}</strong>{__('Change biography color', 'my-social-feeds')}</li>
		</AboutProModal>

	</>;
};
export default Settings;