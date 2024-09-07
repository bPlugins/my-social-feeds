import { __ } from '@wordpress/i18n';
import patterns from '../Patterns/patterns.json';
import { parse } from '@wordpress/blocks';

const Patterns = ({setProModalOpen, isPremium, clientId}) => {

    return <>
    {!isPremium && <p className='noticePatter'>{__('it\'s only available on pro version', 'Tiktok')}</p>}
    {patterns.map((pattern, index) => {
        const imgName = pattern.name.replace('/', '-');
        const imgPath = ttpPatters.patternsImagePath + imgName + '.png';
        
        return <div key={index} className='bsbPatters'>
            <img key={index} style={{ width: '100%' }} src={imgPath} />
            <div className="overlyButton">
                <button onClick={() => {
                    if (isPremium) {
                        const blocks = parse(pattern.content);
                        wp.data.dispatch('core/block-editor').replaceBlock(clientId, blocks);
                    } else {
                        setProModalOpen(true);
                    }
                }}>{__('Apply', 'slider')}</button>
            </div>
        </div>
    })}</>
}
export default Patterns;