import { XIcon, twitterIcon } from "../../utils/icons";

const Hastag = ({ attributes }) => {
    const { button } = attributes;
    const { tweetText, hasTagText, iconsType } = button;

    const handleTwitterFollow = () => {
        const hasTagUrl = `https://twitter.com/intent/tweet?hashtags=${hasTagText}%2C&original_referer=https%3A%2F%2Fpublish.twitter.com%2F&text=${tweetText}`;
        window.open(hasTagUrl, '_blank');
    };

    return <a onClick={handleTwitterFollow} rel='noreferrer' className="etfButton">
        {iconsType == "tIcon" ? twitterIcon() : XIcon()}
        <span> Post #{hasTagText}</span>
    </a>
}

export default Hastag;