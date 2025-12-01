import { useState } from "react";
import { __ } from "@wordpress/i18n";
import { InspectorControls } from "@wordpress/block-editor";
import { TabPanel } from "@wordpress/components";

// import ProModal from './ProModal';
import ProModal from '../../../../Pro-modal/ProModal'
import usePremiumInEditor from '../../../../hooks/usePremiumInEditor';


// Settings Components
import { tabController } from "../../../../../../bpl-tools/utils/functions";
import { generalStyleTabs } from "../../../utils/options";
import Style from './Style/Style';
import General from './General/General';

const Settings = ({ attributes, setAttributes, fetchPins, updateObject, clientId }) => {

  const [proModalOpen, setProModalOpen] = useState(false);

  const getData = () => {
    fetchPins();
  }

  const { isPremium } = usePremiumInEditor();

  return (
    <>
      <InspectorControls>
        <TabPanel className="bPlTabPanel" activeClass="activeTab" tabs={generalStyleTabs} onSelect={tabController}>
          {(tab) => (
            <>
              {"general" === tab.name && (
                <>
                  <General attributes={attributes} clientId={clientId} updateObject={updateObject} getData={getData} setAttributes={setAttributes} isPremium={isPremium} setProModalOpen={setProModalOpen} />
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

      <ProModal isProModal={proModalOpen} setIsProModal={setProModalOpen} block='B Pinterest Feeds'>
        <li>{__('Show/Hide Pins.', 'b-pinterest-feed')}</li>
        <li>{__('There are four types of layout: Default, Masonry, Slider, and Justified.', 'b-pinterest-feed')}</li>
        <li>{__('Change image ratio.', 'b-pinterest-feed')}</li>
        <li>{__('Popup options for show/hide: Zoom In, Zoom Out, Toggle 1:1, etc.', 'b-pinterest-feed')}</li>
        <li>{__('Set image overlay, transform, and overlay color.', 'b-pinterest-feed')}</li>
        <li>{__('Set typography for Name, About, Count, and button.', 'b-pinterest-feed')}</li>
      </ProModal>
    </>
  );
};
export default Settings;
