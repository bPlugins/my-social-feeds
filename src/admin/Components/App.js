import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';

import ListDemos from '../../../../bpl-tools/Admin/Demos/ListDemos';
import FSCheckoutButton from '../../../../bpl-tools/Admin/FSCheckoutButton/FSCheckoutButton';
import Pricing from '../../../../bpl-tools/Admin/Pricing/Pricing';
import FeatureCompare from '../../../../bpl-tools/Admin/FeatureCompare/FeatureCompare';

import Layout from './Layout';
import { demoInfo, pricingInfo, featureCompareInfo } from '../utils/data';
import Welcome from './Welcome';
import Configure from './Configure';


const App = (props) => {
    const { name, isPremium, freemius } = props;

    useEffect(() => {
        if (window.location.href.includes('isCloseModal')) {

            const data = getDataParamsFromUrl();
            if (data === 'lbb_auth_modal') {
                window.close();
            }

        }
    }, [])

    return <Router>
        <Routes>
            <Route path='/' element={<Layout {...props} />}>
                <Route index element={<Welcome {...props} />} />

                <Route path='welcome' element={<Welcome {...props} />} />

                <Route path='configure' element={<Configure {...props} />} />

                <Route path='demos' element={<ListDemos demoInfo={demoInfo} {...props}>
                    {!isPremium && <FSCheckoutButton {...{
                        freemius,
                        options: { title: name }
                    }}>Buy Now</FSCheckoutButton>}
                </ListDemos>} />

                {!isPremium && <Route path='pricing' element={<Pricing pricingInfo={pricingInfo} options={{}} {...props} >
                    <h2 className='pricingTitle'>Buy Bundle of 3 premium social feeds blocks (Instagram, TikTok, Pinterest)</h2>
                </Pricing>} />}


                {!isPremium && <Route path='feature-comparison' element={<FeatureCompare featureCompareInfo={featureCompareInfo} {...props} />} />}

                <Route path='*' element={<Welcome {...props} />} />
            </Route>
        </Routes>
    </Router>
}
export default App;


export function getDataParamsFromUrl() {

    const params = new URLSearchParams(window.location.search);
    const dataParam = params.get('isCloseModal');


    return dataParam ? dataParam : null;

}