import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { useSelect, dispatch, withSelect } from "@wordpress/data";
import { instagram, pinterest, tiktok, twitter } from './utils/icons';
import ClipBoard from './ClipBoard';

const Edit = ({ clientId, currentPostId, CPTType }) => {

    const shortcode = `[msfbp-social-feeds id=${currentPostId}]`;
    const innerBlocks = useSelect((select) => select("core/block-editor").getBlock(clientId).innerBlocks);


    const insertBlockType = (type) => {
        const block = wp.blocks.createBlock(type);
        return dispatch("core/block-editor").insertBlock(block, 0, clientId);
    };

    if (!innerBlocks?.length) {
        return <div {...useBlockProps()}>

            {CPTType === "msfbp" && <ClipBoard shortcode={shortcode} />}

            <div className='msfb-my-social-feeds'>

                <h2>Select Your Social Feed Block</h2>
                <h3> Choose from the following social feed blocks to get started </h3>

                <div className='items-list'>
                    <div className='item instagram-feed' onClick={() => {
                        insertBlockType("bpifb/my-social-feeds");
                    }}>
                        <h3>Instagram Feed</h3>
                        <p> Display instagram feeds, media and profile </p>
                        <div className='icon'>{instagram("#e72c84")}</div>
                    </div>
                    <div className='item tiktok-feed' onClick={() => { insertBlockType("ttp/tiktok-player"); }}>
                        <h3>TikTok Player</h3>
                        <p> Display instagram feeds, media and profile </p>
                        <div className='icon'>{tiktok("#e72c84")}</div>
                    </div>
                    <div className='item pinterest-feed' onClick={() => {
                        insertBlockType("bpf/b-pinterest-feed");
                    }}>
                        <h3>Pinterest Feed</h3>
                        <p> Display instagram feeds, media and profile </p>
                        <div className='icon'>{pinterest("#e72c84")}</div>
                    </div>
                    <div className='item twitter-feed' onClick={() => {
                        insertBlockType("etf/twitter-feed");
                    }}>
                        <h3>Twitter </h3>
                        <p> Display twitter timeline, follow button, tweet button, hashtag, video and post </p>
                        <div className='icon'>{twitter("#e72c84")}</div>
                    </div>
                </div>
            </div>

            <InnerBlocks templateLock={false} allowedBlocks={["bpifb/my-social-feeds", "ttp/tiktok-player", "bpf/b-pinterest-feed", "etf/twitter-feed"]} renderAppender={() => false} />
        </div>
    }

    return <div {...useBlockProps()}>
        <InnerBlocks templateLock={false} allowedBlocks={["bpifb/my-social-feeds", "ttp/tiktok-player", "bpf/b-pinterest-feed", "etf/twitter-feed"]} />
    </div>
}

export default withSelect((select) => {
    const currentPostId = select('core/editor').getCurrentPostId();
    const CPTType = select('core/editor').getCurrentPostType?.();
    return {
        currentPostId,
        CPTType
    };
})(Edit);