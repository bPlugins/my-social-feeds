const $ = jQuery;
import { useEffect } from 'react';
import SingleItem from './SingleItem';

const Justified = ({attributes, pins, elId, justifiedEle}) => {
    const { columns } = attributes;
    
    useEffect(() => {
        if(justifiedEle.current){
            $(justifiedEle.current).justifiedGallery({
                margins:15
            });
        }
    }, []);
    

    return pins?.pins?.map((pin, index) => {
        return <SingleItem key={index} pin={pin} elId={elId}/>
    })
}
export default Justified;