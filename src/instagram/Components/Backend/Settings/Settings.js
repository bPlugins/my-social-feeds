import { __ } from '@wordpress/i18n';
import { useState, useEffect } from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { TabPanel } from '@wordpress/components';

import { tabController } from '../../../../../../bpl-tools/utils/functions';

// Settings Components
import ProModal from '../../../../Pro-modal/ProModal';
import usePremiumInEditor from '../../../../hooks/usePremiumInEditor';

import Loading from '../../Loading';
import useAllAccounts from '../../../hooks/useAllAccounts';
import useBlockAccounts from '../../../hooks/useBlockAccounts';
import { isSameArray } from '../../../utils/functions';
import { generalStyleTabs } from '../../../utils/options';
import General from './General/General';
import Elements from './Elements/Elements';
import Style from './Style/Style';

const Settings = ({ attributes, setAttributes, setPageNumber }) => {
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
	const { isPremium } = usePremiumInEditor();
	const globalAttr = { attributes, setAttributes, isPremium, setProModalOpen }

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

		<ProModal isProModal={proModalOpen} setIsProModal={setProModalOpen} block='Instagram Feeds'>
			<li>&emsp;<strong>{__('Popup: ', 'instagram-feed')}</strong>{__('Show feed details in the popup modal.', 'instagram-feed')}</li>
			<li>&emsp;<strong>{__('Name: ', 'instagram-feed')}</strong>{__('Show Name in profile area.', 'instagram-feed')}</li>
			<li>&emsp;<strong>{__('Biography: ', 'instagram-feed')}</strong>{__('Show Biography in profile area.', 'instagram-feed')}</li>
			<li>&emsp;<strong>{__('Follow Button: ', 'instagram-feed')}</strong>{__('Set Follow button in footer area.', 'instagram-feed')}</li>
			<li>&emsp;<strong>{__('Profile Photo: ', 'instagram-feed')}</strong>{__('Set different Profile Photo size in popup area.', 'instagram-feed')}</li>
			<li>&emsp;<strong>{__('Caption: ', 'instagram-feed')}</strong>{__('Remove Caption hashtag', 'instagram-feed')}</li>
			<li>&emsp;<strong>{__('Username: ', 'instagram-feed')}</strong>{__('Change username color', 'instagram-feed')}</li>
			<li>&emsp;<strong>{__('Name: ', 'instagram-feed')}</strong>{__('Change name color', 'instagram-feed')}</li>
			<li>&emsp;<strong>{__('Biography: ', 'instagram-feed')}</strong>{__('Change biography color', 'instagram-feed')}</li>
			<li>&emsp;<strong>{__('Follow Button: ', 'instagram-feed')}</strong>{__('Colors set follow button', 'instagram-feed')}</li>
		</ProModal>

	</>;
};
export default Settings;