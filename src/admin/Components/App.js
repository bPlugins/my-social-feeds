
import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Welcome from '../../../../bpl-tools/Admin/Welcome';
import Demos from '../../../../bpl-tools/Admin/Demos';
import Pricing from '../../../../bpl-tools/Admin/Pricing';
import FeatureCompare from '../../../../bpl-tools/Admin/FeatureCompare';
import OurPlugins from '../../../../bpl-tools/Admin/OurPlugins';
import { Activation, Settings } from '../../../../bpl-tools/Admin';

import Layout from './Layout';
import { demoInfo, pricingInfo, settingsInfo, welcomeInfo } from '../utils/data';
import Authorization from './pages/Authorization';
import AuthorizationSettings from './AuthorizationSettings';


const App = (props) => {
    const { adminUrl } = props;

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

    useEffect(() => {
        if (window.location.hash) return;

        const params = new URLSearchParams(window.location.search);
        const page = params.get('page');

        if (page === 'my-social-feeds-settings') {
            window.location.hash = '#/authorization-settings';
        } else {
            window.location.hash = '#/';
        }
    }, []);

    return <Router>
        <Routes>
            <Route path='/' element={<Layout {...props} />}>
                <Route index element={<Welcome {...props} {...welcomeInfo(adminUrl)} />} />
                <Route path='welcome' element={<Welcome {...props} {...welcomeInfo(adminUrl)} />} />

                <Route path='authorization-settings' element={<AuthorizationSettings {...props} {...settingsInfo} />} />
                <Route path='demos' element={<Demos {...props} demoInfo={demoInfo} />} />

                <Route path='pricing'
                    element={<Pricing pricingInfo={pricingInfo} options={{}} {...props} />} />

                <Route path='feature-comparison'
                    element={<FeatureCompare plans={['free', 'pro']} {...props} />} />

                <Route path='activation' element={<Activation {...props} />} />
                <Route path='settings' element={<Settings {...props} {...settingsInfo} />} />
                <Route path='our-plugins' element={<OurPlugins {...props} />} />

                <Route path='*' element={<Navigate to='/welcome' replace />} />
            </Route>
        </Routes>
    </Router>;
};
export default App;

export function getDataParamsFromUrl() {

    const params = new URLSearchParams(window.location.search);
    const dataParam = params.get('isCloseModal');


    return dataParam ? dataParam : null;

}