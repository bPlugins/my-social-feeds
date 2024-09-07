import SingleItem from './SingleItem';

const Default = ({ pins, elId }) => {
    
    return pins?.pins?.map((pin, index) => {
        return <SingleItem key={index} pin={pin} elId={elId}/>
    })
}
export default Default;