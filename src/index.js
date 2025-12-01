import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import './editor.scss';
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { blockIcon } from './utils/icons.js';
import Edit from './Edit';

// block register 
registerBlockType(metadata, {
    icon: {
        src: blockIcon,
    },
    edit: Edit,
    save: () => {
        const blockProps = useBlockProps.save();
        return (
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        );
    },
});