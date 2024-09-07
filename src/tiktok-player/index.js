import { registerBlockType } from '@wordpress/blocks';

import './editor.scss';
import metadata from './block.json';
import Edit from './Components/Backend/Edit';
import { playCount } from './utils/icons';

registerBlockType(metadata, {
	icon: playCount,
	edit: Edit
});