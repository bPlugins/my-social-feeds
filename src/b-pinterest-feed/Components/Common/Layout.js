import { __ } from '@wordpress/i18n';
import { useRef } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useEffect } from "react";
import Profile from './Profile/Profile';
import Default from './Layout/Default';
import Slider from './Layout/Slider';
import SingleItem from './Layout/SingleItem';
import Justified from './Layout/Justified';
import { loadingIcon } from '../../utils/icons';
import JustifiedPackage from './Layout/JustifiedPackage';
import Authorization from '../../../Components/Authorization';


const Layout = ({ attributes, pins, elId, status, loading, allNames, setAttributes, fetchPins, isBackEnd, isPremium }) => {
  const { elements, layout, columns, rowGap, columnGap, fancyApps, accountInfo } = attributes;
  const { isProfile, isPins } = elements;
  const { left, middle, right } = fancyApps;
  const { infobar } = left;
  const { zoomIn, zoomOut, toggle1to1, rotateCCW, rotateCW, flipX, flipY } = middle;
  const { slideshow, thumbs, close } = right;
  const justifiedEle = useRef();

  useEffect(() => {
    Fancybox.bind(`[data-fancybox='bpinterest-dialog-${elId}']`, {
      Toolbar: {
        display: {
          left: [
            infobar && "infobar"
          ],
          middle: [
            zoomIn && "zoomIn",
            zoomOut && "zoomOut",
            toggle1to1 && "toggle1to1",
            rotateCCW && "rotateCCW",
            rotateCW && "rotateCW",
            flipX && "flipX",
            flipY && "flipY",
          ],
          right: [
            slideshow && "slideshow",
            thumbs && "thumbs",
            close && "close"
          ],
        },
      },
    });
  }, [fancyApps]);

  if (loading) {
    return <div className='loadingArea'>{loadingIcon}</div>
  }

  const options = [
    { label: __('Select UserName', 'my-social-feeds'), value: '' },
    ...(Array.isArray(allNames) ? allNames : []),
  ];


  const onChangeAccount = (val) => {
    setAttributes({ accountInfo: { ...accountInfo, userName: val } });
  }

  const onChangeBoardName = (val) => {
    setAttributes({ accountInfo: { ...accountInfo, boardName: val } });
  }

  const getData = () => {
    fetchPins();
  }

  const authorizationProps = {
    "title": __("User Name And Board Name Required", "my-social-feeds"),
    "description": __("Please connect a Pinterest account to display the pins.", "my-social-feeds"),
    "button": __("Connect New Account", "my-social-feeds"),
    "bottomDes": __("🔒 Secure connection via Pinterest", "my-social-feeds"),
    "selectControlLabel": __("Choose Connected Account", "my-social-feeds")
  };

  const authorizationMeinProps = { options, onChangeAccount, onChangeBoardName, authorizationProps, isPremium, attributes, setAttributes, blockType: "pinterest", getData };

  if (isBackEnd && (status == 404 || status == 403)) {
    return <Authorization {...authorizationMeinProps} />
  } else if (status == 404 || status == 403) {
    return <span></span>
  }

  return <div className='mainLayout'>
    {isProfile && <Profile attributes={attributes} pins={pins} />}

    {isPins && <div ref={justifiedEle} className={`layout ${layout != 'justified' ? layout : 'justified'} columns-${columns.desktop} columns-tablet-${columns.tablet} columns-mobile-${columns.mobile}`}>
      {layout == "default" && <Default pins={pins} elId={elId} />}

      {layout == "masonry" && (
        <ResponsiveMasonry columnsCountBreakPoints={{ 0: columns?.mobile, 576: columns?.tablet, 768: columns?.desktop }}>
          <Masonry columnsCount={3} gutter={`${rowGap} ${columnGap}`}>
            {pins?.pins?.map((pin, index) => {
              return <SingleItem key={index} pin={pin} elId={elId} />
            })}
          </Masonry>
        </ResponsiveMasonry>
      )}

      {layout == "slider" && <Slider attributes={attributes} pins={pins} elId={elId} />}

      {layout == "justified" &&
        <Justified justifiedEle={justifiedEle} attributes={attributes} pins={pins} elId={elId} />
      }

      {/* {layout == "justified" && <JustifiedPackage attributes={attributes} pins={pins} elId={elId} />} */}
    </div>}
  </div>
}
export default Layout;