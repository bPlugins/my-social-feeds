import { useState } from "react";
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { TabPanel } from "@wordpress/components";


// Settings Components
import { tabController } from "../../../../../../bpl-tools/utils/functions";
import { generalStyleTabs } from "../../../utils/options";
import Style from './Style/Style';
import General from './General/General';
import { AboutProModal } from '../../../../../../bpl-tools/ProControls';
import { adminUrl } from '../../../../twitter/utils/functions';

const Settings = ({ attributes, setAttributes, fetchPins, updateObject, clientId, allNames, isPremium }) => {

  const [proModalOpen, setProModalOpen] = useState(false);

  const getData = () => {
    fetchPins();
  }

  return (
    <>
      <InspectorControls>
        <TabPanel className="bPlTabPanel" activeClass="activeTab" tabs={generalStyleTabs} onSelect={tabController}>
          {(tab) => (
            <>
              {"general" === tab.name && (
                <>
                  <General allNames={allNames} attributes={attributes} clientId={clientId} updateObject={updateObject} getData={getData} setAttributes={setAttributes} isPremium={isPremium} setProModalOpen={setProModalOpen} />
                </>
              )}

              {"style" === tab.name && (
                <>
                  <Style attributes={attributes} updateObject={updateObject} isPremium={isPremium} setProModalOpen={setProModalOpen} />
                </>
              )}
            </>
          )}
        </TabPanel>
      </InspectorControls>

      <AboutProModal isProModalOpen={proModalOpen} setIsProModalOpen={setProModalOpen} link={adminUrl()}>
        <li>{__('Show/Hide Pins.', 'my-social-feeds')}</li>
        <li>{__('There are four types of layout: Default, Masonry, Slider, and Justified.', 'my-social-feeds')}</li>
        <li>{__('Change image ratio.', 'my-social-feeds')}</li>
        <li>{__('Popup options for show/hide: Zoom In, Zoom Out, Toggle 1:1, etc.', 'my-social-feeds')}</li>
        <li>{__('Set image overlay, transform, and overlay color.', 'my-social-feeds')}</li>
        <li>{__('Set typography for Name, About, Count, and button.', 'my-social-feeds')}</li>
      </AboutProModal>
    </>
  );
};
export default Settings;
