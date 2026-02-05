import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
// import Style from './Components/Common/Style';
// import BlockName from './Components/Frontend/BlockName';

import './style.scss';
import Layout from './Components/Common/Layout';
import Style from './Components/Common/Style';

document.addEventListener('DOMContentLoaded', () => {
	const blockNameEls = document.querySelectorAll('.wp-block-bpf-b-pinterest-feed');

	blockNameEls.forEach(feedsEl => {
		const attributes = JSON.parse(feedsEl.dataset.attributes);

		createRoot(feedsEl).render(<>
			<RenderLayout attributes={attributes} id={feedsEl.id} />
		</>);

		feedsEl?.removeAttribute('data-attributes');
	});
});

const RenderLayout = ({ attributes, id }) => {
	const { accountInfo } = attributes;
	const { userName, boardName } = accountInfo;
	const [pins, setPins] = useState([]);
	const [status, setStatus] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const fetchPins = async () => {
			const res = await fetch(`${bPinterestData?.ajaxUrl}?action=bPinterestAjaxRequest&userName=${userName}&boardName=${boardName}&nonce=${bPinterestData?.nonce}`);
			const response = await res.json();
			setPins(response.data?.data);
			setStatus(response.data);
			setLoading(false);
		}
		fetchPins();
	}, []);

	return <>
		<Style attributes={attributes} eleId={id} />
		<Layout isBackEnd={false} attributes={attributes} pins={pins} elId={id} status={status} loading={loading} />
	</>
}