const Timeline = ({ attributes, }) => {
    const { userName, config } = attributes;
    const { theme, width, height, scrolling, isHeader, isFooter, language } = config;
    const url = `https://syndication.twitter.com/srv/timeline-profile/screen-name/${userName}?dnt=false&frame=false&hideBorder=true&showHeader=${isHeader}&hideFooter=${!isFooter}&lang=${language}&showReplies=false&theme=${theme}&transparent=false`;

    console.log(url);


    // eslint-disable-next-line react/no-unknown-property
    return <iframe Scrolling={scrolling} frameBorder="0" allowtransparency="true" allowFullScreen="true" className="twitter_iframe" style={{ position: 'static', visibility: 'visible', width: `${width}`, height: `${height}`, flexGrow: 1, overflow: "auto" }} title="Twitter Timeline" src={url}></iframe>;
}
export default Timeline;