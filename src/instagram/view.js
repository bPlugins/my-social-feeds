import { useState } from 'react';
import { createRoot } from 'react-dom/client';

import './style.scss';
import Style from './Components/Common/Style';
import Feeds from './Feeds';

// All Instagram Feed
document.addEventListener('DOMContentLoaded', () => {
	const ifbEls = document.querySelectorAll('.wp-block-ifb-instagram');
	ifbEls.forEach(ifbEl => {
		const attributes = JSON.parse(ifbEl.dataset.attributes);
		// const accounts = JSON.parse(ifbEl.dataset.accounts);
		const { cId } = attributes;

		createRoot(ifbEl).render(<>
			<Style attributes={attributes} clientId={cId} />

			<RenderGallery attributes={attributes} />
		</>);

		ifbEl?.removeAttribute('data-attributes');
	});
});


const RenderGallery = ({ attributes }) => {
	const [pageNumber, setPageNumber] = useState(1);

	return <Feeds attributes={attributes} pageNumber={pageNumber} setPageNumber={setPageNumber} />;
}