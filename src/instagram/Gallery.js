import Item from './Components/Gallery/Item';

const Gallery = ({ attributes, user, feeds, pageNumber }) => {
	const { columns } = attributes;

	return <div className={`ifbGallery columns-${columns.desktop} columns-tablet-${columns.tablet} columns-mobile-${columns.mobile}`}>
		<Items attributes={attributes} user={user} feeds={feeds} pageNumber={pageNumber} />
	</div>;
}
export default Gallery;

const Items = ({ attributes, user, feeds, pageNumber }) => {
	const { itemVisible } = attributes;

	return feeds?.length && feeds?.slice(0, itemVisible * pageNumber)?.map((feed, index) => <Item key={feed.id} attributes={attributes} user={user} feed={feed} index={index} />);
};