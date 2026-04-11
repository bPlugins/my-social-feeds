import { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Demos from '../../../../bpl-tools/Admin/Demos';
import Pricing from '../../../../bpl-tools/Admin/Pricing';
import FeatureCompare from '../../../../bpl-tools/Admin/FeatureCompare';
import Activation from '../../../../bpl-tools/Admin/Activation';
import OurPlugins from '../../../../bpl-tools/Admin/OurPlugins';

import Layout from './Layout';
import Welcome from './Welcome';
import { demoInfo, pricingInfo } from '../utils/data';
import Settings from './Settings';
import Authorization from './pages/Authorization';


const App = (props) => {
    const { isPremium, hasPro } = props;

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

                <Route path='demos' element={<Demos demoInfo={demoInfo} {...props} />} />

                {!isPremium && <Route path='pricing' element={<Pricing pricingInfo={pricingInfo} options={{}} {...props} />} />}

                {!isPremium && <Route path='feature-comparison' element={<FeatureCompare plans={['free', 'pro']} {...props} />} />}

                {hasPro && <Route path='activation' element={<Activation {...props} />} />}

                <Route path='our-plugins' element={<OurPlugins {...props} />} />

                <Route path='*' element={<Navigate to='/welcome' replace />} />
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