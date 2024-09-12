import {useState} from "react";
import { __ } from "@wordpress/i18n";
import { InspectorControls} from "@wordpress/block-editor";
import {  TabPanel} from "@wordpress/components";

import ProModal from './ProModal';

import usePremiumInEditor from '../../../../hooks/usePremiumInEditor';


// Settings Components
import { tabController } from "../../../../../../Components/utils/functions";
import { generalStyleTabs } from "../../../utils/options";
import Style from './Style/Style';
import General from './General/General';

const Settings = ({attributes, setAttributes,fetchPins, updateObject }) => {

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
                  <General attributes={attributes} updateObject={updateObject}  getData={getData} setAttributes={setAttributes}isPremium={isPremium} setProModalOpen={setProModalOpen}/>
                </>
              )}

              {"style" === tab.name && (
                <>
                  <Style attributes={attributes} updateObject={updateObject} isPremium={isPremium} setProModalOpen={setProModalOpen}/>
                </>
              )}
            </>
          )}
        </TabPanel>
      </InspectorControls>

      <ProModal setProModalOpen={setProModalOpen} proModalOpen={proModalOpen} />
    </>
  );
};
export default Settings;
