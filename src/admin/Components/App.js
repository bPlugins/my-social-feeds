import { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';

import ListDemos from '../../../../bpl-tools/Admin/Demos/ListDemos';
import FSCheckoutButton from '../../../../bpl-tools/Admin/FSCheckoutButton/FSCheckoutButton';
import Pricing from '../../../../bpl-tools/Admin/Pricing/Pricing';
import FeatureCompare from '../../../../bpl-tools/Admin/FeatureCompare/FeatureCompare';

import Layout from './Layout';
import { demoInfo, pricingInfo, featureCompareInfo } from '../utils/data';
import Welcome from './Welcome';
import Settings from './Settings';
import Authorization from './pages/Authorization';


const App = (props) => {
    const { name, isPremium, freemius } = props;
    console.log(window.location.href.includes('isCloseModal'));

    useEffect(() => {
        if (window.location.href.includes('isCloseModal')) {

            const data = getDataParamsFromUrl();
            if (data === 'lbb_auth_modal') {
                setTimeout(() => {
                    window.close();
                }, 1000);
            }
        }
    }, []);

    if (window.location.href.includes('isCloseModal')) {
        return <Authorization />
    }

    // useEffect(() => {
    //     if (window.location.hash) return;

    //     const page = new URLSearchParams(window.location.search).get('page');

    //     if (page === 'my-social-feeds-settings') {
    //         window.location.hash = '#/settings';
    //     }
    // }, []);

    useEffect(() => {
        // যদি URL এ hash আগেই থাকে, React সেটা সম্মান করবে
        if (window.location.hash) return;

        const params = new URLSearchParams(window.location.search);
        const page = params.get('page');

        if (page === 'my-social-feeds-settings') {
            window.location.hash = '#/settings';
        } else {
            window.location.hash = '#/';
        }
    }, []);

    return <Router>
        <Routes>
            <Route path='/' element={<Layout {...props} />}>
                <Route index element={<Welcome {...props} />} />

                <Route path='welcome' element={<Welcome {...props} />} />

                <Route path='settings' element={<Settings {...props} />} />


                <Route path='demos' element={<ListDemos demoInfo={demoInfo} {...props}>
                    {!isPremium && <FSCheckoutButton {...{
                        freemius,
                        options: { title: name }
                    }}>Buy Now</FSCheckoutButton>}
                </ListDemos>} />

                {!isPremium && <Route path='pricing' element={<Pricing pricingInfo={pricingInfo} options={{}} {...props} ></Pricing>} />}

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