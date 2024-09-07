
import JustifiedGrid from 'react-justified-grid'
import SingleItem from './SingleItem';

const JustifiedPackage = ({attributes, pins, elId}) => {

	const images = pins?.pins?.map((pin) => ({ height:pin?.images["564x"].height, src: pin?.images["564x"].url, width: pin?.images["564x"].width, class: "test"}) );
     

    return images?.length && <JustifiedGrid className="test" gutter={1} images={images} maxRowHeight={100} rows={undefined} showIncompleteRow={true} style={{}} >
         </JustifiedGrid>
   
}
export default JustifiedPackage;