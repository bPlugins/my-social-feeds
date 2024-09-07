

const EmbedVideo = ({ id }) => {
    return <div className="feedPopUp feedIframe">
        <iframe src={`https://www.tiktok.com/embed/v2/${id}?lang=en-US&referrer=localhost&embedFrom=oembed`} />
    </div>
}
export default EmbedVideo;