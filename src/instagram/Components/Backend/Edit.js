import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import Settings from './Settings/Settings';
import Style from '../Common/Style';
import Feeds from '../../Feeds';
import Loading from '../Loading';
import useAllAccounts from '../../hooks/useAllAccounts';
import useBlockAccounts from '../../hooks/useBlockAccounts';

const Edit = props => {
	const { className, attributes, setAttributes, clientId } = props;
	const { cId } = attributes;

	const [pageNumber, setPageNumber] = useState(1);

	const { allAccounts, loading } = useAllAccounts();
	const { accounts } = useBlockAccounts(allAccounts, attributes);

	const blockProps = useBlockProps();

	if (loading) {
		return <Loading />
	}

	return <>

		<Settings attributes={attributes} setAttributes={setAttributes} clientId={clientId} setPageNumber={setPageNumber} />

		<div {...blockProps} id={`ifbInstagramFeed-${clientId}`}>
			<Style attributes={attributes} clientId={clientId} />

			{accounts?.length ? <Feeds attributes={attributes} pageNumber={pageNumber} setPageNumber={setPageNumber} /> : <p className='ifbInsertAccess'>{__('Please Connect with Instagram Account', 'instagram-feed')}</p>}
		</div>
	</>;
};
export default Edit;