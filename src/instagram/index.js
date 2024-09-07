import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Edit from './Components/Backend/Edit';
import './editor.scss';
import { instagramIcon } from './utils/icons';

registerBlockType(metadata, {
	icon: instagramIcon(),

	// Build in Functions
	edit: Edit,

	save: () => null
});