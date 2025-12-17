const VideoPost = ({ attributes }) => {
    const { type, config, videoPostID } = attributes;
    const { language, scrolling, theme, height, width } = config;

    const vpHeight = type == 'video' ? '280px' : height;
    const src = type === 'video' ?
        `https://platform.twitter.com/embed/Tweet.html?dnt=false&frame=false&hideCard=false&hideThread=false&id=${videoPostID}&lang=${language}&theme=${theme}&width=${width}&maxWidth=${width}` : type === 'post' ?
            `https://platform.twitter.com/embed/Tweet.html?dnt=false&frame=false&hideCard=false&hideThread=false&id=${videoPostID}&lang=${language}&theme=${theme}&width=${width}` : '';


    // eslint-disable-next-line react/no-unknown-property
    return <iframe Scrolling={scrolling} frameBorder="0" allowtransparency="true" allowFullScreen="true"
        style={{ width: `${width}`, height: `${vpHeight}` }} title="X Post"
        src={src}
        data-tweet-id={videoPostID}></iframe>
}

export default VideoPost;