import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { blockTypeOpt } from '../instagram/utils/options';
import { BtnGroup } from '../../../bpl-tools/Components';
import { useSelect, dispatch } from "@wordpress/data";

const InsertFeeds = ({ blockType, clientId }) => {


    const insertBlockType = (type) => {
        const block = wp.blocks.createBlock(type);
        // return dispatch("core/block-editor").insertBlock(block, 0, clientId);
        return dispatch('core/block-editor').replaceBlock(clientId, block);
    };

    return <>

        <PanelBody className='bPlPanelBody' title={__('Select Social Feeds', 'instagram-feed')} initialOpen={true}>
            <BtnGroup value={blockType} onChange={(val) => insertBlockType(val)} options={blockTypeOpt} isIcon={true} size='default' />
        </PanelBody>
    </>

}
export default InsertFeeds;