import { __ } from '@wordpress/i18n';
const BackBtn = ({ onBack }) => {

    return <button className="backModernBtn" onClick={onBack}>
        <span className="icon">
            <svg width="18" height="18" viewBox="0 0 24 24"> <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> </svg>
        </span> {__('Back', 'my-social-feeds')}
    </button>
}
export default BackBtn;