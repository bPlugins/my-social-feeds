
import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';

import './style.scss';
import Style from '../tiktok-player/Components/Common/Style';
import Feeds from '../tiktok-player/Components/Common/Feeds';

// Player for Tiktok
document.addEventListener('DOMContentLoaded', () => {
	const allBlockDirectory = document.querySelectorAll('.wp-block-ttp-tiktok-player');

	allBlockDirectory.forEach(feedsEl => {
		if (!feedsEl.dataset.attributes) {
			return;
		}
		const attributes = JSON.parse(feedsEl.dataset.attributes);

		createRoot(feedsEl).render(<>
			<Style attributes={attributes} elId={feedsEl.id} />
			<Feeds attributes={attributes} elId={feedsEl.id} isBackend={false} react={{ useEffect, useState }} directory={feedsEl} />
		</>);

		feedsEl?.removeAttribute('data-attributes');
	});
});