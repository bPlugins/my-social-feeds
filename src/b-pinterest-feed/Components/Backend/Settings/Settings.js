import { __ } from "@wordpress/i18n";
import { InspectorControls} from "@wordpress/block-editor";
import {  TabPanel} from "@wordpress/components";

// Settings Components
import { tabController } from "../../../../../../Components/utils/functions";
import { generalStyleTabs } from "../../../utils/options";
import Style from './Style/Style';
import General from './General/General';

const Settings = ({attributes, setAttributes,fetchPins, updateObject }) => {
  
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
                  <General attributes={attributes} updateObject={updateObject} getData={getData} setAttributes={setAttributes}/>
                </>
              )}

              {"style" === tab.name && (
                <>
                  <Style attributes={attributes} updateObject={updateObject}/>
                </>
              )}
            </>
          )}
        </TabPanel>
      </InspectorControls>
    </>
  );
};
export default Settings;
