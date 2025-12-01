import Overview from '../../../../bpl-tools/Admin/Overview/Overview';
import Changelog from '../../../../bpl-tools/Admin/Changelog/Changelog';
import FSCheckoutButton from '../../../../bpl-tools/Admin/FSCheckoutButton/FSCheckoutButton';

import { changelogs } from '../utils/data';

const Welcome = (props) => {
    const { name, isPremium, freemius } = props;

    return <>
        <Overview {...props}>
            {!isPremium && <FSCheckoutButton {...{
                freemius,
                options: { title: name },
                buttonProps: { variant: 'secondary' }
            }}>Buy Now</FSCheckoutButton>}
        </Overview>

        <Changelog changelogs={changelogs} {...props} />
    </>
}
export default Welcome;