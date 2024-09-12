import { __ } from '@wordpress/i18n';
import { useState, useEffect } from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { TabPanel } from '@wordpress/components';

import { tabController } from '../../../../../../Components/utils/functions';

// Settings Components
import ProModal from '../../ProModal';
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
	const { accounts, accessToken,    } = attributes;

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
	const globalAttr = {attributes, setAttributes, isPremium, setProModalOpen}

	return <><InspectorControls>
		<TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>{tab => <>
			{'general' === tab.name && <General {...globalAttr} setPageNumber={setPageNumber} />}

			{'elements' === tab.name && <>
				<Elements {...globalAttr}isBusiness={isBusiness}  updateObj={updateObj}/>
			</>}

			{'style' === tab.name && <>
				<Style {...globalAttr} updateObj={updateObj}/>
			</>}
		</>}</TabPanel>
	</InspectorControls>


		<ProModal proModalOpen={proModalOpen} setProModalOpen={setProModalOpen} />
	</>;
};
export default Settings;