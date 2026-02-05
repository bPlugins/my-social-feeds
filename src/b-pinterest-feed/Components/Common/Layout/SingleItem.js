
const SingleItem = ({ elId, pin }) => {

    return <div className="single-pin">
        <a href="#" data-fancybox={`bpinterest-dialog-${elId}`} data-src={pin?.images["564x"].url}>
            <div className="imgArea">
                <img src={pin?.images["564x"].url} alt="" />
            </div>
        </a>
    </div>
}
export default SingleItem;